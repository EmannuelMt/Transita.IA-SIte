import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiBriefcase, FiUsers, FiMapPin, FiGlobe, FiPlus, 
  FiMoreVertical, FiCheck, FiMail, FiPhone, FiCreditCard,
  FiTruck, FiActivity, FiShield, FiExternalLink,
  FiCalendar, FiStar, FiTrendingUp, FiBarChart2,
  FiSettings, FiEdit2, FiRefreshCw, FiClipboard, FiSave,
  FiChevronRight, FiPackage, FiDollarSign, FiAward
} from 'react-icons/fi';
import './CompanyProfile.css';

const CompanyProfile = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [isSavingCompany, setIsSavingCompany] = useState(false);
  const [errors, setErrors] = useState({});

  const [companyData, setCompanyData] = useState({
    name: '',
    acronym: '',
    cnpj: '',
    foundation: '',
    headquarters: '',
    website: '',
    email: '',
    phone: '',
    sector: '',
    description: '',
    verified: false,
    status: ''
  });

  const handleCompanyChange = (field) => (e) => {
    setCompanyData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSaveCompany = () => {
    // Validação básica
    const newErrors = {};
    if (companyData.email && !validateEmail(companyData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (companyData.cnpj && !validateCNPJ(companyData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Persistência (exemplo): chama /api/company (substituir pelo endpoint real)
    (async () => {
      setIsSavingCompany(true);
      try {
        const resp = await fetch('/api/company', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(companyData)
        });

        if (!resp.ok) {
          // se erro, apenas log para agora
          console.error('Erro ao salvar empresa', resp.statusText);
        } else {
          console.log('Empresa salva com sucesso');
        }
      } catch (err) {
        console.error('Erro de rede ao salvar empresa', err);
      } finally {
        setIsSavingCompany(false);
      }
    })();
  };

  // Validação de email simples
  function validateEmail(email) {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Validação básica de CNPJ (checa dígitos) - não cobre todos os casos, mas é suficiente como validação inicial
  function validateCNPJ(cnpj) {
    if (!cnpj) return false;
    const onlyDigits = cnpj.replace(/\D+/g, '');
    if (onlyDigits.length !== 14) return false;
    // rejeita sequências repetidas
    if (/^(\d)\1+$/.test(onlyDigits)) return false;

    const calc = (t) => {
      const c = onlyDigits.substring(0, t);
      let s = 0;
      let p = t - 7;
      for (let i = t; i >= 1; i--) {
        s += parseInt(c[t - i], 10) * p--;
        if (p < 2) p = 9;
      }
      const r = s % 11;
      return r < 2 ? 0 : 11 - r;
    };

    const dv1 = calc(12);
    const dv2 = calc(13);
    return dv1 === parseInt(onlyDigits.charAt(12), 10) && dv2 === parseInt(onlyDigits.charAt(13), 10);
  }

  const stats = [
    { 
      id: 1, 
      label: 'Veículos na Frota', 
      value: '142', 
      icon: FiTruck, 
      color: 'stat-blue',
      trend: '+12%',
      description: 'Crescimento em 6 meses'
    },
    { 
      id: 2, 
      label: 'Colaboradores', 
      value: '86', 
      icon: FiUsers, 
      color: 'stat-green',
      trend: '+8%',
      description: 'Time em expansão'
    },
    { 
      id: 3, 
      label: 'Regiões Atendidas', 
      value: '12', 
      icon: FiMapPin, 
      color: 'stat-purple',
      trend: '+3',
      description: 'Novas operações'
    },
    { 
      id: 4, 
      label: 'Score de Segurança', 
      value: '9.4', 
      icon: FiShield, 
      color: 'stat-orange',
      trend: '↑ 0.2',
      description: 'Acima da média'
    },
  ];

  const teamMembers = [
    { 
      id: 1, 
      name: 'Ricardo Santos', 
      role: 'Diretor de Logística', 
      status: 'Admin', 
      email: 'ricardo@logistica.com',
      avatar: 'RS',
      joined: '2020',
      permissions: ['Full Access']
    },
    { 
      id: 2, 
      name: 'Ana Oliveira', 
      role: 'Gestora de Frota', 
      status: 'Editor', 
      email: 'ana.o@logistica.com',
      avatar: 'AO',
      joined: '2021',
      permissions: ['Edit', 'View']
    },
    { 
      id: 3, 
      name: 'Marcos Silva', 
      role: 'Analista de Operações', 
      status: 'Visualizador', 
      email: 'marcos@logistica.com',
      avatar: 'MS',
      joined: '2022',
      permissions: ['View']
    },
    { 
      id: 4, 
      name: 'Carla Mendes', 
      role: 'Gerente Financeira', 
      status: 'Editor', 
      email: 'carla@logistica.com',
      avatar: 'CM',
      joined: '2019',
      permissions: ['Edit', 'View', 'Reports']
    },
  ];

  const fleetMetrics = [
    { id: 1, label: 'Taxa de Ocupação', value: '92%', icon: FiActivity, color: 'metric-green', description: 'Capacidade utilizada' },
    { id: 2, label: 'Idade Média da Frota', value: '2.4 Anos', icon: FiTruck, color: 'metric-blue', description: 'Tempo de uso' },
    { id: 3, label: 'Manutenções em Dia', value: '98.5%', icon: FiShield, color: 'metric-orange', description: 'Preventivas realizadas' },
    { id: 4, label: 'Custo por Km', value: 'R$ 1.24', icon: FiDollarSign, color: 'metric-purple', description: 'Média operacional' },
  ];

  const financialData = {
    plan: 'Enterprise Fleet Premium',
    renewal: '12/12/2024',
    value: 'R$ 89.900,00/mês',
    paymentMethod: 'Cartão Corporativo',
    status: 'Ativo',
    usage: {
      apiCalls: '124,850',
      storage: '78%',
      reports: '45'
    }
  };

  const tabs = [
    { id: 'info', label: 'Informações Gerais', icon: FiBriefcase, color: 'tab-info' },
    { id: 'team', label: 'Gestão de Equipe', icon: FiUsers, color: 'tab-team' },
    { id: 'fleet', label: 'Perfil da Frota', icon: FiTruck, color: 'tab-fleet' },
    { id: 'financial', label: 'Financeiro', icon: FiCreditCard, color: 'tab-financial' },
  ];

  const handleInviteMember = () => {
    setShowInviteModal(true);
    // Em uma aplicação real, aqui seria o modal de convite
    setTimeout(() => setShowInviteModal(false), 2000);
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
    <div className="company-profile-page">
      <div className="company-profile-container">
        
        {/* Header da Empresa */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="company-profile-header"
        >
          <div className="company-header-overlay"></div>
          
          <div className="company-header-content">
            <div className="company-logo-section">
              <div className="company-logo">
                <span className="logo-text">{companyData.acronym}</span>
                {companyData.verified && (
                  <div className="verified-badge">
                    <FiCheck className="verified-icon" />
                  </div>
                )}
              </div>
              
              <div className="company-main-info">
                <h1 className="company-name">
                  <input
                    className="form-input"
                    placeholder="Nome da Empresa"
                    value={companyData.name}
                    onChange={handleCompanyChange('name')}
                  />
                </h1>

                <div style={{ marginTop: 8 }}>
                  <textarea
                    className="form-input"
                    placeholder="Descrição da empresa"
                    value={companyData.description}
                    onChange={handleCompanyChange('description')}
                    rows={3}
                  />
                </div>

                <div className="company-tags" style={{ marginTop: 12 }}>
                  <label className="company-tag">
                    <input
                      type="checkbox"
                      checked={companyData.verified}
                      onChange={(e) => setCompanyData(prev => ({ ...prev, verified: e.target.checked }))}
                    />{' '}
                    Verificada
                  </label>
                  <input
                    className="form-input"
                    placeholder="Status (ex: Ativa)"
                    value={companyData.status}
                    onChange={handleCompanyChange('status')}
                    style={{ display: 'inline-block', marginLeft: 8, width: 160 }}
                  />
                  <input
                    className="form-input"
                    placeholder="Setor"
                    value={companyData.sector}
                    onChange={handleCompanyChange('sector')}
                    style={{ display: 'inline-block', marginLeft: 8, width: 220 }}
                  />
                </div>

                <div className="company-contacts" style={{ marginTop: 12 }}>
                  <div className="contact-item">
                    <FiBriefcase className="contact-icon" />
                    <input
                      className="form-input"
                      placeholder="CNPJ"
                      value={companyData.cnpj}
                      onChange={handleCompanyChange('cnpj')}
                    />
                  </div>
                  <div className="contact-item">
                    <FiMapPin className="contact-icon" />
                    <input
                      className="form-input"
                      placeholder="Sede (Cidade, UF)"
                      value={companyData.headquarters}
                      onChange={handleCompanyChange('headquarters')}
                    />
                  </div>
                  <div className="contact-item">
                    <FiGlobe className="contact-icon" />
                    <input
                      className="form-input"
                      placeholder="Website (ex: empresa.com.br)"
                      value={companyData.website}
                      onChange={handleCompanyChange('website')}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="company-header-actions">
              <button
                className="company-action-button company-action-primary"
                onClick={handleSaveCompany}
                disabled={isSavingCompany}
              >
                {isSavingCompany ? (
                  <>
                    <FiRefreshCw className="action-icon" /> Salvando...
                  </>
                ) : (
                  <>
                    <FiSave className="action-icon" /> Salvar Empresa
                  </>
                )}
              </button>
              <button className="company-action-button company-action-secondary">
                <FiExternalLink className="action-icon" /> Ver Portal
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          variants={itemVariants}
          className="company-stats-grid"
        >
          {stats.map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className={`stat-card ${stat.color}`}>
                <div className="stat-icon-wrapper">
                  <Icon className="stat-icon" />
                </div>
                <div className="stat-content">
                  <div className="stat-header">
                    <span className="stat-label">{stat.label}</span>
                    {stat.trend && (
                      <span className="stat-trend">{stat.trend}</span>
                    )}
                  </div>
                  <div className="stat-value">{stat.value}</div>
                  {stat.description && (
                    <p className="stat-description">{stat.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Main Content with Tabs */}
        <motion.div 
          variants={itemVariants}
          className="company-main-content"
        >
          {/* Tabs Navigation */}
          <div className="company-tabs-navigation">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`company-tab ${activeTab === tab.id ? 'company-tab-active' : ''} ${tab.color}`}
                >
                  <Icon className="tab-icon" />
                  <span className="tab-label">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="tab-indicator"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="company-tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'info' && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="tab-pane"
                >
                  <div className="pane-grid">
                    <div className="pane-section">
                      <h3 className="section-title">
                        <FiBriefcase className="section-icon" />
                        Informações da Empresa
                      </h3>
                      
                      <div className="company-details">
                        <div className="detail-row">
                          <span className="detail-label">Nome Legal</span>
                          <span className="detail-value">{companyData.name}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">CNPJ</span>
                          <span className="detail-value">{companyData.cnpj}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Fundação</span>
                          <span className="detail-value">{companyData.foundation}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Setor</span>
                          <span className="detail-value">{companyData.sector}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">Status</span>
                          <span className="detail-value detail-status-active">{companyData.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pane-section">
                      <h3 className="section-title">
                        <FiMail className="section-icon" />
                        Contato e Localização
                      </h3>
                      
                      <div className="contact-cards">
                        <div className="contact-card">
                          <div className="contact-card-header">
                            <FiMail className="contact-card-icon" />
                            <span className="contact-card-label">Email Corporativo</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                            <input
                              className="form-input"
                              placeholder="email@empresa.com"
                              value={companyData.email}
                              onChange={(e) => setCompanyData(prev => ({ ...prev, email: e.target.value }))}
                            />
                            {errors.email && <span style={{ color: 'var(--profile-danger)', fontSize: 13 }}>{errors.email}</span>}
                          </div>
                        </div>
                        
                        <div className="contact-card">
                          <div className="contact-card-header">
                            <FiPhone className="contact-card-icon" />
                            <span className="contact-card-label">Telefone Principal</span>
                          </div>
                          <input
                            className="form-input"
                            placeholder="(00) 0000-0000"
                            value={companyData.phone}
                            onChange={(e) => setCompanyData(prev => ({ ...prev, phone: e.target.value }))}
                          />
                        </div>
                        
                        <div className="contact-card">
                          <div className="contact-card-header">
                            <FiMapPin className="contact-card-icon" />
                            <span className="contact-card-label">Sede Principal</span>
                          </div>
                          <span className="contact-card-value">
                            {companyData.headquarters}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'team' && (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="tab-pane"
                >
                  <div className="team-management">
                    <div className="team-header">
                      <div className="team-header-info">
                        <h3 className="section-title">
                          <FiUsers className="section-icon" />
                          Membros da Organização
                        </h3>
                        <span className="team-count">{teamMembers.length} membros</span>
                      </div>
                      
                      <div className="team-actions">
                        <button 
                          onClick={handleInviteMember}
                          className="team-action-button team-action-invite"
                          disabled={showInviteModal}
                        >
                          {showInviteModal ? (
                            <>
                              <FiRefreshCw className="loading-icon" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <FiPlus />
                              Convidar Membro
                            </>
                          )}
                        </button>
                        <button className="team-action-button team-action-settings">
                          <FiSettings />
                          Configurações
                        </button>
                      </div>
                    </div>

                    <div className="team-members-list">
                      {teamMembers.map(member => (
                        <div key={member.id} className="team-member-card">
                          <div className="member-avatar">
                            {member.avatar}
                          </div>
                          
                          <div className="member-info">
                            <div className="member-header">
                              <h4 className="member-name">{member.name}</h4>
                              <span className={`member-status member-status-${member.status.toLowerCase()}`}>
                                {member.status}
                              </span>
                            </div>
                            
                            <div className="member-details">
                              <span className="member-role">{member.role}</span>
                              <span className="member-email">{member.email}</span>
                              <div className="member-meta">
                                <span className="member-joined">Desde {member.joined}</span>
                              </div>
                            </div>
                            
                            <div className="member-permissions">
                              {member.permissions.map((permission, idx) => (
                                <span key={idx} className="permission-tag">
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="member-actions">
                            <button className="member-action-button">
                              <FiMoreVertical />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'fleet' && (
                <motion.div
                  key="fleet"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="tab-pane"
                >
                  <div className="fleet-overview">
                    <div className="fleet-header">
                      <h3 className="section-title">
                        <FiTruck className="section-icon" />
                        Análise da Frota
                      </h3>
                      <button className="fleet-report-button">
                        <FiBarChart2 className="report-icon" />
                        Gerar Relatório
                      </button>
                    </div>

                    <div className="fleet-metrics-grid">
                      {fleetMetrics.map(metric => {
                        const Icon = metric.icon;
                        return (
                          <div key={metric.id} className={`fleet-metric-card ${metric.color}`}>
                            <div className="metric-icon-container">
                              <Icon className="metric-icon" />
                            </div>
                            <div className="metric-content">
                              <span className="metric-label">{metric.label}</span>
                              <div className="metric-value">{metric.value}</div>
                              <span className="metric-description">{metric.description}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="fleet-insights">
                      <h4 className="insights-title">
                        <FiTrendingUp className="insights-icon" />
                        Insights da Frota
                      </h4>
                      <div className="insights-grid">
                        <div className="insight-card">
                          <div className="insight-header">
                            <FiStar className="insight-icon" />
                            <span className="insight-label">Veículo Mais Eficiente</span>
                          </div>
                          <div className="insight-content">
                            <span className="insight-value">Scania R500</span>
                            <span className="insight-detail">9.8 L/100km</span>
                          </div>
                        </div>
                        <div className="insight-card">
                          <div className="insight-header">
                            <FiAward className="insight-icon" />
                            <span className="insight-label">Melhor Score</span>
                          </div>
                          <div className="insight-content">
                            <span className="insight-value">Mercedes Actros</span>
                            <span className="insight-detail">9.9/10 segurança</span>
                          </div>
                        </div>
                        <div className="insight-card">
                          <div className="insight-header">
                            <FiPackage className="insight-icon" />
                            <span className="insight-label">Carga Transportada</span>
                          </div>
                          <div className="insight-content">
                            <span className="insight-value">142.5 ton</span>
                            <span className="insight-detail">Mês atual</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'financial' && (
                <motion.div
                  key="financial"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="tab-pane"
                >
                  <div className="financial-overview">
                    <div className="financial-header">
                      <h3 className="section-title">
                        <FiCreditCard className="section-icon" />
                        Informações Financeiras
                      </h3>
                    </div>

                    <div className="financial-plan-card">
                      <div className="plan-header">
                        <div className="plan-icon">
                          <FiAward />
                        </div>
                        <div className="plan-info">
                          <h4 className="plan-name">{financialData.plan}</h4>
                          <span className="plan-status plan-status-active">{financialData.status}</span>
                        </div>
                      </div>
                      
                      <div className="plan-details">
                        <div className="plan-detail">
                          <span className="detail-label">Valor Mensal</span>
                          <span className="detail-value">{financialData.value}</span>
                        </div>
                        <div className="plan-detail">
                          <span className="detail-label">Próxima Renovação</span>
                          <span className="detail-value">{financialData.renewal}</span>
                        </div>
                        <div className="plan-detail">
                          <span className="detail-label">Forma de Pagamento</span>
                          <span className="detail-value">{financialData.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    <div className="financial-usage">
                      <h4 className="usage-title">Uso do Sistema</h4>
                      <div className="usage-stats">
                        <div className="usage-stat">
                          <span className="usage-label">Chamadas API</span>
                          <span className="usage-value">{financialData.usage.apiCalls}</span>
                        </div>
                        <div className="usage-stat">
                          <span className="usage-label">Armazenamento</span>
                          <span className="usage-value">{financialData.usage.storage}</span>
                        </div>
                        <div className="usage-stat">
                          <span className="usage-label">Relatórios</span>
                          <span className="usage-value">{financialData.usage.reports}</span>
                        </div>
                      </div>
                    </div>

                    <div className="financial-actions">
                      <button className="financial-action-button">
                        <FiClipboard className="action-icon" />
                        Ver Faturas
                      </button>
                      <button className="financial-action-button">
                        <FiSettings className="action-icon" />
                        Gerenciar Plano
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyProfile;