const axios = require('axios');

class ValidationService {
  /**
   * Validar CEP usando BrasilAPI
   * @param {string} cep - CEP no formato: 12345-678 ou 12345678
   * @returns {Promise<Object>} Dados do CEP validado
   */
  async validateCEP(cep) {
    try {
      // Remove formatação
      const cleanCep = cep.replace(/\D/g, '');

      if (cleanCep.length !== 8) {
        throw new Error('CEP deve conter 8 dígitos');
      }

      const response = await axios.get(
        `https://brasilapi.com.br/api/cep/v2/${cleanCep}`
      );

      if (response.data.status === 400) {
        throw new Error('CEP não encontrado');
      }

      return {
        cep: response.data.cep,
        street: response.data.street,
        neighborhood: response.data.neighborhood,
        city: response.data.city,
        state: response.data.state,
        service: response.data.service
      };
    } catch (error) {
      throw new Error(`Erro ao validar CEP: ${error.message}`);
    }
  }

  /**
   * Validar CNPJ usando BrasilAPI
   * @param {string} cnpj - CNPJ no formato: 12.345.678/0001-90 ou 12345678000190
   * @returns {Promise<Object>} Dados da empresa validada
   */
  async validateCNPJ(cnpj) {
    try {
      // Remove formatação
      const cleanCnpj = cnpj.replace(/\D/g, '');

      if (cleanCnpj.length !== 14) {
        throw new Error('CNPJ deve conter 14 dígitos');
      }

      // Primeiro valida o formato do CNPJ
      if (!this.validateCNPJFormat(cleanCnpj)) {
        throw new Error('CNPJ inválido - falha na validação de formato');
      }

      // Formatar CNPJ para a API
      const formattedCnpj = cleanCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      
      const response = await axios.get(
        `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`,
        {
          timeout: 10000
        }
      );

      if (response.status === 204 || !response.data) {
        throw new Error('CNPJ não encontrado');
      }

      // Validar se a empresa tem menos de 6 meses
      const createdDate = new Date(response.data.founded_at || response.data.creation_date);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      if (createdDate > sixMonthsAgo) {
        throw new Error('Empresas com menos de 6 meses de existência não são aceitas');
      }

      return {
        cnpj: formattedCnpj,
        name: response.data.name,
        legalName: response.data.legal_name,
        state: response.data.state,
        city: response.data.city,
        street: response.data.street,
        number: response.data.number,
        neighborhood: response.data.neighborhood,
        zip: response.data.zip,
        founded_at: response.data.founded_at,
        status: response.data.status,
        description: response.data.description,
        cnae: response.data.cnae_description,
        // full raw payload to allow consumers to inspect additional metadata (history, activity, etc.)
        raw: response.data
      };
    } catch (error) {
      console.error('CNPJ validation error:', error.message);
      
      if (error.response?.status === 404) {
        throw new Error('CNPJ não encontrado na Receita Federal');
      }
      
      if (error.message.includes('timeout')) {
        throw new Error('Serviço de validação indisponível. Tente novamente.');
      }
      
      throw new Error(`Erro ao validar CNPJ: ${error.message}`);
    }
  }

  /**
   * Validar formato de email
   * @param {string} email - Email a validar
   * @returns {boolean} True se válido
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validar força da senha
   * @param {string} password - Senha a validar
   * @returns {Object} { isValid, strength, message }
   */
  validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    let strength = 'fraca';
    let isValid = password.length >= minLength;

    if (password.length >= minLength) {
      if (hasUpperCase && hasLowerCase && hasNumbers) strength = 'media';
      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) strength = 'forte';
    }

    return {
      isValid,
      strength,
      message: isValid ? 'Senha válida' : 'Senha deve ter no mínimo 8 caracteres'
    };
  }

  /**
   * Validar documento (CPF ou CNPJ)
   * @param {string} doc - Documento a validar
   * @returns {Object} { type, isValid }
   */
  validateDocument(doc) {
    const cleanDoc = doc.replace(/\D/g, '');

    if (cleanDoc.length === 11) {
      return {
        type: 'CPF',
        isValid: this.validateCPF(cleanDoc)
      };
    } else if (cleanDoc.length === 14) {
      return {
        type: 'CNPJ',
        isValid: this.validateCNPJFormat(cleanDoc)
      };
    }

    return {
      type: null,
      isValid: false
    };
  }

  /**
   * Validar formato de CPF (apenas verificação de formato)
   * @param {string} cpf - CPF limpo (11 dígitos)
   * @returns {boolean}
   */
  validateCPF(cpf) {
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Todos os dígitos iguais

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  /**
   * Validar formato de CNPJ
   * @param {string} cnpj - CNPJ limpo (14 dígitos)
   * @returns {boolean}
   */
  validateCNPJFormat(cnpj) {
    if (cnpj.length !== 14) return false;
    
    // Rejeitar CNPJs com todos os dígitos iguais
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    // Validar primeiro dígito verificador
    // Multiplicadores: 5, 4, 3, 2, 9, 8, 7, 6
    const firstMultipliers = [5, 4, 3, 2, 9, 8, 7, 6];
    let sum = 0;
    
    for (let i = 0; i < 8; i++) {
      sum += parseInt(cnpj.charAt(i)) * firstMultipliers[i];
    }
    
    let remainder = sum % 11;
    let firstDigit = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cnpj.charAt(8)) !== firstDigit) {
      console.log(`[CNPJ] Primeiro dígito inválido: esperado ${firstDigit}, obtido ${cnpj.charAt(8)}`);
      return false;
    }

    // Validar segundo dígito verificador
    // Multiplicadores: 6, 5, 4, 3, 2, 9, 8, 7, 6
    const secondMultipliers = [6, 5, 4, 3, 2, 9, 8, 7, 6];
    sum = 0;
    
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cnpj.charAt(i)) * secondMultipliers[i];
    }
    
    remainder = sum % 11;
    let secondDigit = remainder < 2 ? 0 : 11 - remainder;
    
    if (parseInt(cnpj.charAt(9)) !== secondDigit) {
      console.log(`[CNPJ] Segundo dígito inválido: esperado ${secondDigit}, obtido ${cnpj.charAt(9)}`);
      return false;
    }

    console.log(`[CNPJ] ✅ Formato válido: ${cnpj}`);
    return true;
  }

  /**
   * Formatar CNPJ para exibição
   * @param {string} cnpj - CNPJ sem formatação
   * @returns {string} CNPJ formatado
   */
  formatCNPJ(cnpj) {
    const clean = cnpj.replace(/\D/g, '');
    return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }

  /**
   * Formatar CEP para exibição
   * @param {string} cep - CEP sem formatação
   * @returns {string} CEP formatado
   */
  formatCEP(cep) {
    const clean = cep.replace(/\D/g, '');
    return clean.replace(/(\d{5})(\d{3})/, '$1-$2');
  }
}

module.exports = new ValidationService();
