// Simulação de banco de dados em memória (em produção, use um banco real)
let users = [
  {
    id: 'user1',
    name: 'João Silva',
    email: 'joao@empresa.com',
    passwordHash: '$2b$10$hashedpassword', // senha: '123456'
    role: 'COMPANY',
    companyId: 'company1',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'user2',
    name: 'Maria Santos',
    email: 'maria@empresa.com',
    passwordHash: '$2b$10$hashedpassword', // senha: '123456'
    role: 'EMPLOYEE',
    companyId: 'company1',
    createdAt: new Date('2024-01-15')
  }
];

let companies = [
  {
    id: 'company1',
    name: 'Empresa ABC Ltda',
    cnpj: '12.345.678/0001-90',
    plan: 'PREMIUM',
    ownerUserId: 'user1',
    createdAt: new Date('2024-01-01')
  }
];

let employees = [
  {
    id: 'emp1',
    userId: 'user2',
    companyId: 'company1',
    position: 'Gerente de Frota',
    permissions: ['read_fleet', 'write_fleet', 'read_reports'],
    createdAt: new Date('2024-01-15')
  }
];

let inviteTokens = [];

class UserService {
  // Autenticação
  async authenticate(email, password) {
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Simulação de verificação de senha (em produção, use bcrypt)
    if (password !== '123456') {
      throw new Error('Senha incorreta');
    }

    // Buscar dados relacionados
    let company = null;
    let employee = null;

    if (user.role === 'COMPANY') {
      company = companies.find(c => c.id === user.companyId);
    } else if (user.role === 'EMPLOYEE') {
      employee = employees.find(e => e.userId === user.id);
      company = companies.find(c => c.id === employee?.companyId);
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      },
      company,
      employee
    };
  }

  // Criar usuário empresa
  async createCompanyUser(userData) {
    const { name, email, password, companyData } = userData;

    // Verificar se email já existe
    if (users.find(u => u.email === email)) {
      throw new Error('Email já cadastrado');
    }

    // Criar empresa
    const companyId = `company${Date.now()}`;
    const company = {
      id: companyId,
      name: companyData.name,
      cnpj: companyData.cnpj,
      plan: 'BASIC',
      ownerUserId: null, // será definido após criar usuário
      createdAt: new Date()
    };
    companies.push(company);

    // Criar usuário
    const userId = `user${Date.now()}`;
    const user = {
      id: userId,
      name,
      email,
      passwordHash: password, // em produção, hash da senha
      role: 'COMPANY',
      companyId,
      createdAt: new Date()
    };
    users.push(user);

    // Atualizar owner da empresa
    company.ownerUserId = userId;

    return { user, company };
  }

  // Criar token de convite para funcionário
  async createInviteToken(companyId, createdByUserId) {
    // Verificar se usuário é da empresa
    const user = users.find(u => u.id === createdByUserId);
    if (!user || user.companyId !== companyId) {
      throw new Error('Acesso negado');
    }

    const token = `invite_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const inviteToken = {
      token,
      companyId,
      createdBy: createdByUserId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
      used: false,
      createdAt: new Date()
    };

    inviteTokens.push(inviteToken);
    return inviteToken;
  }

  // Usar token de convite para criar funcionário
  async createEmployeeFromInvite(token, userData) {
    const { name, email, password, position } = userData;

    // Validar token
    const inviteToken = inviteTokens.find(t => t.token === token && !t.used);
    if (!inviteToken) {
      throw new Error('Token inválido ou expirado');
    }

    if (new Date() > inviteToken.expiresAt) {
      throw new Error('Token expirado');
    }

    // Verificar se email já existe
    if (users.find(u => u.email === email)) {
      throw new Error('Email já cadastrado');
    }

    // Criar usuário funcionário
    const userId = `user${Date.now()}`;
    const user = {
      id: userId,
      name,
      email,
      passwordHash: password, // em produção, hash da senha
      role: 'EMPLOYEE',
      companyId: inviteToken.companyId,
      createdAt: new Date()
    };
    users.push(user);

    // Criar funcionário
    const employeeId = `emp${Date.now()}`;
    const employee = {
      id: employeeId,
      userId,
      companyId: inviteToken.companyId,
      position,
      permissions: ['read_basic'], // permissões básicas
      createdAt: new Date()
    };
    employees.push(employee);

    // Marcar token como usado
    inviteToken.used = true;

    return { user, employee };
  }

  // Buscar usuário por ID
  getUserById(userId) {
    return users.find(u => u.id === userId);
  }

  // Buscar empresa por ID
  getCompanyById(companyId) {
    return companies.find(c => c.id === companyId);
  }

  // Buscar funcionário por userId
  getEmployeeByUserId(userId) {
    return employees.find(e => e.userId === userId);
  }

  // Listar funcionários da empresa
  getCompanyEmployees(companyId) {
    return employees.filter(e => e.companyId === companyId).map(emp => ({
      ...emp,
      user: users.find(u => u.id === emp.userId)
    }));
  }

  // Atualizar permissões do funcionário
  updateEmployeePermissions(employeeId, permissions, updatedByUserId) {
    const employee = employees.find(e => e.id === employeeId);
    if (!employee) {
      throw new Error('Funcionário não encontrado');
    }

    // Verificar se quem está atualizando é da mesma empresa
    const updater = users.find(u => u.id === updatedByUserId);
    if (!updater || updater.companyId !== employee.companyId) {
      throw new Error('Acesso negado');
    }

    employee.permissions = permissions;
    return employee;
  }

  // Atualizar dados da empresa
  updateCompany(companyId, updates, updatedByUserId) {
    const company = companies.find(c => c.id === companyId);
    if (!company) {
      throw new Error('Empresa não encontrada');
    }

    // Verificar se quem está atualizando é o dono ou funcionário da empresa
    const updater = users.find(u => u.id === updatedByUserId);
    if (!updater || (updater.role === 'EMPLOYEE' && updater.companyId !== companyId) ||
        (updater.role === 'COMPANY' && company.ownerUserId !== updatedByUserId)) {
      throw new Error('Acesso negado');
    }

    Object.assign(company, updates);
    return company;
  }

  // Atualizar dados do usuário
  updateUser(userId, updates, updatedByUserId) {
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Usuário só pode atualizar seus próprios dados, ou empresa pode atualizar funcionários
    const updater = users.find(u => u.id === updatedByUserId);
    if (updatedByUserId !== userId && !(updater.role === 'COMPANY' && updater.companyId === user.companyId)) {
      throw new Error('Acesso negado');
    }

    Object.assign(user, updates);
    return user;
  }
}

module.exports = new UserService();