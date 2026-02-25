import React, { useState } from 'react';
import { FiFilter, FiDownload, FiSearch, FiEye } from 'react-icons/fi';
import './FinesSection.css';

const FinesSection = () => {
  const [fines, setFines] = useState([
    {
      id: 1,
      protocol: 'MUL-2024-001',
      driver: 'João Silva',
      vehicle: 'ABC-1234',
      date: '2024-02-15',
      type: 'Excesso de velocidade',
      location: 'Av. Paulista, 1000',
      amount: 293.47,
      status: 'Paga',
      speed: 85,
      limit: 60
    },
    {
      id: 2,
      protocol: 'MUL-2024-002',
      driver: 'Maria Santos',
      vehicle: 'XYZ-5678',
      date: '2024-02-18',
      type: 'Parada proibida',
      location: 'Rua Augusta, 500',
      amount: 195.00,
      status: 'Pendente',
      speed: null,
      limit: null
    },
    {
      id: 3,
      protocol: 'MUL-2024-003',
      driver: 'Pedro Oliveira',
      vehicle: 'DEF-9012',
      date: '2024-02-20',
      type: 'Avanço de sinal',
      location: 'Rua Oscar Freire, 250',
      amount: 195.00,
      status: 'Paga',
      speed: null,
      limit: null
    },
    {
      id: 4,
      protocol: 'MUL-2024-004',
      driver: 'Maria Santos',
      vehicle: 'XYZ-5678',
      date: '2024-02-22',
      type: 'Excesso de velocidade',
      location: 'Rodovia Imigrantes, km 15',
      amount: 880.41,
      status: 'Contestando',
      speed: 110,
      limit: 80
    },
    {
      id: 5,
      protocol: 'MUL-2024-005',
      driver: 'João Silva',
      vehicle: 'ABC-1234',
      date: '2024-02-23',
      type: 'Estacionamento irregular',
      location: 'Praça da República',
      amount: 97.65,
      status: 'Pendente',
      speed: null,
      limit: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredFines = fines.filter(fine => {
    const matchesSearch = fine.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.protocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || fine.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalFines = fines.reduce((acc, fine) => acc + fine.amount, 0);
  const paidFines = fines.filter(f => f.status === 'Paga').reduce((acc, f) => acc + f.amount, 0);
  const pendingFines = fines.filter(f => f.status === 'Pendente').reduce((acc, f) => acc + f.amount, 0);

  return (
    <div className="section-container">
      <div className="section-header">
        <h2>Multas</h2>
        <p>Relatório de multas de trânsito</p>
      </div>

      <div className="fines-metrics">
        <div className="metric-card">
          <span className="metric-label">Total de Multas</span>
          <span className="metric-value">R$ {totalFines.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          <span className="metric-unit">{fines.length} registros</span>
        </div>
        <div className="metric-card paid">
          <span className="metric-label">Multas Pagas</span>
          <span className="metric-value">R$ {paidFines.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          <span className="metric-unit">{fines.filter(f => f.status === 'Paga').length} registros</span>
        </div>
        <div className="metric-card pending">
          <span className="metric-label">Multas Pendentes</span>
          <span className="metric-value">R$ {pendingFines.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          <span className="metric-unit">{fines.filter(f => f.status === 'Pendente').length} registros</span>
        </div>
        <div className="metric-card contested">
          <span className="metric-label">Em Contestação</span>
          <span className="metric-value">{fines.filter(f => f.status === 'Contestando').length}</span>
          <span className="metric-unit">processando</span>
        </div>
      </div>

      <div className="section-controls">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar motorista, protocolo ou tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Todos os Status</option>
          <option value="Paga">Paga</option>
          <option value="Pendente">Pendente</option>
          <option value="Contestando">Contestando</option>
        </select>
        <button className="btn-add">
          <FiDownload /> Exportar
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Protocolo</th>
              <th>Motorista</th>
              <th>Veículo</th>
              <th>Data</th>
              <th>Tipo de Infração</th>
              <th>Local</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredFines.map(fine => (
              <tr key={fine.id} className={`status-${fine.status.toLowerCase().replace(' ', '-')}`}>
                <td className="protocol-cell">{fine.protocol}</td>
                <td>{fine.driver}</td>
                <td className="vehicle-cell">{fine.vehicle}</td>
                <td>{new Date(fine.date).toLocaleDateString('pt-BR')}</td>
                <td>
                  <span className="infraction-type">
                    {fine.type}
                    {fine.speed && ` (${fine.speed}km/h)`}
                  </span>
                </td>
                <td className="location-cell">{fine.location}</td>
                <td className="amount-cell">
                  R$ {fine.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td>
                  <span className={`status-badge ${fine.status.toLowerCase().replace(' ', '-')}`}>
                    {fine.status}
                  </span>
                </td>
                <td className="action-cell">
                  <button className="action-btn view" title="Ver detalhes">
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span className="result-count">Mostrando {filteredFines.length} de {fines.length} multas</span>
      </div>
    </div>
  );
};

export default FinesSection;
