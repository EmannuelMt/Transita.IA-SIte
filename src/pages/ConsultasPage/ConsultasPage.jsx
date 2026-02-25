import React from 'react';
import ConsultaForm from '../../features/consultas/ConsultaForm';
import { useConsultas } from '../../hooks/useConsultas';
import MultasList from '../../features/multas/MultasList';

const ConsultasPage = () => {
    const { consultas, loading, refetch } = useConsultas();

    // extrair multas de consultas para exibir (concat)
    const multas = consultas.reduce((acc, c) => {
        if (c.multas && Array.isArray(c.multas)) {
            return acc.concat(c.multas);
        }
        return acc;
    }, []);

    return (
        <div>
            <h1>Consultas</h1>
            <ConsultaForm />

            <section style={{ marginTop: 24 }}>
                <h2>Resultados</h2>
                {loading ? (
                    <div>Carregando consultas...</div>
                ) : (
                    <MultasList multas={multas} />
                )}
            </section>
        </div>
    );
};

export default ConsultasPage;
