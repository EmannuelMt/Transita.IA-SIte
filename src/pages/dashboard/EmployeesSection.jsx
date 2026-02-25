import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import './EmployeesSection.css';

const EmployeesSection = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Ana Costa',
      email: 'ana@transita.com',
      department: 'Operações',
      phone: '(11) 98765-4321',
      status: 'Ativo',
      salary: 3500.00
    },
    {
      id: 2,
      name: 'Carlos Mendes',
      email: 'carlos@transita.com',
      department: 'Administrativo',
      phone: '(11) 99876-5432',
      status: 'Ativo',
      salary: 2800.00
    },
    {
      id: 3,
      name: 'Fernanda Rocha',
      email: 'fernanda@transita.com',
      department: 'Financeiro',
      phone: '(11) 97654-3210',
      status: 'Ativo',
      salary: 4200.00
    },
    {
      id: 4,
      name: 'Ricardo Silva',
      email: 'ricardo@transita.com',
      department: 'TI',
      phone: '(11) 96543-2109',
      status: 'Inativo',
      salary: 3800.00
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSalaries = employees.reduce((acc, emp) => acc + emp.salary, 0);

  return (
    <div className="section-container">
      <div className="section-header">
        <h2>Funcionários</h2>
        <p>Gerencie os funcionários da empresa</p>
      </div>

      <div className="section-controls">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Buscar funcionário..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-add">
          <FiPlus /> Novo Funcionário
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Departamento</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Salário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.id} className={`status-${employee.status.toLowerCase()}`}>
                <td className="name-cell">{employee.name}</td>
                <td>{employee.email}</td>
                <td>
                  <span className="department-tag">{employee.department}</span>
                </td>
                <td>{employee.phone}</td>
                <td>
                  <span className={`status-badge ${employee.status.toLowerCase()}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="salary-cell">
                  R$ {employee.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
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
          <span className="stat-label">Total de Funcionários</span>
          <span className="stat-value">{employees.length}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Ativos</span>
          <span className="stat-value" style={{ color: '#10b981' }}>
            {employees.filter(e => e.status === 'Ativo').length}
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Folha de Pagamento</span>
          <span className="stat-value" style={{ color: '#3b82f6' }}>
            R$ {totalSalaries.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeesSection;
