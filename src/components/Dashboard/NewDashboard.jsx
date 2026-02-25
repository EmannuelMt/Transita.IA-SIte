import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const NewDashboard = () => {
    const [period, setPeriod] = useState('mes');
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/estatisticas/multas?periodo=${period}`);
                setStats(response.data);
            } catch (error) {
                console.error('Erro ao buscar estatísticas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [period]);

    const handlePeriodChange = (event) => {
        setPeriod(event.target.value);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-filters">
                <label htmlFor="period">Selecionar período:</label>
                <select id="period" value={period} onChange={handlePeriodChange}>
                    <option value="hoje">Hoje</option>
                    <option value="semana">Última semana</option>
                    <option value="mes">Último mês</option>
                    <option value="ano">Último ano</option>
                    <option value="todos">Todos</option>
                </select>
            </div>

            <div className="dashboard-content">
                {loading ? (
                    <p>Carregando...</p>
                ) : stats ? (
                    <div className="dashboard-stats">
                        <h3>Estatísticas de Multas</h3>
                        <p>Total: {stats.total}</p>
                        <p>Pendentes: {stats.pendentes}</p>
                        <p>Valores: {JSON.stringify(stats.valores)}</p>
                    </div>
                ) : (
                    <p>Nenhum dado disponível.</p>
                )}
            </div>
        </div>
    );
};

export default NewDashboard;