import { api } from './api';

export const criarConsulta = async (placa, estado) => {
    const resp = await api.post('/consultas', { placa, estado });
    return resp.data;
};

export const listarConsultas = async (params) => {
    const resp = await api.get('/consultas', { params });
    return resp.data;
};

export const getConsultaById = async (id) => {
    const resp = await api.get(`/consultas/${id}`);
    return resp.data;
};
