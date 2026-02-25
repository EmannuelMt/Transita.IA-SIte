import { api } from './api';

/**
 * Gera um relatório de multas com base nos filtros especificados
 * @param {Object} params - Parâmetros para geração do relatório
 * @param {string} params.periodo - Período do relatório ('hoje', 'semana', 'mes', 'ano', 'todos')
 * @param {Object} params.filtros - Filtros aplicados
 * @param {string[]} params.filtros.status - Lista de status para filtrar
 * @param {string[]} params.filtros.estado - Lista de estados para filtrar
 * @param {Object} params.filtros.valor - Faixa de valores para filtrar
 * @param {number} params.filtros.valor.min - Valor mínimo
 * @param {number} params.filtros.valor.max - Valor máximo
 * @returns {Promise<Blob>} Blob contendo o PDF do relatório
 */
export const gerarRelatorio = async ({ periodo, filtros }) => {
    try {
        const response = await api.post('/multas/relatorios', {
            periodo,
            filtros,
            formato: 'pdf'
        }, {
            responseType: 'blob' // Importante para receber o arquivo PDF
        });

        if (response.status === 200) {
            return response.data;
        }

        throw new Error('Erro ao gerar relatório');
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
        throw error;
    }
};

/**
 * Gera um relatório estatístico por localidade
 * @param {Object} params - Parâmetros para geração do relatório
 * @param {string} params.estado - Estado para filtrar (opcional)
 * @param {string} params.cidade - Cidade para filtrar (opcional)
 * @param {string} params.periodo - Período do relatório ('hoje', 'semana', 'mes', 'ano', 'todos')
 * @returns {Promise<Blob>} Blob contendo o PDF do relatório
 */
export const gerarRelatorioLocalidade = async ({ estado, cidade, periodo }) => {
    try {
        const response = await api.post('/multas/relatorios/localidade', {
            estado,
            cidade,
            periodo,
            formato: 'pdf'
        }, {
            responseType: 'blob'
        });

        if (response.status === 200) {
            return response.data;
        }

        throw new Error('Erro ao gerar relatório por localidade');
    } catch (error) {
        console.error('Erro ao gerar relatório por localidade:', error);
        throw error;
    }
};

/**
 * Envia por e-mail um relatório PDF compilado dos relatórios selecionados.
 * O backend deve validar a senha e enviar o PDF para o e-mail informado.
 * @param {Object} params
 * @param {string[]} params.reports - Lista de relatórios a incluir (ex: ['multas','financeiro','frota'])
 * @param {string} params.periodo
 * @param {string} params.email
 * @param {string} params.password
 * @returns {Promise<Object>} resultado do envio
 */
export const enviarRelatorioPorEmail = async ({ reports, periodo, email, password }) => {
    try {
        const response = await api.post('/relatorios/export', {
            reports,
            periodo,
            email,
            password
        });

        return response.data;
    } catch (error) {
        console.error('Erro ao enviar relatório por email:', error, error?.response?.data);
        throw error;
    }
};