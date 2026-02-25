import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiMail, FiShield, FiBell, FiLock, 
  FiCamera, FiBriefcase, FiMapPin, FiCheckCircle,
  FiActivity, FiZap, FiEdit3, FiSmartphone, FiMonitor, 
  FiSave, FiX, FiCalendar, FiTrendingUp, FiAlertCircle,
  FiShield as FiShieldIcon, FiBell as FiBellIcon, FiGlobe
} from 'react-icons/fi';
import './UserProfile.css';

import './UserProfile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    name: 'Admin Transita',
    email: 'admin@transita.ia',
    role: 'Gerente de Operações',
    company: 'Logística Avançada S.A.',
    location: 'São Paulo, Brasil',
    city: '',
    state: '',
    phone: '+55 (11) 99999-8888',
    department: 'Operações',
    photoURL: 'https://picsum.photos/200/200',
    joined: 'Janeiro 2024',
    employeeId: 'TRN-001'
  });

  const { user: authUser } = useAuth();

  // Mapear dados do backend (AuthContext) para o estado local do perfil
  useEffect(() => {
    if (!authUser) return;

    try {
      setUserData(prev => ({
        ...prev,
        name: authUser.name || authUser.email || prev.name,
        email: authUser.email || prev.email,
        photoURL: authUser.photoURL || prev.photoURL,
        role: authUser.role || prev.role,
        company: (authUser.company && authUser.company.name) ? authUser.company.name : (authUser.company || prev.company),
        city: authUser.city || prev.city,
        state: authUser.state || prev.state,
      }));
    } catch (e) {
      // não bloquear a UI se formato inesperado
    }
  }, [authUser]);

  // Busca geolocalização por IP (usa ipapi como exemplo) para obter cidade/estado
  useEffect(() => {
    let mounted = true;

    const fetchLocation = async () => {
      try {
        const resp = await fetch('https://ipapi.co/json/');
        if (!resp.ok) return;
        const data = await resp.json();
        if (!mounted) return;

        const city = data.city || '';
        const region = data.region || data.region_code || '';
        const locationString = city && region ? `${city}, ${region}` : (data.city || data.region || data.country_name || '');

        setUserData(prev => ({
          ...prev,
          location: locationString,
          city,
          state: region
        }));
      } catch (error) {
        // falhar silenciosamente - front não deve quebrar se API bloquear
      }
    };

    fetchLocation();

    return () => { mounted = false; };
  }, []);

  // Extração simples de cidade a partir de userData.location
  const getCity = () => {
    if (userData.city) return userData.city;
    const loc = userData.location || '';
    if (!loc) return '';
    // se tem vírgula, a primeira parte costuma ser cidade
    if (loc.includes(',')) return loc.split(',')[0].trim();
    // se tem espaço e duas palavras, retorna primeira palavra (fallback)
    const parts = loc.split(' ');
    return parts.length ? parts[0] : loc;
  };

  const [notificationSettings, setNotificationSettings] = useState({
    fines: true,
    reports: true,
    maintenance: false,
    security: true,
    weeklyDigest: true,
    realTimeAlerts: true
  });

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result;
        try {
          // Send DataURL to backend which will upload to Firebase Storage
          const resp = await api.post('/auth/profile/avatar', { dataUrl });
          if (resp?.data?.url) {
            setUserData(prev => ({ ...prev, photoURL: resp.data.url }));
          } else {
            // fallback to local dataUrl
            setUserData(prev => ({ ...prev, photoURL: dataUrl }));
          }
        } catch (error) {
          console.error('Erro ao enviar avatar para backend:', error);
          setUserData(prev => ({ ...prev, photoURL: dataUrl }));
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    (async () => {
      try {
        const payload = {
          name: userData.name,
          phone: userData.phone,
          role: userData.role,
          photoURL: userData.photoURL,
          location: userData.location
        };

        const res = await api.put('/auth/profile', payload);
        if (res?.data) {
          // Atualiza local state e solicita refresh no contexto
          setUserData(prev => ({ ...prev, ...payload }));
          // refresh global
          try { await refreshUser(); } catch (_) {}
        }
        setIsEditing(false);
      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
      } finally {
        setIsSaving(false);
      }
    })();
  };

  const handleCancel = () => {
    // Em uma aplicação real, aqui reverteria as alterações
    setIsEditing(false);
  };

  const loginHistory = [
    { id: 1, device: 'Desktop Windows', deviceType: 'desktop', location: 'São Paulo, BR', date: 'Hoje, 09:42', time: 'há 2 horas', ip: '189.12.45.102', status: 'current' },
    { id: 2, device: 'iPhone 15 Pro', deviceType: 'mobile', location: 'São Paulo, BR', date: 'Ontem, 18:20', time: 'há 1 dia', ip: '189.12.45.102', status: 'active' },
    { id: 3, device: 'MacBook Pro', deviceType: 'desktop', location: 'Rio de Janeiro, BR', date: '12 Out, 10:15', time: 'há 5 dias', ip: '201.45.12.88', status: 'active' },
  ];

  const recentActivity = [
    { id: 1, type: 'report', title: 'Relatório Mensal Gerado', description: 'Relatório de performance da frota disponível para download', time: 'Há 2 horas', icon: FiCheckCircle, color: 'activity-success' },
    { id: 2, type: 'security', title: 'Senha Alterada', description: 'Senha da conta atualizada com sucesso', time: 'Há 2 dias', icon: FiLock, color: 'activity-security' },
    { id: 3, type: 'login', title: 'Novo Login Detectado', description: 'Acesso realizado a partir de dispositivo não reconhecido', time: 'Há 3 dias', icon: FiShieldIcon, color: 'activity-warning' },
  ];

  const stats = {
    reportsGenerated: 124,
    efficiencyRate: 98,
    activeSessions: 3,
    daysActive: 45
  };

  const achievements = [
    { id: 1, name: 'Analista Pro', color: 'achievement-blue', icon: '🎯' },
    { id: 2, name: 'Beta Tester', color: 'achievement-green', icon: '🧪' },
    { id: 3, name: 'Primeiro Mês', color: 'achievement-purple', icon: '🥇' },
    { id: 4, name: '100 Relatórios', color: 'achievement-orange', icon: '📊' },
  ];

  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="user-profile-page profile-page">
      {/* Header com Cover */}
      <div className="profile-cover">
        <div className="profile-cover-overlay"></div>
      </div>

      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="profile-container"
      >
        {/* Input de arquivo oculto */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handlePhotoUpload} 
          className="profile-file-input" 
          accept="image/*"
        />
        
        <div className="profile-grid">
          {/* Coluna Esquerda: Perfil e Stats */}
          <div className="profile-sidebar">
            {/* Card de Perfil */}
            <motion.div 
              variants={itemVariants}
              className="profile-card"
            >
              <div className="profile-avatar-section">
                <div className="profile-avatar-container">
                  <img 
                    src={userData.photoURL} 
                    alt={userData.name}
                    className="profile-avatar"
                  />
                  {isUploading && (
                    <div className="profile-uploading-overlay">
                      <div className="uploading-spinner"></div>
                    </div>
                  )}
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="profile-avatar-edit"
                    disabled={isUploading}
                  >
                    <FiCamera size={16} />
                  </button>
                </div>
                <div className="profile-info">
                  <h2 className="profile-name">{userData.name}</h2>
                  <div className="profile-role">{userData.role}</div>
                  <div className="profile-badge">
                    <FiTrendingUp size={12} />
                    <span>Premium</span>
                  </div>
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="profile-contact-info">
                <div className="contact-item">
                  <FiBriefcase className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Empresa</span>
                    <span className="contact-value">{userData.company}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <FiMapPin className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Localização</span>
                    <span className="contact-value">{userData.location}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <FiGlobe className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Cidade</span>
                    <span className="contact-value">{getCity()}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">{userData.email}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <FiCalendar className="contact-icon" />
                  <div className="contact-content">
                    <span className="contact-label">Desde</span>
                    <span className="contact-value">{userData.joined}</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="profile-stats">
                <div className="stat-item">
                  <div className="stat-number">{stats.reportsGenerated}</div>
                  <div className="stat-label">Relatórios</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.efficiencyRate}%</div>
                  <div className="stat-label">Eficiência</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.activeSessions}</div>
                  <div className="stat-label">Sessões</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{stats.daysActive}</div>
                  <div className="stat-label">Dias</div>
                </div>
              </div>
            </motion.div>

            {/* Conquistas */}
            <motion.div 
              variants={itemVariants}
              className="achievements-card"
            >
              <div className="achievements-header">
                <FiZap className="achievements-icon" />
                <h3 className="achievements-title">Conquistas</h3>
              </div>
              <div className="achievements-list">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`achievement-item ${achievement.color}`}
                  >
                    <span className="achievement-emoji">{achievement.icon}</span>
                    <span className="achievement-name">{achievement.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Coluna Direita: Conteúdo Principal */}
          <div className="profile-content">
            {/* Card Principal com Tabs */}
            <motion.div 
              variants={itemVariants}
              className="profile-main-card"
            >
              {/* Tabs Navigation */}
              <div className="profile-tabs">
                {[
                  { id: 'general', label: 'Geral', icon: FiUser },
                  { id: 'security', label: 'Segurança', icon: FiShield },
                  { id: 'notifications', label: 'Notificações', icon: FiBell },
                  { id: 'activity', label: 'Atividade', icon: FiActivity }
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`profile-tab ${activeTab === tab.id ? 'profile-tab-active' : ''}`}
                    >
                      <Icon className="profile-tab-icon" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="profile-tab-content">
                <AnimatePresence mode="wait">
                  {activeTab === 'general' && (
                    <motion.div
                      key="general"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="profile-tab-pane"
                    >
                      <div className="tab-pane-header">
                        <h3 className="tab-pane-title">Informações do Perfil</h3>
                        <div className="tab-pane-actions">
                          {!isEditing ? (
                            <button 
                              onClick={() => setIsEditing(true)}
                              className="edit-profile-button"
                            >
                              <FiEdit3 size={14} />
                              <span>Editar Perfil</span>
                            </button>
                          ) : (
                            <>
                              <button 
                                onClick={handleCancel}
                                className="cancel-button"
                              >
                                <FiX size={14} />
                                <span>Cancelar</span>
                              </button>
                              <button 
                                onClick={handleSave}
                                disabled={isSaving}
                                className="save-button"
                              >
                                {isSaving ? (
                                  <div className="loading-spinner"></div>
                                ) : (
                                  <FiSave size={14} />
                                )}
                                <span>Salvar Alterações</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="profile-form">
                        <div className="form-grid">
                          <div className="form-group">
                            <label className="form-label">Nome Completo</label>
                            <input 
                              type="text" 
                              value={userData.name}
                              onChange={(e) => setUserData({...userData, name: e.target.value})}
                              disabled={!isEditing}
                              className={`form-input ${isEditing ? 'form-input-editing' : ''}`}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Cargo</label>
                            <input 
                              type="text" 
                              value={userData.role}
                              onChange={(e) => setUserData({...userData, role: e.target.value})}
                              disabled={!isEditing}
                              className={`form-input ${isEditing ? 'form-input-editing' : ''}`}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Email</label>
                            <input 
                              type="email" 
                              value={userData.email}
                              onChange={(e) => setUserData({...userData, email: e.target.value})}
                              disabled={!isEditing}
                              className={`form-input ${isEditing ? 'form-input-editing' : ''}`}
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-label">Telefone</label>
                            <input 
                              type="tel" 
                              value={userData.phone}
                              onChange={(e) => setUserData({...userData, phone: e.target.value})}
                              disabled={!isEditing}
                              className={`form-input ${isEditing ? 'form-input-editing' : ''}`}
                            />
                          </div>
                          <div className="form-group form-group-full">
                            <label className="form-label">Localização</label>
                            <input 
                              type="text" 
                              value={userData.location}
                              onChange={(e) => setUserData({...userData, location: e.target.value})}
                              disabled={!isEditing}
                              className={`form-input ${isEditing ? 'form-input-editing' : ''}`}
                            />
                          </div>
                        </div>

                        {/* Atividade Recente */}
                        <div className="recent-activity-section">
                          <h4 className="section-title">Atividade Recente</h4>
                          <div className="activity-list">
                            {recentActivity.map(activity => {
                              const Icon = activity.icon;
                              return (
                                <div key={activity.id} className="activity-item">
                                  <div className={`activity-icon ${activity.color}`}>
                                    <Icon size={18} />
                                  </div>
                                  <div className="activity-content">
                                    <div className="activity-title">{activity.title}</div>
                                    <div className="activity-description">{activity.description}</div>
                                  </div>
                                  <div className="activity-time">{activity.time}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'security' && (
                    <motion.div
                      key="security"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="profile-tab-pane"
                    >
                      <div className="security-overview">
                        <div className="security-icon">
                          <FiShield size={32} />
                        </div>
                        <div className="security-info">
                          <h3 className="security-title">Sua Conta Está Protegida</h3>
                          <p className="security-description">
                            Última alteração de senha: Há 15 dias. Recomendamos trocar a cada 90 dias para máxima segurança.
                          </p>
                        </div>
                        <button className="change-password-button">
                          Alterar Senha
                        </button>
                      </div>

                      <div className="login-history-section">
                        <h4 className="section-title">Histórico de Logins</h4>
                        <div className="login-history">
                          {loginHistory.map(login => (
                            <div key={login.id} className="login-item">
                              <div className="login-device-info">
                                <div className={`login-device-icon ${login.deviceType}`}>
                                  {login.deviceType === 'desktop' ? <FiMonitor size={18} /> : <FiSmartphone size={18} />}
                                </div>
                                <div>
                                  <div className="login-device-name">{login.device}</div>
                                  <div className="login-details">
                                    <span className="login-location">{login.location}</span>
                                    <span className="login-ip">{login.ip}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="login-time-info">
                                <div className="login-date">{login.date}</div>
                                <div className="login-time">{login.time}</div>
                                <div className={`login-status ${login.status}`}>
                                  {login.status === 'current' ? 'Atual' : 'Ativo'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'notifications' && (
                    <motion.div
                      key="notifications"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="profile-tab-pane"
                    >
                      <h3 className="tab-pane-title">Configurações de Notificação</h3>
                      <p className="tab-pane-subtitle">
                        Gerencie como e quando você deseja ser notificado sobre atividades do sistema.
                      </p>

                      <div className="notification-settings">
                        <NotificationToggle
                          title="Alertas de Multas"
                          description="Receba avisos instantâneos quando novas multas forem detectadas."
                          enabled={notificationSettings.fines}
                          onToggle={() => handleNotificationToggle('fines')}
                          critical
                        />
                        <NotificationToggle
                          title="Alertas em Tempo Real"
                          description="Notificações imediatas sobre atividades críticas do sistema."
                          enabled={notificationSettings.realTimeAlerts}
                          onToggle={() => handleNotificationToggle('realTimeAlerts')}
                          critical
                        />
                        <NotificationToggle
                          title="Relatórios Semanais"
                          description="Resumo de performance da frota enviado toda segunda-feira por email."
                          enabled={notificationSettings.weeklyDigest}
                          onToggle={() => handleNotificationToggle('weeklyDigest')}
                        />
                        <NotificationToggle
                          title="Manutenção Preventiva"
                          description="Avisos sobre veículos que necessitam de revisão."
                          enabled={notificationSettings.maintenance}
                          onToggle={() => handleNotificationToggle('maintenance')}
                        />
                        <NotificationToggle
                          title="Alertas de Segurança"
                          description="Notificações sobre logins suspeitos e atividades de segurança."
                          enabled={notificationSettings.security}
                          onToggle={() => handleNotificationToggle('security')}
                          critical
                        />
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'activity' && (
                    <motion.div
                      key="activity"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="profile-tab-pane"
                    >
                      <div className="activity-overview">
                        <h3 className="tab-pane-title">Visão Geral da Atividade</h3>
                        <p className="tab-pane-subtitle">
                          Histórico completo de todas as suas interações com o sistema.
                        </p>

                        {/* Activity Stats */}
                        <div className="activity-stats">
                          <div className="activity-stat">
                            <div className="activity-stat-number">{stats.reportsGenerated}</div>
                            <div className="activity-stat-label">Relatórios Criados</div>
                          </div>
                          <div className="activity-stat">
                            <div className="activity-stat-number">{stats.daysActive}</div>
                            <div className="activity-stat-label">Dias Ativo</div>
                          </div>
                          <div className="activity-stat">
                            <div className="activity-stat-number">{stats.activeSessions}</div>
                            <div className="activity-stat-label">Sessões Ativas</div>
                          </div>
                        </div>

                        {/* Activity Timeline */}
                        <div className="activity-timeline">
                          <h4 className="section-title">Linha do Tempo</h4>
                          <div className="timeline">
                            {recentActivity.map((activity, index) => {
                              const Icon = activity.icon;
                              return (
                                <div key={activity.id} className="timeline-item">
                                  <div className="timeline-marker">
                                    <div className={`timeline-icon ${activity.color}`}>
                                      <Icon size={14} />
                                    </div>
                                    {index < recentActivity.length - 1 && (
                                      <div className="timeline-line"></div>
                                    )}
                                  </div>
                                  <div className="timeline-content">
                                    <div className="timeline-title">{activity.title}</div>
                                    <div className="timeline-description">{activity.description}</div>
                                    <div className="timeline-time">{activity.time}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const NotificationToggle = ({ title, description, enabled, onToggle, critical = false }) => {
  return (
    <div className="notification-toggle">
      <div className="toggle-content">
        <div className="toggle-header">
          <h4 className="toggle-title">{title}</h4>
          {critical && (
            <span className="toggle-critical-badge">
              <FiAlertCircle size={12} />
              Crítico
            </span>
          )}
        </div>
        <p className="toggle-description">{description}</p>
      </div>
      <button 
        onClick={onToggle}
        className={`toggle-switch ${enabled ? 'toggle-switch-enabled' : ''}`}
        aria-label={`${enabled ? 'Desativar' : 'Ativar'} ${title}`}
      >
        <div className="toggle-switch-handle"></div>
      </button>
    </div>
  );
};

export default Profile;