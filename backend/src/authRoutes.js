const express = require('express');
const authService = require('./authService');
const validationService = require('./validationService');

const router = express.Router();

/**
 * POST /api/auth/login
 * Login para Empresa ou Funcionário
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({
      error: error.message,

      code: 'AUTH_LOGIN_FAILED'
    });
  }
});

/**
 * POST /api/auth/register/company
 * Registrar nova empresa com validação de CNPJ via BrasilAPI
 * Body: { name, email, password, cnpj, cep?, phone? }
 */
router.post('/register/company', async (req, res) => {
  try {
    const { name, email, password, cnpj, cep, phone } = req.body;

    const result = await authService.registerCompany({
      name,
      email,
      password,
      cnpj,
      cep,
      phone
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      code: 'COMPANY_REGISTRATION_FAILED'
    });
  }
});

/**
 * POST /api/auth/register/employee
 * Registrar novo funcionário com validação de token
 * Requer: token de convite válido
 * Body: { name, email, password, phone?, position?, inviteToken }
 */
router.post('/register/employee', async (req, res) => {
  try {
    const { name, email, password, phone, position, inviteToken } = req.body;

    const result = await authService.registerEmployee({
      name,
      email,
      password,
      phone,
      position
    }, inviteToken);

    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      code: 'EMPLOYEE_REGISTRATION_FAILED'
    });
  }
});

/**
 * POST /api/auth/google
 * Login via Google ID Token (front-end sends idToken)
 * Body: { idToken }
 */
router.post('/google', async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: 'idToken é obrigatório', code: 'IDTOKEN_REQUIRED' });
    }

    const result = await authService.loginWithGoogle(idToken);
    res.status(200).json(result);
  } catch (error) {
    console.error('[POST /api/auth/google] Erro:', error.message);
    res.status(401).json({ error: error.message, code: 'GOOGLE_AUTH_FAILED' });
  }
});

/**
 * GET /api/auth/profile
 * Obter perfil do usuário autenticado
 * Requer: Bearer token
 */
router.get('/profile', authService.authenticateToken, (req, res) => {
  try {
    console.log('[GET /profile] Autenticação passou, userId:', req.user?.userId);
    const profile = authService.getProfile(req.user.userId);
    console.log('[GET /profile] Perfil obtido com sucesso');
    res.status(200).json(profile);
  } catch (error) {
    console.error('[GET /profile] Erro ao obter perfil:', error.message);
    res.status(404).json({
      error: error.message,
      code: 'PROFILE_NOT_FOUND'
    });
  }
});

/**
 * PUT /api/auth/profile
 * Atualizar perfil do usuário autenticado
 * Requer: Bearer token
 * Body: { name?, phone?, position? }
 */
router.put('/profile', authService.authenticateToken, async (req, res) => {
  try {
    const profile = await authService.updateProfile(req.user.userId, req.body);
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      code: 'PROFILE_UPDATE_FAILED'
    });
  }
});

/**
 * PUT /api/auth/change-password
 * Alterar senha do usuário autenticado
 * Requer: Bearer token
 * Body: { currentPassword, newPassword }
 */
router.put('/change-password', authService.authenticateToken, async (req, res) => {
  try {
    const result = await authService.changePassword(
      req.user.userId,
      req.body.currentPassword,
      req.body.newPassword
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      code: 'PASSWORD_CHANGE_FAILED'
    });
  }
});

/**
 * POST /api/auth/invite-token
 * Gerar token de convite para funcionário (apenas admin da empresa)
 * Requer: Bearer token de admin
 * Body: { expiresInDays?: number }
 */
router.post('/invite-token', authService.authenticateToken, (req, res) => {
  try {
    const { expiresInDays = 30 } = req.body;
    const token = authService.generateInviteToken(
      req.user.companyId,
      req.user.userId,
      expiresInDays
    );
    res.status(201).json(token);
  } catch (error) {
    res.status(403).json({
      error: error.message,
      code: 'INVITE_TOKEN_GENERATION_FAILED'
    });
  }
});

/**
 * GET /api/auth/invite-tokens
 * Listar tokens de convite da empresa (apenas admin)
 * Requer: Bearer token de admin
 */
router.get('/invite-tokens', authService.authenticateToken, (req, res) => {
  try {
    const tokens = authService.listInviteTokens(
      req.user.companyId,
      req.user.userId
    );
    res.status(200).json(tokens);
  } catch (error) {
    res.status(403).json({
      error: error.message,
      code: 'INVITE_TOKENS_LIST_FAILED'
    });
  }
});

/**
 * GET /api/auth/validate-email/:email
 * Validar se email já existe e validar formato
 */
router.get('/validate-email/:email', (req, res) => {
  try {
    const { email } = req.params;
    const isValid = validationService.validateEmail(email);
    res.status(200).json({
      email,
      isValid,
      message: isValid ? 'Email válido' : 'Email inválido'
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      code: 'EMAIL_VALIDATION_FAILED'
    });
  }
});

/**
 * POST /api/auth/test-cnpj-format
 * Endpoint de teste para debugar validação de formato CNPJ
 * Body: { cnpj }
 */
router.post('/test-cnpj-format', (req, res) => {
  try {
    const { cnpj } = req.body;
    
    console.log(`\n[TEST-CNPJ-FORMAT] ====================================`);
    console.log(`[TEST-CNPJ-FORMAT] CNPJ recebido: ${cnpj}`);
    console.log(`[TEST-CNPJ-FORMAT] Tipo: ${typeof cnpj}`);
    
    const cleanCnpj = String(cnpj).replace(/\D/g, '');
    console.log(`[TEST-CNPJ-FORMAT] CNPJ limpo: ${cleanCnpj}`);
    console.log(`[TEST-CNPJ-FORMAT] Comprimento: ${cleanCnpj.length}`);
    
    const isValidFormat = validationService.validateCNPJFormat(cleanCnpj);
    console.log(`[TEST-CNPJ-FORMAT] Formato válido: ${isValidFormat}`);
    
    res.status(200).json({
      cnpj_original: cnpj,
      cnpj_limpo: cleanCnpj,
      comprimento: cleanCnpj.length,
      isValidFormat,
      message: isValidFormat ? 'Formato válido' : 'Formato inválido'
    });
  } catch (error) {
    console.error(`[TEST-CNPJ-FORMAT] Erro:`, error);
    res.status(500).json({
      error: error.message,
      code: 'TEST_ERROR'
    });
  }
});

/**
 * POST /api/auth/validate-cnpj
 * Validar CNPJ via BrasilAPI (Steps 2, 3, 4)
 * Step 1: Valida formato localmente
 * Step 2: Chama a BrasilAPI
 * Step 3: Verifica se tem 6+ meses
 * Step 4: Retorna os dados completos
 * Body: { cnpj }
 */
router.post('/validate-cnpj', async (req, res) => {
  try {
    const { cnpj } = req.body;
    
    if (!cnpj) {
      return res.status(400).json({
        error: 'CNPJ é obrigatório',
        code: 'CNPJ_REQUIRED',
        valid: false,
        message: 'Por favor, informe um CNPJ'
      });
    }

    console.log(`\n[VALIDATE-CNPJ] ========================================`);
    console.log(`[VALIDATE-CNPJ] Iniciando validação de CNPJ: ${cnpj}`);
    
    // STEP 1: Validação local de formato
    const cleanCnpj = cnpj.replace(/\D/g, '');
    console.log(`[VALIDATE-CNPJ] CNPJ limpo: ${cleanCnpj}`);
    
    if (cleanCnpj.length !== 14) {
      console.error(`[VALIDATE-CNPJ] ❌ CNPJ deve ter 14 dígitos, tem ${cleanCnpj.length}`);
      return res.status(400).json({
        error: 'CNPJ deve conter 14 dígitos',
        code: 'INVALID_FORMAT',
        valid: false,
        message: 'CNPJ inválido - deve ter 14 dígitos'
      });
    }

    if (!validationService.validateCNPJFormat(cleanCnpj)) {
      console.error(`[VALIDATE-CNPJ] ❌ Validação de formato falhou`);
      return res.status(400).json({
        error: 'Dígitos verificadores do CNPJ inválidos',
        code: 'INVALID_CHECK_DIGITS',
        valid: false,
        message: 'CNPJ inválido - dígitos verificadores incorretos'
      });
    }
    
    console.log(`[VALIDATE-CNPJ] ✅ Formato local validado com sucesso`);
    
    // STEP 2: Chama a BrasilAPI
    console.log(`[VALIDATE-CNPJ] Chamando BrasilAPI...`);
    const data = await validationService.validateCNPJ(cnpj);
    console.log(`[VALIDATE-CNPJ] ✅ BrasilAPI retornou dados`);
    console.log(`[VALIDATE-CNPJ] Empresa: ${data.name}`);
    console.log(`[VALIDATE-CNPJ] Fundação: ${data.founded_at}`);
    
    // STEP 3: Verifica se tem 6+ meses (já feito no validationService)
    console.log(`[VALIDATE-CNPJ] ✅ Empresa tem 6+ meses de existência`);
    
    // STEP 4: Retorna os dados completos
    console.log(`[VALIDATE-CNPJ] ✅ Retornando dados completos`);
    console.log(`[VALIDATE-CNPJ] ========================================\n`);
    
    const response = {
      valid: true,
      cnpj: data.cnpj,
      name: data.name,
      legalName: data.legalName,
      city: data.city,
      state: data.state,
      street: data.street,
      neighborhood: data.neighborhood,
      zip: data.zip,
      number: data.number,
      founded_at: data.founded_at,
      status: data.status,
      description: data.description,
      cnae: data.cnae,
      months_active: calculateMonthsActive(data.founded_at),
      eligible_for_registration: true,
      message: 'CNPJ válido e empresa elegível para registro'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error(`[VALIDATE-CNPJ] ❌ Erro: ${error.message}`);
    console.log(`[VALIDATE-CNPJ] ========================================\n`);
    
    res.status(400).json({
      error: error.message,
      code: 'CNPJ_VALIDATION_FAILED',
      valid: false,
      message: error.message
    });
  }
});

/**
 * Helper: Calcular meses ativos
 */
function calculateMonthsActive(foundedDate) {
  const founded = new Date(foundedDate);
  const now = new Date();
  
  let months = (now.getFullYear() - founded.getFullYear()) * 12;
  months += now.getMonth() - founded.getMonth();
  
  return months;
}

/**
 * POST /api/auth/validate-cep
 * Validar CEP via BrasilAPI
 * Body: { cep }
 */
router.post('/validate-cep', async (req, res) => {
  try {
    const { cep } = req.body;
    const data = await validationService.validateCEP(cep);
    res.status(200).json({
      cep: data.cep,
      street: data.street,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      valid: true
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      code: 'CEP_VALIDATION_FAILED'
    });
  }
});

/**
 * POST /api/auth/validate-password
 * Validar força da senha
 * Body: { password }
 */
router.post('/validate-password', (req, res) => {
  try {
    const { password } = req.body;
    const validation = validationService.validatePassword(password);
    res.status(200).json(validation);
  } catch (error) {
    res.status(400).json({
      error: error.message,
      code: 'PASSWORD_VALIDATION_FAILED'
    });
  }
});

module.exports = router;