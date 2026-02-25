import { api } from './api';

/**
 * Obtém estatísticas gerais das multas
 * @param {string} periodo - 'hoje', 'semana', 'mes', 'ano' ou 'todos'
 * @returns {Promise<Object>} Objeto com estatísticas
 */
export const obterEstatisticas = async (periodo = 'mes') => {
    try {
        console.log('Obtendo estatísticas para período:', periodo);
        const response = await api.get(`/estatisticas/multas?periodo=${periodo}`);
        console.log('Estatísticas obtidas:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter estatísticas:', error);
        throw error;
    }
};

/**
 * Obtém estatísticas das multas agrupadas por localidade
 * @param {string} periodo - 'hoje', 'semana', 'mes', 'ano' ou 'todos'
 * @returns {Promise<Array>} Array com estatísticas por estado/cidade
 */
export const obterEstatisticasPorLocalidade = async (periodo = 'mes') => {
    try {
        console.log('Obtendo estatísticas por localidade para período:', periodo);
        const response = await api.get(`/estatisticas/multas/localidade?periodo=${periodo}`);
        console.log('Estatísticas por localidade obtidas:', response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao obter estatísticas por localidade:', error);
        throw error;
    }
};