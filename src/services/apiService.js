/**
 * Validates and fetches CEP data - desativada
 */
export const fetchCEP = async (cep) => {
  // Retorna dados mock
  return {
    cep: cep.replace(/\D/g, ''),
    logradouro: 'Rua Teste',
    bairro: 'Bairro Teste',
    localidade: 'Cidade Teste',
    uf: 'SP'
  };
};

/**
 * Validates and fetches CNPJ data - desativada
 */
export const fetchCNPJ = async (cnpj) => {
  // Retorna dados mock
  return {
    cnpj: cnpj.replace(/\D/g, ''),
    nome: 'Empresa Teste Ltda',
    fantasia: 'Fantasia Teste',
    situacao: 'ATIVA'
  };
};