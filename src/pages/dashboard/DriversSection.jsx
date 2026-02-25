import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import './DriversSection.css';

const DriversSection = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 1,
      name: 'João Silva',
      cnh: '12345678901',
      phone: '(11) 98765-4321',
      status: 'Ativo',
      vehicles: 2,
      fines: 0
    },
    {
      id: 2,
      name: 'Maria Santos',
      cnh: '98765432101',
      phone: '(11) 99876-5432',
      status: 'Ativo',
      vehicles: 1,
      fines: 2
    },
    {
      id: 3,
      name: 'Pedro Oliveira',
      cnh: '55555555555',
      phone: '(11) 97654-3210',
      status: 'Inativo',
      vehicles: 0,
      fines: 5
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section-container">
      <div className="section-header">
        <h2>Motoristas</h2>
        <p>Gerencie todos os motoristas cadastrados</p>
      </div>

      <div className="section-controls">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar motorista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-add">
          <FiPlus /> Novo Motorista
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>CNH</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Veículos</th>
              <th>Multas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map(driver => (
              <tr key={driver.id} className={`status-${driver.status.toLowerCase()}`}>
                <td className="name-cell">{driver.name}</td>
                <td>{driver.cnh}</td>
                <td>{driver.phone}</td>
                <td>
                  <span className={`status-badge ${driver.status.toLowerCase()}`}>
                    {driver.status}
                  </span>
                </td>
                <td className="center">{driver.vehicles}</td>
                <td className="center">
                  <span className={`fine-count ${driver.fines > 0 ? 'has-fines' : ''}`}>
                    {driver.fines}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="action-btn edit">
                    <FiEdit2 />
                  </button>
                  <button className="action-btn delete">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-stats">
        <div className="stat-item">
          <span className="stat-label">Total de Motoristas</span>
          <span className="stat-value">{drivers.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Ativos</span>
          <span className="stat-value" style={{ color: '#10b981' }}>
            {drivers.filter(d => d.status === 'Ativo').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Multas Totais</span>
          <span className="stat-value" style={{ color: '#ef4444' }}>
            {drivers.reduce((acc, d) => acc + d.fines, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DriversSection;
