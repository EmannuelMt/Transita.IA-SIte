/**
 * @typedef {Object} CNPJResponse
 * @property {string} cnpj
 * @property {string} razao_social
 * @property {string} nome_fantasia
 * @property {string} cep
 * @property {string} logradouro
 * @property {string} numero
 * @property {string} complemento
 * @property {string} bairro
 * @property {string} municipio
 * @property {string} uf
 * @property {string} [message]
 */

/**
 * @typedef {Object} CEPResponse
 * @property {string} cep
 * @property {string} logradouro
 * @property {string} complemento
 * @property {string} bairro
 * @property {string} localidade
 * @property {string} uf
 * @property {boolean} [erro]
 */

/**
 * @typedef {Object} OnboardingForm
 * @property {string} razaoSocial
 * @property {string} cnpj
 * @property {string} cep
 * @property {string} logradouro
 * @property {string} bairro
 * @property {string} cidade
 * @property {string} uf
 * @property {string} senha
 */

/**
 * @typedef {Object} TeamForm
 * @property {string} nomeEmpresa
 * @property {string} token
 * @property {string} cep
 * @property {string} logradouro
 * @property {string} bairro
 * @property {string} cidade
 * @property {string} uf
 * @property {string} senha
 */

/**
 * @typedef {'both' | 'empresa' | 'equipe'} ViewMode
 */

// Export empty object to make it a module
export {};
