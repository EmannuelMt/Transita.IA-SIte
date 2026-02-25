import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBell, 
  FiFilter, 
  FiTrash2, 
  FiCheckCircle, 
  FiAlertTriangle, 
  FiInfo, 
  FiZap,
  FiAlertCircle,
  FiClock,
  FiChevronRight,
  FiSearch,
  FiSliders,
  FiMapPin
} from 'react-icons/fi';
import './NotificationPanel.css';

const Notifications = ({ modal = false }) => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState([]);

  const fullNotifications = [
    { 
      id: '1', 
      title: 'Excesso de Velocidade Detectado', 
      desc: 'Veículo ABC-1234 ultrapassou 110km/h na BR-116 em São Paulo. Recomendamos verificar o condutor e emitir alerta de segurança.', 
      time: 'Há 5 minutos', 
      type: 'critical', 
      read: false,
      vehicle: 'ABC-1234',
      location: 'BR-116, São Paulo',
      route: 'BR-116 → SP'
    },
    { 
      id: '2', 
      title: 'Nova Multa Registrada', 
      desc: 'A infração "Estacionar em local proibido" foi detectada pelo radar. Validade: 30 dias para recurso.', 
      time: 'Há 2 horas', 
      type: 'warning', 
      read: false,
      fineCode: '505-4',
      amount: 'R$ 130,16',
      vehicle: 'DEF-5678',
      route: 'SP-300 → Campinas',
      location: 'R. Paulista, SP'
    },
    { 
      id: '3', 
      title: 'Relatório Semanal Pronto', 
      desc: 'Sua análise detalhada de consumo de combustível já está disponível para download. Inclui insights de otimização.', 
      time: 'Há 5 horas', 
      type: 'info', 
      read: true,
      reportType: 'Consumo',
      period: 'Semanal',
      vehicle: '-',
      route: '-',
      location: '-'
    },
    { 
      id: '4', 
      title: 'Manutenção Preventiva', 
      desc: 'O veículo Renault Master (DEF-5678) atingiu o limite de quilometragem. Agende manutenção preventiva.', 
      time: '2 dias atrás', 
      type: 'warning', 
      read: true,
      vehicle: 'DEF-5678',
      mileage: '15.000 km',
      route: 'RJ → Niterói',
      location: 'Oficina Central'
    },
    { 
      id: '5', 
      title: 'Pagamento Aprovado', 
      desc: 'O pagamento da multa 2024/001 foi confirmado. Valor: R$ 195,23. Comprovante disponível.', 
      time: '3 dias atrás', 
      type: 'info', 
      read: true,
      status: 'Pago',
      reference: '2024/001',
      vehicle: '-',
      route: '-',
      location: '-'
    },
  ];

  const [notifications, setNotifications] = useState(() => fullNotifications);

  const filtered = useMemo(() => {
    return notifications.filter((s) => {
      if (filter === 'all') return true;
      if (filter === 'vehicle') return s.vehicle && s.vehicle !== '-';
      if (filter === 'critical') return s.type === 'critical';
      if (filter === 'warning') return s.type === 'warning';
      if (filter === 'info') return s.type === 'info';
      if (filter === 'unread') return !s.read;
      return true;
    }).filter(s => `${s.title} ${s.vehicle} ${s.route} ${s.location}`.toLowerCase().includes(query.toLowerCase()));
  }, [query, filter, notifications]);

  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    critical: notifications.filter(n => n.type === 'critical').length,
    warning: notifications.filter(n => n.type === 'warning').length,
  };

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    if (window.confirm('Tem certeza que deseja limpar todas as notificações?')) {
      setNotifications([]);
    }
  };

  const getTypeConfig = (type) => {
    switch(type) {
      case 'critical':
        return {
          icon: FiAlertTriangle,
          bg: 'notification-critical-bg',
          iconColor: 'notification-critical-icon',
          border: 'notification-critical-border',
          label: 'Crítico'
        };
      case 'warning':
        return {
          icon: FiAlertCircle,
          bg: 'notification-warning-bg',
          iconColor: 'notification-warning-icon',
          border: 'notification-warning-border',
          label: 'Aviso'
        };
      default:
        return {
          icon: FiInfo,
          bg: 'notification-info-bg',
          iconColor: 'notification-info-icon',
          border: 'notification-info-border',
          label: 'Informação'
        };
    }
  };

  // Versão compacta para dropdown/modal
  if (modal) {
    return (
      <div className="ln-main-compact">
        <header className="ln-main-header compact">
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div className="ln-main-title"><FiBell /> Notificações</div>
              <div className="ln-main-sub">Visão rápida da frota</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="ln-action" onClick={markAllAsRead} title="Marcar todas como lidas">Marcar tudo</button>
              <button className="ln-action danger" onClick={clearAll} title="Limpar todas">Limpar</button>
            </div>
          </div>
        </header>

        <div className="ln-list compact">
          {filtered.length === 0 ? (
            <div className="ln-empty">Sem alertas</div>
          ) : (
            filtered.map((item) => (
              <motion.div key={item.id} className={`ln-card compact ${!item.read ? 'unread' : ''}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                <div>
                  <div className="ln-card-title">{item.title}</div>
                  <div className="ln-card-route small"><FiMapPin /> {item.route} • {item.location}</div>
                </div>
                <div style={{textAlign:'right'}}>
                  <div className="ln-card-vehicle">{item.vehicle}</div>
                  <div className="ln-card-time small"><FiClock /> {item.time}</div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`notifications-page ${modal ? 'modal' : ''}`}>
      <div className={`notifications-container ${modal ? 'modal' : ''}`}>
        {/* Header */}
        <header className={`notifications-header ${modal ? 'modal' : ''}`}>
          <div className={`notifications-header-main ${modal ? 'modal' : ''}`}>
            <div className={`notifications-badge ${modal ? 'modal' : ''}`}>
              <FiBell className="notification-bell-icon" />
              <span>Central de Notificações</span>
            </div>
          </div>
        </header>

        {/* Filters and Actions */}
        <div className={`notifications-controls ${modal ? 'modal' : ''}`}>
          <div className="filters-container">
            <div className="filters-label">
              <FiFilter />
              <span>Filtrar por:</span>
            </div>
            <div className="filters-buttons">
              {[
                { key: 'all', label: 'Todas' },
                { key: 'unread', label: 'Não lidas' },
                { key: 'critical', label: 'Críticas' },
                { key: 'warning', label: 'Avisos' },
                { key: 'info', label: 'Informações' }
              ].map((filterItem) => (
                <button
                  key={filterItem.key}
                  onClick={() => setFilter(filterItem.key)}
                  className={`filter-button ${modal ? 'modal' : ''} ${filter === filterItem.key ? 'filter-button-active' : ''}`}
                >
                  {filterItem.label}
                </button>
              ))}
            </div>
          </div>

          <div className="actions-container">
            <button 
              className="action-button action-button-secondary"
              onClick={markAllAsRead}
            >
              <FiCheckCircle />
              <span>Marcar todas como lidas</span>
            </button>
            <button 
              className="action-button action-button-danger"
              onClick={clearAll}
            >
              <FiTrash2 />
              <span>Limpar todas</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className={`notifications-list ${modal ? 'modal' : ''}`}>
          {filtered.length === 0 ? (
            <div className="notifications-empty">
              <div className="notifications-empty-icon">
                <FiBell size={48} />
              </div>
              <h3 className="notifications-empty-title">
                Nenhuma notificação encontrada
              </h3>
              <p className="notifications-empty-description">
                {filter === 'all' 
                  ? 'Todas as notificações foram processadas' 
                  : `Nenhuma notificação do tipo "${filter}" encontrada`}
              </p>
              {filter !== 'all' && (
                <button 
                  className="notifications-empty-action"
                  onClick={() => setFilter('all')}
                >
                  Ver todas as notificações
                </button>
              )}
            </div>
          ) : (
            <motion.div 
              className="notifications-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((notification, index) => {
                const typeConfig = getTypeConfig(notification.type);
                const Icon = typeConfig.icon;

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`notification-card ${modal ? 'modal' : ''} ${typeConfig.border} ${notification.read ? 'notification-read' : 'notification-unread'}`}
                  >
                    <div className={`notification-card-header ${modal ? 'modal' : ''}`}>
                      <div className="notification-type-indicator">
                        <div className={`notification-icon-container ${modal ? 'modal' : ''} ${typeConfig.bg}`}>
                          <Icon className={typeConfig.iconColor} />
                        </div>
                        <span className={`notification-type-label ${typeConfig.bg.replace('-bg', '-text')}`}>
                          {typeConfig.label}
                        </span>
                      </div>
                      
                      <div className="notification-meta">
                        <FiClock className="notification-time-icon" />
                        <span className="notification-time">{notification.time}</span>
                        {!notification.read && (
                          <div className="notification-unread-badge">
                            Nova
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`notification-card-content ${modal ? 'modal' : ''}`}>
                      <h3 className={`notification-title ${modal ? 'modal' : ''}`}>
                        {notification.title}
                      </h3>
                      <p className={`notification-description ${modal ? 'modal' : ''}`}>
                        {notification.desc}
                      </p>
                      
                      {/* Additional Info */}
                      <div className="notification-details">
                        {notification.vehicle && notification.vehicle !== '-' && (
                          <div className="notification-detail">
                            <span className="detail-label">Veículo:</span>
                            <span className="detail-value">{notification.vehicle}</span>
                          </div>
                        )}
                        {notification.location && notification.location !== '-' && (
                          <div className="notification-detail">
                            <span className="detail-label">Local:</span>
                            <span className="detail-value">{notification.location}</span>
                          </div>
                        )}
                        {notification.amount && (
                          <div className="notification-detail">
                            <span className="detail-label">Valor:</span>
                            <span className="detail-value">{notification.amount}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="notification-card-footer">
                      <div className="notification-actions">
                        {!notification.read && (
                          <button 
                            className="notification-action notification-action-primary"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <FiCheckCircle />
                            <span>Marcar como lida</span>
                          </button>
                        )}
                        <button 
                          className="notification-action notification-action-secondary"
                          onClick={() => console.log('Ver detalhes', notification.id)}
                        >
                          <span>Ver detalhes</span>
                          <FiChevronRight />
                        </button>
                        <button 
                          className="notification-action notification-action-danger"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Footer Info */}
        <div className="notifications-footer">
          <div className="footer-info">
            <FiZap className="footer-icon" />
            <p className="footer-text">
              Notificações são atualizadas em tempo real. Mantenha-se informado sobre todas as atividades do sistema.
            </p>
          </div>
          <div className="footer-legend">
            <div className="legend-item">
              <div className="legend-color legend-critical"></div>
              <span>Crítico - Requer ação imediata</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-warning"></div>
              <span>Aviso - Atenção necessária</span>
            </div>
            <div className="legend-item">
              <div className="legend-color legend-info"></div>
              <span>Informação - Para sua ciência</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;