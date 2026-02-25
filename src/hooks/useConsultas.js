import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useConsultas = (filters = {}) => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchConsultas = async () => {
        try {
            setLoading(true);
            const response = await api.get('/consultas', {
                params: {
                    ...filters,
                    page
                }
            });
            setConsultas(response.data.consultas);
            setTotalPages(response.data.pages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConsultas();
    }, [page, JSON.stringify(filters)]);

    const refetch = () => {
        fetchConsultas();
    };

    return {
        consultas,
        loading,
        error,
        page,
        totalPages,
        setPage,
        refetch
    };
};