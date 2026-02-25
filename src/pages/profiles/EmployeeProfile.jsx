import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, FiTruck, FiClock, FiStar, FiMap, FiAlertCircle, 
  FiCheckCircle, FiCalendar, FiSmartphone, FiNavigation,
  FiZap, FiAward, FiFileText, FiLifeBuoy, FiRadio,
  FiActivity, FiTrendingUp, FiShield, FiSettings,
  FiLogOut, FiBell, FiEye, FiEyeOff, FiPlay, FiPause
} from 'react-icons/fi';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [shiftStarted, setShiftStarted] = useState(false);
  const [shiftTime, setShiftTime] = useState(0);
  const [showMetrics, setShowMetrics] = useState(true);

  const employee = {
    name: 'Carlos Eduardo Oliveira',
    id: 'TR-99283',
    role: 'Motorista de Frota Pesada',
    rating: 4.9,
    trips: 1240,
    hoursThisMonth: 168,
    efficiencyScore: 94,
    safetyScore: 98,
    punctualityScore: 87,
    status: isOnline ? 'Em Rota' : 'Indisponível',
    statusColor: isOnline ? 'status-online' : 'status-offline',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    department: 'Transporte Logístico',
    hireDate: '15/03/2021',
    license: 'D | E',
    currentVehicle: 'Scania R500 - TRC-8A34',
    phone: '(11) 98765-4321',
    email: 'carlos.oliveira@transita.ia'
  };

  const recentTrips = [
    { 
      id: '1', 
      origin: 'São Paulo, SP', 
      destination: 'Curitiba, PR', 
      date: 'Hoje', 
      time: '08:45 - 16:30',
      status: 'Concluído', 
      statusColor: 'trip-status-completed',
      vehicle: 'Scania R500',
      distance: '408 km',
      estimatedTime: '7h 45m'
    },
    { 
      id: '2', 
      origin: 'Campinas, SP', 
      destination: 'Santos, SP', 
      date: 'Ontem', 
      time: '09:15 - 15:20',
      status: 'Concluído', 
      statusColor: 'trip-status-completed',
      vehicle: 'Volvo FH',
      distance: '182 km',
      estimatedTime: '3h 30m'
    },
    { 
      id: '3', 
      origin: 'São Paulo, SP', 
      destination: 'Belo Horizonte, MG', 
      date: '12 Out', 
      time: '07:30 - 17:45',
      status: 'Concluído', 
      statusColor: 'trip-status-completed',
      vehicle: 'Scania R500',
      distance: '586 km',
      estimatedTime: '9h 15m'
    },
  ];

  const metrics = [
    { label: 'Eficiência de Rota', value: employee.efficiencyScore, color: 'metric-green', icon: FiTrendingUp },
    { label: 'Segurança', value: employee.safetyScore, color: 'metric-blue', icon: FiShield },
    { label: 'Pontualidade', value: employee.punctualityScore, color: 'metric-orange', icon: FiClock },
    { label: 'Economia de Combustível', value: 91, color: 'metric-purple', icon: FiZap },
  ];

  const quickActions = [
    { icon: FiFileText, label: 'Meus Documentos', color: 'action-blue', description: 'CNH, documentos do veículo' },
    { icon: FiCalendar, label: 'Escala de Turnos', color: 'action-purple', description: 'Próximos turnos e folgas' },
    { icon: FiLifeBuoy, label: 'Suporte Técnico', color: 'action-red', description: 'Ajuda e suporte 24h' },
    { icon: FiSmartphone, label: 'Configurar Dispositivo', color: 'action-gray', description: 'App e dispositivos' },
    { icon: FiBell, label: 'Notificações', color: 'action-yellow', description: 'Alertas e comunicações' },
    { icon: FiSettings, label: 'Configurações', color: 'action-green', description: 'Preferências pessoais' },
  ];

  const achievements = [
    { id: 1, name: 'Motorista Ouro', color: 'achievement-gold', icon: '🥇', progress: 100 },
    { id: 2, name: '100k Km Seguros', color: 'achievement-silver', icon: '🛡️', progress: 100 },
    { id: 3, name: 'Eficiência 5 Estrelas', color: 'achievement-bronze', icon: '⭐', progress: 94 },
    { id: 4, name: 'Piloto da Economia', color: 'achievement-blue', icon: '⛽', progress: 85 },
  ];

  const handleStartShift = () => {
    setIsOnline(true);
    setShiftStarted(true);
    // Iniciar contador de tempo
    const interval = setInterval(() => {
      setShiftTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleEndShift = () => {
    setIsOnline(false);
    setShiftStarted(false);
    setShiftTime(0);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="employee-profile-page">
      <div className="employee-profile-container">
        
        {/* Header do Perfil */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="employee-profile-header"
        >
          <div className="profile-header-overlay"></div>
          
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="employee-avatar-container">
                <img 
                  src={employee.avatar} 
                  alt={employee.name} 
                  className="employee-avatar"
                />
                <div className={`employee-status-indicator ${employee.statusColor}`}>
                  <div className="status-pulse"></div>
                </div>
              </div>
              
              <div className="employee-basic-info">
                <h1 className="employee-name">{employee.name}</h1>
                <div className="employee-meta">
                  <span className="employee-id">ID: {employee.id}</span>
                  <span className="employee-role">
                    <FiTruck className="role-icon" /> {employee.role}
                  </span>
                </div>
                
                <div className="employee-rating">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`star-icon ${i < Math.floor(employee.rating) ? 'star-filled' : ''}`}
                      />
                    ))}
                  </div>
                  <span className="rating-value">{employee.rating}</span>
                  <span className="rating-trips">({employee.trips} viagens)</span>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              <div className="shift-controls">
                <div className="shift-timer">
                  <FiClock className="timer-icon" />
                  <span className="timer-value">
                    {shiftStarted ? formatTime(shiftTime) : '00:00:00'}
                  </span>
                </div>
                
                {shiftStarted ? (
                  <button 
                    onClick={handleEndShift}
                    className="shift-button shift-button-end"
                  >
                    <FiPause className="shift-icon" />
                    Finalizar Turno
                  </button>
                ) : (
                  <button 
                    onClick={handleStartShift}
                    className="shift-button shift-button-start"
                  >
                    <FiPlay className="shift-icon" />
                    Iniciar Turno
                  </button>
                )}
              </div>
              
              <div className="secondary-actions">
                <button className="secondary-action-button">
                  <FiAlertCircle className="action-icon" />
                  Relatar Ocorrência
                </button>
                <button className="secondary-action-button">
                  <FiLogOut className="action-icon" />
                  Sair
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Conteúdo Principal */}
        <div className="employee-profile-grid">
          
          {/* Sidebar Esquerda */}
          <div className="employee-profile-sidebar">
            {/* Informações de Contato */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="employee-info-card"
            >
              <h3 className="info-card-title">
                <FiUser className="title-icon" />
                Informações Pessoais
              </h3>
              
              <div className="employee-details">
                <div className="detail-item">
                  <span className="detail-label">Departamento</span>
                  <span className="detail-value">{employee.department}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Data de Admissão</span>
                  <span className="detail-value">{employee.hireDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">CNH Categoria</span>
                  <span className="detail-value detail-license">{employee.license}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Veículo Atual</span>
                  <span className="detail-value">{employee.currentVehicle}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Telefone</span>
                  <span className="detail-value">{employee.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{employee.email}</span>
                </div>
              </div>
            </motion.div>

            {/* Métricas de Performance */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="performance-card"
            >
              <div className="performance-header">
                <FiActivity className="performance-icon" />
                <h3 className="performance-title">Performance do Mês</h3>
                <button 
                  onClick={() => setShowMetrics(!showMetrics)}
                  className="toggle-metrics-button"
                >
                  {showMetrics ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              
              {showMetrics && (
                <div className="metrics-grid">
                  {metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <div key={index} className="metric-item">
                        <div className="metric-header">
                          <div className={`metric-icon ${metric.color}`}>
                            <Icon />
                          </div>
                          <span className="metric-label">{metric.label}</span>
                        </div>
                        <div className="metric-progress">
                          <div className="progress-bar">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${metric.value}%` }}
                              className={`progress-fill ${metric.color}`}
                            />
                          </div>
                          <span className="metric-value">{metric.value}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Conquistas */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="achievements-card"
            >
              <div className="achievements-header">
                <FiAward className="achievements-icon" />
                <h3 className="achievements-title">Conquistas</h3>
              </div>
              
              <div className="achievements-list">
                {achievements.map(achievement => (
                  <div key={achievement.id} className={`achievement-item ${achievement.color}`}>
                    <span className="achievement-icon">{achievement.icon}</span>
                    <div className="achievement-info">
                      <span className="achievement-name">{achievement.name}</span>
                      <div className="achievement-progress">
                        <div className="achievement-progress-bar">
                          <div 
                            className="achievement-progress-fill"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Conteúdo Principal */}
          <div className="employee-profile-content">
            {/* Histórico de Viagens */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="trips-history-card"
            >
              <div className="trips-header">
                <div className="trips-header-info">
                  <h3 className="trips-title">
                    <FiMap className="trips-icon" />
                    Histórico de Viagens
                  </h3>
                  <span className="trips-count">{recentTrips.length} viagens recentes</span>
                </div>
                <button className="view-report-button">
                  <FiNavigation className="report-icon" />
                  Ver Relatório Completo
                </button>
              </div>
              
              <div className="trips-list">
                {recentTrips.map(trip => (
                  <div key={trip.id} className="trip-item">
                    <div className="trip-route">
                      <div className="route-origin">
                        <div className="route-dot route-dot-origin"></div>
                        <span className="route-city">{trip.origin}</span>
                      </div>
                      <div className="route-line">
                        <div className="route-distance">{trip.distance}</div>
                        <div className="route-line-inner"></div>
                      </div>
                      <div className="route-destination">
                        <div className="route-dot route-dot-destination"></div>
                        <span className="route-city">{trip.destination}</span>
                      </div>
                    </div>
                    
                    <div className="trip-details">
                      <div className="trip-info">
                        <div className="trip-vehicle">
                          <FiTruck className="vehicle-icon" />
                          {trip.vehicle}
                        </div>
                        <div className="trip-time">{trip.time}</div>
                        <div className="trip-estimated">{trip.estimatedTime}</div>
                      </div>
                      
                      <div className="trip-meta">
                        <span className="trip-date">{trip.date}</span>
                        <span className={`trip-status ${trip.statusColor}`}>
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ações Rápidas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="quick-actions-card"
            >
              <h3 className="actions-title">Ações Rápidas</h3>
              
              <div className="actions-grid">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button key={index} className={`action-button ${action.color}`}>
                      <div className="action-icon-wrapper">
                        <Icon className="action-button-icon" />
                      </div>
                      <div className="action-content">
                        <span className="action-label">{action.label}</span>
                        <span className="action-description">{action.description}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Estatísticas Resumo */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="stats-summary-card"
            >
              <div className="stats-grid">
                <div className="stat-summary">
                  <FiClock className="stat-icon stat-icon-hours" />
                  <div className="stat-content">
                    <span className="stat-number">{employee.hoursThisMonth}</span>
                    <span className="stat-label">Horas Trabalhadas</span>
                  </div>
                </div>
                
                <div className="stat-summary">
                  <FiMap className="stat-icon stat-icon-trips" />
                  <div className="stat-content">
                    <span className="stat-number">{employee.trips}</span>
                    <span className="stat-label">Viagens Totais</span>
                  </div>
                </div>
                
                <div className="stat-summary">
                  <FiStar className="stat-icon stat-icon-rating" />
                  <div className="stat-content">
                    <span className="stat-number">{employee.rating}</span>
                    <span className="stat-label">Avaliação</span>
                  </div>
                </div>
                
                <div className="stat-summary">
                  <FiZap className="stat-icon stat-icon-efficiency" />
                  <div className="stat-content">
                    <span className="stat-number">{employee.efficiencyScore}%</span>
                    <span className="stat-label">Eficiência</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;