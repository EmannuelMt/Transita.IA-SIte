const { v4: uuidv4 } = require('uuid');

/**
 * Serviço de gerenciamento de tokens de convite para funcionários
 * Tokens são únicos, podem ser usados apenas uma vez e ficam permanentemente vinculados à conta
 */
class InviteTokenService {
  constructor() {
    this.tokens = new Map(); // Map de tokens: token => { id, companyId, createdAt, expiresAt, usedAt, usedBy }
    this.usedTokens = new Map(); // Map de tokens usados: token => userData
  }

  /**
   * Gerar novo token de convite
   * @param {string} companyId - ID da empresa que está gerando o token
   * @param {string} generatedBy - ID do usuário que gerou o token (admin)
   * @param {number} expiresInDays - Dias até o token expirar (padrão: 30)
   * @returns {Object} Token gerado com metadados
   */
  generateToken(companyId, generatedBy, expiresInDays = 30) {
    if (!companyId || !generatedBy) {
      throw new Error('companyId e generatedBy são obrigatórios');
    }

    const token = uuidv4();
    const createdAt = new Date();
    const expiresAt = new Date(createdAt.getTime() + expiresInDays * 24 * 60 * 60 * 1000);

    const tokenData = {
      id: uuidv4(),
      token,
      companyId,
      generatedBy,
      createdAt: createdAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
      usedAt: null,
      usedBy: null,
      isActive: true
    };

    this.tokens.set(token, tokenData);

    return {
      token,
      expiresAt: expiresAt.toISOString(),
      companyId
    };
  }

  /**
   * Validar token de convite
   * @param {string} token - Token a validar
   * @returns {Object} Dados do token validado
   * @throws {Error} Se token inválido, expirado ou já usado
   */
  validateToken(token) {
    if (!token) {
      throw new Error('Token é obrigatório');
    }

    const tokenData = this.tokens.get(token);

    if (!tokenData) {
      throw new Error('Token inválido ou não encontrado');
    }

    // Verificar se já foi usado
    if (tokenData.usedAt) {
      throw new Error('Este token já foi utilizado e não pode ser reutilizado');
    }

    // Verificar se expirou
    const now = new Date();
    const expiresAt = new Date(tokenData.expiresAt);
    if (now > expiresAt) {
      throw new Error('Token expirado');
    }

    // Verificar se está ativo
    if (!tokenData.isActive) {
      throw new Error('Token foi desativado');
    }

    return {
      valid: true,
      companyId: tokenData.companyId,
      token
    };
  }

  /**
   * Usar token (marcar como utilizado)
   * @param {string} token - Token a usar
   * @param {string} userId - ID do usuário que está usando o token
   * @param {string} email - Email do usuário que está usando o token
   * @returns {Object} Dados do token utilizado
   */
  useToken(token, userId, email) {
    // Validar token primeiro
    this.validateToken(token);

    const tokenData = this.tokens.get(token);

    // Marcar como usado
    const now = new Date();
    tokenData.usedAt = now.toISOString();
    tokenData.usedBy = {
      userId,
      email,
      usedAt: now.toISOString()
    };

    // Guardar em registro de tokens usados
    this.usedTokens.set(token, {
      ...tokenData,
      userEmail: email
    });

    this.tokens.set(token, tokenData);

    return {
      token,
      companyId: tokenData.companyId,
      usedAt: tokenData.usedAt,
      usedBy: email
    };
  }

  /**
   * Deactivar token
   * @param {string} token - Token a deativar
   * @returns {boolean} True se deativado com sucesso
   */
  deactivateToken(token) {
    const tokenData = this.tokens.get(token);

    if (!tokenData) {
      throw new Error('Token não encontrado');
    }

    tokenData.isActive = false;
    this.tokens.set(token, tokenData);

    return true;
  }

  /**
   * Obter informações do token
   * @param {string} token - Token
   * @returns {Object} Dados do token
   */
  getTokenInfo(token) {
    const tokenData = this.tokens.get(token);

    if (!tokenData) {
      throw new Error('Token não encontrado');
    }

    return {
      id: tokenData.id,
      companyId: tokenData.companyId,
      generatedBy: tokenData.generatedBy,
      createdAt: tokenData.createdAt,
      expiresAt: tokenData.expiresAt,
      usedAt: tokenData.usedAt,
      usedBy: tokenData.usedBy,
      isActive: tokenData.isActive,
      isUsed: !!tokenData.usedAt,
      isExpired: new Date() > new Date(tokenData.expiresAt)
    };
  }

  /**
   * Listar tokens de uma empresa
   * @param {string} companyId - ID da empresa
   * @param {Object} options - Opções de filtro { includeUsed: boolean, includeExpired: boolean }
   * @returns {Array} Lista de tokens
   */
  listCompanyTokens(companyId, options = {}) {
    const { includeUsed = false, includeExpired = false } = options;

    const tokens = Array.from(this.tokens.values())
      .filter(t => t.companyId === companyId)
      .map(t => ({
        id: t.id,
        token: t.token.substring(0, 8) + '...',
        createdAt: t.createdAt,
        expiresAt: t.expiresAt,
        usedAt: t.usedAt,
        usedBy: t.usedBy?.email || null,
        isActive: t.isActive,
        isUsed: !!t.usedAt,
        isExpired: new Date() > new Date(t.expiresAt)
      }));

    let filtered = tokens;

    if (!includeUsed) {
      filtered = filtered.filter(t => !t.isUsed);
    }

    if (!includeExpired) {
      filtered = filtered.filter(t => !t.isExpired);
    }

    return filtered;
  }

  /**
   * Verificar se há histórico de muitas trocas de CNPJ
   * Simula validação mais complexa que poderia ser feita via API
   * @param {string} cnpj - CNPJ
   * @returns {boolean} True se há histórico suspeito
   */
  hasExcessiveCNPJChanges(cnpj) {
    // Em um sistema real, isso consultaria um histórico de CNPJs
    // Por enquanto, retorna false como padrão
    return false;
  }

  /**
   * Limpar tokens expirados
   * @returns {number} Quantidade de tokens removidos
   */
  cleanupExpiredTokens() {
    let removed = 0;
    const now = new Date();

    for (const [token, data] of this.tokens.entries()) {
      const expiresAt = new Date(data.expiresAt);
      if (now > expiresAt && !data.usedAt) {
        this.tokens.delete(token);
        removed++;
      }
    }

    return removed;
  }
}

module.exports = new InviteTokenService();
