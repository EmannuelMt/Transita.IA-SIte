const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const validationService = require('./validationService');
const inviteTokenService = require('./inviteTokenService');
const axios = require('axios');
let admin;
let firebaseAppInitialized = false;
try {
  admin = require('firebase-admin');
  const serviceAccount = require('../firebase-service-account.json');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://transitaai-b4d4f-default-rtdb.firebaseio.com'
    });
  }
  firebaseAppInitialized = true;
  console.log('[AuthService] Firebase admin initialized for Realtime DB');
} catch (e) {
  console.warn('[AuthService] Firebase admin not initialized:', e?.message || e);
}

const JWT_SECRET = process.env.JWT_SECRET || 'transitaai-secret-key-2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Armazenamento em memória (em produção, usar banco real)
let users = [];
let companies = [];
let employees = [];
let companyAdmins = [];

class AuthService {
  /**
   * Hash de senha
   */
  async hashPassword(password) {
    return await bcrypt.hash(password, 12);
  }

  /**
   * Login / Registro via Google ID Token
   * - Verifica o idToken junto ao Google
   * - Se o email já existir, gera token e retorna
   * - Se não existir, cria um usuário provisório (role: EMPLOYEE) e retorna token
   */
  async loginWithGoogle(idToken) {
    if (!idToken) throw new Error('idToken é obrigatório');

    try {
      // Verifica token com Google Token Info
      const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
      const resp = await axios.get(url);
      const payload = resp.data;

      // payload contém: email, email_verified, name, picture, aud, iss, sub, exp, iat
      if (!payload || !payload.email) throw new Error('Token inválido: payload sem email');
      if (payload.email_verified !== 'true' && payload.email_verified !== true) {
        throw new Error('Email do token não está verificado pelo Google');
      }

      const email = String(payload.email).toLowerCase();

      // Procurar usuário existente
      let user = users.find(u => u.email === email);

      if (!user) {
        // Criar usuário provisório (sem senha) - role EMPLOYEE por padrão
        const userId = `user_${uuidv4()}`;
        user = {
          id: userId,
          email,
          password: null,
          role: 'EMPLOYEE',
          companyId: null,
          isActive: true,
          isAdmin: false,
          name: payload.name || '',
          photoURL: payload.picture || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        users.push(user);
      } else {
        // Atualizar nome/foto se vier do Google
        if (payload.name) user.name = payload.name;
        if (payload.picture) user.photoURL = payload.picture;
        user.updatedAt = new Date().toISOString();
      }

      // Gerar token de aplicação
      const token = this.generateToken(user);

      // Montar resposta similar ao login
      const response = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          companyId: user.companyId || null,
          name: user.name || '',
          photoURL: user.photoURL || ''
        },
        token,
        expiresIn: JWT_EXPIRES_IN,
        message: 'Autenticado via Google'
      };

      // Incluir company/employee quando aplicável
      if (user.role === 'EMPLOYEE' && user.companyId) {
        const company = companies.find(c => c.id === user.companyId);
        if (company) response.company = { id: company.id, name: company.name };
      } else if (user.role === 'COMPANY' && user.companyId) {
        const company = companies.find(c => c.id === user.companyId);
        if (company) response.company = { id: company.id, name: company.name };
      }

      return response;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(`Validação do token Google falhou: ${JSON.stringify(error.response.data)}`);
      }
      throw new Error(error.message || 'Erro ao validar token Google');
    }
  }

  /**
   * Verificar senha
   */
  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * Gerar JWT token
   */
  generateToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId,
        employeeId: user.employeeId || null
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );
  }

  /**
   * Verificar JWT token
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido ou expirado');
    }
  }

  /**
   * Login de usuário (Empresa ou Funcionário)
   */
  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    if (!validationService.validateEmail(email)) {
      throw new Error('Email inválido');
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Email ou senha incorretos');
    }

    if (!user.isActive) {
      throw new Error('Esta conta foi desativada');
    }

    const passwordValid = await this.verifyPassword(password, user.password);
    if (!passwordValid) {
      throw new Error('Email ou senha incorretos');
    }

    const token = this.generateToken(user);

    // Montar resposta com dados completos
    const response = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      },
      token,
      expiresIn: JWT_EXPIRES_IN
    };

    if (user.role === 'COMPANY') {
      const company = companies.find(c => c.id === user.companyId);
      if (company) {
        response.company = {
          id: company.id,
          name: company.name,
          cnpj: company.cnpj,
          city: company.city,
          state: company.state
        };
      }
    } else if (user.role === 'EMPLOYEE') {
      const employee = employees.find(e => e.id === user.employeeId);
      if (employee) {
        response.employee = {
          id: employee.id,
          name: employee.name,
          position: employee.position,
          companyId: employee.companyId
        };
      }

      const company = companies.find(c => c.id === user.companyId);
      if (company) {
        response.company = {
          id: company.id,
          name: company.name
        };
      }
    }

    return response;
  }

  /**
   * Registrar empresa com validação de CNPJ
   */
  async registerCompany(companyData) {
    const {
      name,
      email,
      password,
      cnpj,
      cep,
      phone
    } = companyData;

    // Validações
    if (!name || !email || !password || !cnpj) {
      throw new Error('Nome, email, senha e CNPJ são obrigatórios');
    }

    if (!validationService.validateEmail(email)) {
      throw new Error('Email inválido');
    }

    // Verificar se email já existe
    if (users.find(u => u.email === email)) {
      throw new Error('Email já cadastrado');
    }

    // Validar força da senha
    const passwordValidation = validationService.validatePassword(password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.message);
    }

    // Verificação rápida: CNPJ já existe no sistema (antes de chamar BrasilAPI)
    const cleanInputCnpj = cnpj.replace(/\D/g, '');
    if (companies.find(c => {
      const existingClean = c.cnpj.replace(/\D/g, '');
      return existingClean === cleanInputCnpj;
    })) {
      console.error(`[Register Company] ❌ CNPJ ${cleanInputCnpj} já está cadastrado`);
      throw new Error('Este CNPJ já está cadastrado no sistema. Não é permitido mais de uma conta por CNPJ.');
    }

    // ==========================================
    // PASSO 2: CHAMAR A BRASILAPI
    // ==========================================
    console.log(`[CNPJ Validation] Iniciando validação para CNPJ: ${cnpj}`);
    
    let cnpjData;
    try {
      cnpjData = await validationService.validateCNPJ(cnpj);
      console.log(`[CNPJ Validation] ✅ CNPJ válido na Receita Federal`);
      console.log(`[CNPJ Validation] Empresa: ${cnpjData.name}`);
    } catch (error) {
      console.error(`[CNPJ Validation] ❌ Erro: ${error.message}`);
      throw new Error(`Validação de CNPJ falhou: ${error.message}`);
    }

    // ==========================================
    // PASSO 3: VERIFICAR SE TEM 6+ MESES
    // ==========================================
    console.log(`[CNPJ Validation] Verificando se empresa tem 6+ meses...`);
    const createdDate = new Date(cnpjData.founded_at);
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    console.log(`[CNPJ Validation] Data de fundação: ${createdDate.toLocaleDateString('pt-BR')}`);
    console.log(`[CNPJ Validation] Data limite (6 meses atrás): ${sixMonthsAgo.toLocaleDateString('pt-BR')}`);
    
    if (createdDate > sixMonthsAgo) {
      console.error(`[CNPJ Validation] ❌ Empresa com menos de 6 meses`);
      throw new Error('Empresas com menos de 6 meses de existência não são aceitas');
    }
    console.log(`[CNPJ Validation] ✅ Empresa aprovada - tem mais de 6 meses`);

    // Verificar se CNPJ já está cadastrado
    // Comparar tanto com CNPJ formatado quanto com CNPJ limpo
    const cleanCnpj = cnpjData.cnpj.replace(/\D/g, '');
    
    if (companies.find(c => {
      const existingClean = c.cnpj.replace(/\D/g, '');
      return existingClean === cleanCnpj || existingClean === cleanInputCnpj;
    })) {
      console.error(`[CNPJ Validation] ❌ CNPJ ${cleanCnpj} já está cadastrado`);
      throw new Error('Este CNPJ já está cadastrado no sistema. Não é permitido mais de uma conta por CNPJ.');
    }

    // Verificar histórico de trocas de CNPJ (se disponível no payload da API)
    try {
      const raw = cnpjData.raw;
      if (raw && raw.previous_cnpjs && Array.isArray(raw.previous_cnpjs) && raw.previous_cnpjs.length > 3) {
        throw new Error('Empresa com histórico excessivo de troca de CNPJ não é aceita');
      }
    } catch (e) {
      // se não houver dados de histórico, não bloqueia; apenas segue
    }

    // Se CEP foi fornecido, validar e prefillar dados
    let addressData = {
      city: cnpjData.city,
      state: cnpjData.state,
      street: cnpjData.street,
      neighborhood: cnpjData.neighborhood,
      zip: cnpjData.zip,
      number: cnpjData.number || ''
    };

    if (cep) {
      try {
        console.log(`[CEP Validation] Validando CEP: ${cep}`);
        const cepData = await validationService.validateCEP(cep);
        console.log(`[CEP Validation] ✅ CEP válido`);
        addressData = {
          ...addressData,
          ...cepData
        };
      } catch (error) {
        console.warn(`[CEP Validation] ⚠️ Aviso: ${error.message}`);
      }
    }

    // ==========================================
    // PASSO 4: RETORNAR OS DADOS COMPLETOS
    // ==========================================
    console.log(`[CNPJ Validation] Preparando resposta com dados completos...`);
    
    // Hash da senha
    const hashedPassword = await this.hashPassword(password);

    // Criar IDs
    const companyId = `comp_${uuidv4()}`;
    const userId = `user_${uuidv4()}`;

    // Criar empresa com dados completos da BrasilAPI
    const company = {
      id: companyId,
      name: name || cnpjData.name,
      cnpj: cnpjData.cnpj,
      legalName: cnpjData.legalName,
      description: cnpjData.description || '',
      email,
      phone: phone || '',
      city: addressData.city,
      state: addressData.state,
      street: addressData.street,
      neighborhood: addressData.neighborhood,
      zip: addressData.zip,
      number: addressData.number,
      founded_at: cnpjData.founded_at,
      status: cnpjData.status,
      cnae: cnpjData.cnae || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status_system: 'ACTIVE',
      plan: 'BASIC'
    };

    // Criar usuário
    const user = {
      id: userId,
      email,
      password: hashedPassword,
      role: 'COMPANY',
      companyId,
      isActive: true,
      isAdmin: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Salvar em banco de dados
    companies.push(company);
    users.push(user);
    companyAdmins.push({
      userId,
      companyId,
      role: 'ADMIN',
      createdAt: new Date().toISOString()
    });

    // Gerar token
    const token = this.generateToken(user);

    console.log(`[CNPJ Validation] ✅ Empresa registrada com sucesso!`);
    console.log(`[CNPJ Validation] Company ID: ${companyId}`);
    console.log(`[CNPJ Validation] User ID: ${userId}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      },
      company: {
        id: company.id,
        name: company.name,
        cnpj: company.cnpj,
        city: company.city,
        state: company.state
      },
      token,
      expiresIn: JWT_EXPIRES_IN,
      message: 'Empresa registrada com sucesso'
    };
  }

  /**
   * Registrar funcionário com validação de token
   */
  async registerEmployee(employeeData, inviteToken) {
    const {
      name,
      email,
      password,
      phone,
      position
    } = employeeData;

    // Validações
    if (!name || !email || !password || !inviteToken) {
      throw new Error('Nome, email, senha e token de convite são obrigatórios');
    }

    if (!validationService.validateEmail(email)) {
      throw new Error('Email inválido');
    }

    // Verificar força da senha
    const passwordValidation = validationService.validatePassword(password);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.message);
    }

    // Validar token de convite
    let tokenData;
    try {
      tokenData = inviteTokenService.validateToken(inviteToken);
    } catch (error) {
      throw new Error(`Token inválido: ${error.message}`);
    }

    const { companyId } = tokenData;

    // Verificar se email já existe
    if (users.find(u => u.email === email)) {
      throw new Error('Email já cadastrado');
    }

    // Verificar se empresa existe
    const company = companies.find(c => c.id === companyId);
    if (!company) {
      throw new Error('Empresa não encontrada');
    }

    // Hash da senha
    const hashedPassword = await this.hashPassword(password);

    // Criar IDs
    const employeeId = `emp_${uuidv4()}`;
    const userId = `user_${uuidv4()}`;

    // Criar funcionário
    const employee = {
      id: employeeId,
      name,
      email,
      phone: phone || '',
      position: position || '',
      companyId,
      inviteTokenId: inviteToken,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Criar usuário
    const user = {
      id: userId,
      email,
      password: hashedPassword,
      role: 'EMPLOYEE',
      companyId,
      employeeId,
      isActive: true,
      isAdmin: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Marcar token como usado
    try {
      inviteTokenService.useToken(inviteToken, userId, email);
    } catch (error) {
      throw new Error(`Erro ao validar token: ${error.message}`);
    }

    // Salvar em banco de dados
    employees.push(employee);
    users.push(user);

    // Gerar token
    const authToken = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      },
      employee: {
        id: employee.id,
        name: employee.name,
        position: employee.position,
        companyId: employee.companyId
      },
      company: {
        id: company.id,
        name: company.name
      },
      token: authToken,
      expiresIn: JWT_EXPIRES_IN,
      message: 'Funcionário registrado com sucesso'
    };
  }

  /**
   * Obter perfil do usuário autenticado
   */
  getProfile(userId) {
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const profile = {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.companyId,
      isActive: user.isActive
    };

    if (user.role === 'COMPANY') {
      const company = companies.find(c => c.id === user.companyId);
      if (company) {
        profile.company = company;
      }
    } else if (user.role === 'EMPLOYEE') {
      const employee = employees.find(e => e.id === user.employeeId);
      if (employee) {
        profile.employee = employee;
      }

      const company = companies.find(c => c.id === user.companyId);
      if (company) {
        profile.company = {
          id: company.id,
          name: company.name,
          cnpj: company.cnpj
        };
      }
    }

    return profile;
  }

  /**
   * Atualizar perfil do usuário
   */
  async updateProfile(userId, updates) {
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (user.role === 'COMPANY') {
      const company = companies.find(c => c.id === user.companyId);
      if (!company) throw new Error('Empresa não encontrada');

      const { name, phone } = updates;
      if (name) company.name = name;
      if (phone) company.phone = phone;
      company.updatedAt = new Date().toISOString();
    } else if (user.role === 'EMPLOYEE') {
      const employee = employees.find(e => e.id === user.employeeId);
      if (!employee) throw new Error('Funcionário não encontrado');

      const { name, phone, position } = updates;
      if (name) employee.name = name;
      if (phone) employee.phone = phone;
      if (position) employee.position = position;
      employee.updatedAt = new Date().toISOString();
    }

    user.updatedAt = new Date().toISOString();

    // Try to persist to Firebase Realtime Database if available
    try {
      if (firebaseAppInitialized && admin) {
        const db = admin.database();
        const userRef = db.ref(`users/${userId}`);

        const payload = {
          id: user.id,
          email: user.email,
          name: user.name || null,
          role: user.role || null,
          companyId: user.companyId || null,
          isActive: user.isActive,
          updatedAt: user.updatedAt,
          photoURL: user.photoURL || null
        };

        await userRef.update(payload);
        console.log(`[AuthService] Firebase DB: updated user ${userId}`);
      }
    } catch (e) {
      console.warn('[AuthService] Failed to persist profile to Firebase DB:', e?.message || e);
    }

    return this.getProfile(userId);
  }

  /**
   * Mudar senha
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordValid = await this.verifyPassword(currentPassword, user.password);
    if (!passwordValid) {
      throw new Error('Senha atual incorreta');
    }

    const passwordValidation = validationService.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      throw new Error(passwordValidation.message);
    }

    const hashedPassword = await this.hashPassword(newPassword);
    user.password = hashedPassword;
    user.updatedAt = new Date().toISOString();

    return { message: 'Senha alterada com sucesso' };
  }

  /**
   * Gerar token de convite (apenas admin da empresa)
   */
  generateInviteToken(companyId, adminUserId, expiresInDays = 30) {
    const adminCheck = companyAdmins.find(
      a => a.userId === adminUserId && a.companyId === companyId && a.role === 'ADMIN'
    );

    if (!adminCheck) {
      throw new Error('Apenas administradores da empresa podem gerar tokens');
    }

    return inviteTokenService.generateToken(companyId, adminUserId, expiresInDays);
  }

  /**
   * Listar tokens de convite da empresa (apenas admin)
   */
  listInviteTokens(companyId, adminUserId) {
    const adminCheck = companyAdmins.find(
      a => a.userId === adminUserId && a.companyId === companyId && a.role === 'ADMIN'
    );

    if (!adminCheck) {
      throw new Error('Apenas administradores podem listar tokens');
    }

    return inviteTokenService.listCompanyTokens(companyId, {
      includeUsed: true,
      includeExpired: false
    });
  }

  /**
   * Middleware para autenticar token
   */
  authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log('[Auth] Token não fornecido em:', req.path);
      return res.status(401).json({ 
        error: 'Token não fornecido',
        code: 'NO_TOKEN'
      });
    }

    try {
      // Ao usar o método como middleware (ex: authService.authenticateToken)
      // o `this` pode se perder. Preferir a função `verifyToken` ligada
      // ao objeto exportado quando disponível.
      const verifier = (module && module.exports && typeof module.exports.verifyToken === 'function')
        ? module.exports.verifyToken.bind(module.exports)
        : this.verifyToken.bind(this);

      const decoded = verifier(token);
      req.user = decoded;
      console.log('[Auth] Token validado para usuário:', decoded.userId);
      next();
    } catch (error) {
      console.log('[Auth] Erro ao validar token:', error.message);
      return res.status(401).json({ 
        error: 'Token inválido ou expirado',
        code: 'INVALID_TOKEN'
      });
    }
  }

  /**
   * Middleware para autorizar por role
   */
  authorizeRoles(...roles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Acesso negado' });
      }

      next();
    };
  }
}

module.exports = new AuthService();