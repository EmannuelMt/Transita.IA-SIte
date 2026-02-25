import React, { useState } from 'react';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiDownload } from 'react-icons/fi';
import './FinancialSection.css';

const FinancialSection = () => {
  const [financialData] = useState({
    revenue: {
      total: 45250.00,
      change: 12.5,
      monthly: [
        { month: 'Jan', value: 35000 },
        { month: 'Fev', value: 42000 },
        { month: 'Mar', value: 39500 },
        { month: 'Abr', value: 48000 },
        { month: 'Mai', value: 45250 },
      ]
    },
    expenses: {
      total: 28350.00,
      change: -8.2,
      monthly: [
        { month: 'Jan', value: 22000 },
        { month: 'Fev', value: 24500 },
        { month: 'Mar', value: 26000 },
        { month: 'Abr', value: 30000 },
        { month: 'Mai', value: 28350 },
      ]
    },
    profit: {
      total: 16900.00,
      change: 28.3,
      monthly: [
        { month: 'Jan', value: 13000 },
        { month: 'Fev', value: 17500 },
        { month: 'Mar', value: 13500 },
        { month: 'Abr', value: 18000 },
        { month: 'Mai', value: 16900 },
      ]
    }
  });

  const [transactions] = useState([
    {
      id: 1,
      description: 'Multas - Janeiro',
      type: 'entrada',
      category: 'Multas',
      amount: 2500.00,
      date: '2024-02-01',
      status: 'Concluído'
    },
    {
      id: 2,
      description: 'Folha de Pagamento',
      type: 'saida',
      category: 'Funcionários',
      amount: 14100.00,
      date: '2024-02-05',
      status: 'Concluído'
    },
    {
      id: 3,
      description: 'Combustível - Frota',
      type: 'saida',
      category: 'Operações',
      amount: 3200.00,
      date: '2024-02-10',
      status: 'Concluído'
    },
    {
      id: 4,
      description: 'Multas - Fevereiro',
      type: 'entrada',
      category: 'Multas',
      amount: 3100.00,
      date: '2024-02-15',
      status: 'Concluído'
    },
    {
      id: 5,
      description: 'Manutenção de Veículos',
      type: 'saida',
      category: 'Manutenção',
      amount: 1500.00,
      date: '2024-02-18',
      status: 'Concluído'
    },
    {
      id: 6,
      description: 'Seguros',
      type: 'saida',
      category: 'Operações',
      amount: 950.00,
      date: '2024-02-22',
      status: 'Pendente'
    }
  ]);

  const maxValue = Math.max(
    Math.max(...financialData.revenue.monthly.map(d => d.value)),
    Math.max(...financialData.expenses.monthly.map(d => d.value))
  );

  const renderChart = (data, color) => {
    const height = 150;
    const width = 300;
    const padding = 20;
    const barWidth = (width - padding * 2) / data.length;
    
    return (
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="chart-svg">
        {data.map((d, i) => {
          const barHeight = (d.value / maxValue) * (height - padding * 2);
          const x = padding + i * barWidth + barWidth * 0.2;
          const y = height - padding - barHeight;
          
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth * 0.6}
                height={barHeight}
                fill={color}
                opacity="0.8"
                rx="4"
              />
              <text
                x={x + barWidth * 0.3}
                y={height - padding + 15}
                fontSize="10"
                textAnchor="middle"
                fill="#6b7280"
              >
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2>Financeiro</h2>
        <p>Análise de receitas, despesas e lucros</p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <div className="kpi-card revenue">
          <div className="kpi-icon">
            <FiDollarSign />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Receita Total</span>
            <span className="kpi-value">
              R$ {financialData.revenue.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className={`kpi-change positive`}>
              <FiTrendingUp /> +{financialData.revenue.change}% este mês
            </span>
          </div>
        </div>

        <div className="kpi-card expenses">
          <div className="kpi-icon">
            <FiTrendingDown />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Despesas</span>
            <span className="kpi-value">
              R$ {financialData.expenses.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className={`kpi-change negative`}>
              <FiTrendingDown /> {financialData.expenses.change}% este mês
            </span>
          </div>
        </div>

        <div className="kpi-card profit">
          <div className="kpi-icon">
            <FiDollarSign />
          </div>
          <div className="kpi-content">
            <span className="kpi-label">Lucro Líquido</span>
            <span className="kpi-value">
              R$ {financialData.profit.total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className={`kpi-change positive`}>
              <FiTrendingUp /> +{financialData.profit.change}% este mês
            </span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>Receita Mensal</h3>
          <div className="chart-container">
            {renderChart(financialData.revenue.monthly, '#10b981')}
          </div>
        </div>

        <div className="chart-card">
          <h3>Despesas Mensais</h3>
          <div className="chart-container">
            {renderChart(financialData.expenses.monthly, '#ef4444')}
          </div>
        </div>

        <div className="chart-card">
          <h3>Lucro Mensal</h3>
          <div className="chart-container">
            {renderChart(financialData.profit.monthly, '#3b82f6')}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="transactions-section">
        <div className="transactions-header">
          <h3>Últimas Transações</h3>
          <button className="btn-export">
            <FiDownload /> Exportar
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                  <td className="description-cell">{transaction.description}</td>
                  <td>
                    <span className="category-tag">{transaction.category}</span>
                  </td>
                  <td>
                    <span className={`type-badge ${transaction.type}`}>
                      {transaction.type === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className={`amount-cell ${transaction.type}`}>
                    {transaction.type === 'entrada' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td>
                    <span className={`status-badge ${transaction.status.toLowerCase()}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialSection;
