import React from 'react';
import { FiTrendingUp, FiUsers, FiTruck, FiAlertCircle, FiDollarSign } from 'react-icons/fi';
import './OverviewSection.css';

const OverviewSection = () => {
  const stats = [
    {
      id: 1,
      title: 'Receita Total',
      value: 'R$ 45.250',
      change: '+12.5%',
      icon: FiDollarSign,
      color: '#10b981'
    },
    {
      id: 2,
      title: 'Motoristas',
      value: '12',
      change: '+2 este mês',
      icon: FiTruck,
      color: '#f59e0b'
    },
    {
      id: 3,
      title: 'Funcionários',
      value: '8',
      change: 'Todos ativos',
      icon: FiUsers,
      color: '#3b82f6'
    },
    {
      id: 4,
      title: 'Multas Pendentes',
      value: '3',
      change: 'R$ 1.235,65',
      icon: FiAlertCircle,
      color: '#ef4444'
    },
    {
      id: 5,
      title: 'Crescimento',
      value: '28.3%',
      change: 'vs mês anterior',
      icon: FiTrendingUp,
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="section-container">
      <div className="section-header">
        <h2>Visão Geral</h2>
        <p>Dashboard com métricas principais da empresa</p>
      </div>

      <div className="overview-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="overview-card">
              <div className="card-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                <Icon className="icon" />
              </div>
              <div className="card-content">
                <h3 className="card-title">{stat.title}</h3>
                <p className="card-value">{stat.value}</p>
                <span className="card-change">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="activities-container">
        <div className="activity-section">
          <h3>Atividades Recentes</h3>
          <div className="activity-timeline">
            <div className="timeline-item">
              <div className="timeline-icon" style={{ backgroundColor: '#dbeafe', color: '#3b82f6' }}>
                <FiTruck />
              </div>
              <div className="timeline-content">
                <p className="timeline-title">Novo motorista registrado</p>
                <p className="timeline-desc">João Silva foi adicionado à frota</p>
                <span className="timeline-time">Há 2 horas</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
                <FiAlertCircle />
              </div>
              <div className="timeline-content">
                <p className="timeline-title">Multa registrada</p>
                <p className="timeline-desc">Maria Santos recebeu multa por excesso de velocidade</p>
                <span className="timeline-time">Há 4 horas</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon" style={{ backgroundColor: '#d1fae5', color: '#10b981' }}>
                <FiDollarSign />
              </div>
              <div className="timeline-content">
                <p className="timeline-title">Pagamento recebido</p>
                <p className="timeline-desc">Multa MUL-2024-001 foi paga</p>
                <span className="timeline-time">Há 6 horas</span>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-icon" style={{ backgroundColor: '#e9d5ff', color: '#8b5cf6' }}>
                <FiUsers />
              </div>
              <div className="timeline-content">
                <p className="timeline-title">Novo funcionário</p>
                <p className="timeline-desc">Ana Costa foi contratada no departamento de TI</p>
                <span className="timeline-time">Há 1 dia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="summary-section">
          <h3>Resumo do Mês</h3>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total de Transações</span>
              <span className="summary-value">156</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Multas Processadas</span>
              <span className="summary-value">23</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Folha de Pagamento</span>
              <span className="summary-value">R$ 28.350</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Manutenção</span>
              <span className="summary-value">R$ 1.500</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
