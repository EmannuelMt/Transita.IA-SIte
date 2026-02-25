import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSettings, FiGlobe, FiMoon, FiSun, FiDatabase,
  FiCpu, FiTruck, FiBell, FiLock, FiShare2, FiSave,
  FiZap, FiActivity, FiCloud, FiShield, FiRefreshCw,
  FiAlertCircle, FiHardDrive, FiRadio, FiMap,
  FiDownload, FiUpload, FiEye, FiEyeOff, FiCalendar,
  FiKey, FiUsers, FiClock, FiCheck, FiX
} from 'react-icons/fi';
import './Settings.css';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('system');
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const settingsSections = [
    { 
      id: 'system', 
      label: 'Sistema', 
      icon: FiSettings, 
      description: 'Preferências gerais e interface',
      color: 'section-system'
    },
    { 
      id: 'fleet', 
      label: 'Frota', 
      icon: FiTruck, 
      description: 'Parâmetros operacionais e IA',
      color: 'section-fleet'
    },
    { 
      id: 'integrations', 
      label: 'Integrações', 
      icon: FiShare2, 
      description: 'Conexões externas e APIs',
      color: 'section-integrations'
    },
    { 
      id: 'security', 
      label: 'Segurança', 
      icon: FiShield, 
      description: 'Políticas de acesso e dados',
      color: 'section-security'
    },
    { 
      id: 'notifications', 
      label: 'Notificações', 
      icon: FiBell, 
      description: 'Alertas e comunicações',
      color: 'section-notifications'
    },
    { 
      id: 'advanced', 
      label: 'Avançado', 
      icon: FiCpu, 
      description: 'Configurações técnicas',
      color: 'section-advanced'
    },
  ];

  const handleSettingChange = () => {
    if (!hasUnsavedChanges) {
      setHasUnsavedChanges(true);
    }
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulando save API
    setTimeout(() => {
      setIsSaving(false);
      setHasUnsavedChanges(false);
      // Mostrar feedback de sucesso
    }, 1500);
  };

  const handleResetSettings = () => {
    if (window.confirm('Tem certeza que deseja restaurar todas as configurações para os valores padrão?')) {
      setHasUnsavedChanges(false);
      // Aqui seria a lógica de reset
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="settings-header"
        >
          <div className="settings-header-content">
            <div className="settings-badge">
              <FiSettings className="settings-badge-icon" />
              <span>Console de Administração</span>
            </div>
            <h1 className="settings-title">Configurações do Sistema</h1>
            <p className="settings-subtitle">
              Personalize a experiência e os algoritmos da Transita.IA
            </p>
          </div>

          {hasUnsavedChanges && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="settings-changes-indicator"
            >
              <FiAlertCircle className="changes-icon" />
              <span>Alterações não salvas</span>
            </motion.div>
          )}
        </motion.header>

        {/* Main Content */}
        <div className="settings-main-grid">
          {/* Sidebar Navigation */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="settings-sidebar"
          >
            <div className="settings-navigation">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`settings-nav-item ${activeSection === section.id ? 'settings-nav-item-active' : ''} ${section.color}`}
                  >
                    <div className="nav-item-icon">
                      <Icon className="nav-icon" />
                    </div>
                    <div className="nav-item-content">
                      <span className="nav-item-label">{section.label}</span>
                      <span className="nav-item-description">{section.description}</span>
                    </div>
                    {activeSection === section.id && (
                      <div className="nav-item-indicator"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Settings Info Card */}
            <div className="settings-info-card">
              <FiZap className="info-card-icon" />
              <h4 className="info-card-title">Dica Rápida</h4>
              <p className="info-card-text">
                Configure primeiro as preferências de sistema e segurança, depois ajuste os parâmetros específicos.
              </p>
            </div>
          </motion.aside>

          {/* Main Settings Area */}
          <div className="settings-content-area">
            <motion.div 
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="settings-main-card"
            >
              {/* Section Content */}
              <div className="settings-section-content">
                <AnimatePresence mode="wait">
                  {activeSection === 'system' && (
                    <SystemSettings 
                      key="system" 
                      onChange={handleSettingChange}
                    />
                  )}
                  {activeSection === 'fleet' && (
                    <FleetSettings 
                      key="fleet" 
                      onChange={handleSettingChange}
                    />
                  )}
                  {activeSection === 'integrations' && (
                    <IntegrationSettings 
                      key="integrations" 
                      onChange={handleSettingChange}
                    />
                  )}
                  {activeSection === 'security' && (
                    <SecuritySettings 
                      key="security" 
                      onChange={handleSettingChange}
                    />
                  )}
                  {activeSection === 'notifications' && (
                    <NotificationSettings 
                      key="notifications" 
                      onChange={handleSettingChange}
                    />
                  )}
                  {activeSection === 'advanced' && (
                    <AdvancedSettings 
                      key="advanced" 
                      onChange={handleSettingChange}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Actions */}
              <div className="settings-actions-footer">
                <div className="settings-actions-info">
                  <FiAlertCircle className="actions-info-icon" />
                  <span className="actions-info-text">
                    {hasUnsavedChanges 
                      ? 'Você tem alterações não salvas' 
                      : 'Todas as configurações estão salvas'}
                  </span>
                </div>
                
                <div className="settings-actions-buttons">
                  <button 
                    onClick={handleResetSettings}
                    className="settings-action-button settings-action-reset"
                  >
                    <FiRefreshCw className="action-button-icon" />
                    Restaurar Padrão
                  </button>
                  
                  <button 
                    onClick={handleSaveSettings}
                    disabled={!hasUnsavedChanges || isSaving}
                    className="settings-action-button settings-action-save"
                  >
                    {isSaving ? (
                      <>
                        <FiRefreshCw className="loading-icon" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <FiSave className="action-button-icon" />
                        Salvar Alterações
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================================================
// COMPONENTES DE CONFIGURAÇÃO
// ==========================================================================

const SystemSettings = ({ onChange }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('pt-br');
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [analytics, setAnalytics] = useState(true);

  const themes = [
    { id: 'light', label: 'Claro', icon: FiSun, description: 'Interface clara' },
    { id: 'dark', label: 'Escuro', icon: FiMoon, description: 'Interface escura' },
    { id: 'auto', label: 'Automático', icon: FiGlobe, description: 'Baseado no sistema' },
  ];

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2 className="section-title">
          <FiSettings className="section-icon" />
          Preferências do Sistema
        </h2>
        <p className="section-description">
          Ajuste a aparência e comportamento geral da plataforma
        </p>
      </div>

      <div className="settings-list">
        {/* Tema */}
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Tema da Interface</h3>
            <p className="setting-description">
              Escolha o tema visual da plataforma
            </p>
          </div>
          <div className="theme-selector">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              return (
                <button
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    onChange();
                  }}
                  className={`theme-option ${theme === themeOption.id ? 'theme-option-active' : ''}`}
                >
                  <div className="theme-option-icon">
                    <Icon className="theme-icon" />
                  </div>
                  <div className="theme-option-content">
                    <span className="theme-label">{themeOption.label}</span>
                    <span className="theme-description">{themeOption.description}</span>
                  </div>
                  {theme === themeOption.id && (
                    <div className="theme-option-check">
                      <FiCheck />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Idioma */}
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Idioma e Região</h3>
            <p className="setting-description">
              Idioma dos relatórios, notificações e interface
            </p>
          </div>
          <div className="setting-control">
            <select 
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                onChange();
              }}
              className="settings-select"
            >
              <option value="pt-br">Português (Brasil)</option>
              <option value="en-us">English (US)</option>
              <option value="es-es">Español</option>
            </select>
          </div>
        </div>

        {/* Toggles */}
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Atualizações e Análise</h3>
            <p className="setting-description">
              Controle de atualizações e coleta de dados
            </p>
          </div>
          
          <div className="settings-toggles">
            <SettingsToggle
              label="Atualizações Automáticas"
              description="Instala automaticamente patches de segurança e melhorias"
              enabled={autoUpdates}
              onChange={(value) => {
                setAutoUpdates(value);
                onChange();
              }}
              icon={FiDownload}
            />
            
            <SettingsToggle
              label="Análise de Uso"
              description="Compartilha dados anônimos para melhorar a plataforma"
              enabled={analytics}
              onChange={(value) => {
                setAnalytics(value);
                onChange();
              }}
              icon={FiActivity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FleetSettings = ({ onChange }) => {
  const [speedLimit, setSpeedLimit] = useState(110);
  const [aiSensitivity, setAiSensitivity] = useState('balanced');
  const [realTimeTracking, setRealTimeTracking] = useState(true);
  const [fuelEfficiency, setFuelEfficiency] = useState(true);

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2 className="section-title">
          <FiTruck className="section-icon" />
          Configurações da Frota
        </h2>
        <p className="section-description">
          Parâmetros operacionais e algoritmos de IA
        </p>
      </div>

      <div className="settings-list">
        {/* Limite de Velocidade */}
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Limite de Velocidade Alerta</h3>
            <p className="setting-description">
              Velocidade máxima antes de disparar alertas críticos
            </p>
          </div>
          <div className="setting-control">
            <div className="slider-container">
              <input
                type="range"
                min="80"
                max="140"
                step="5"
                value={speedLimit}
                onChange={(e) => {
                  setSpeedLimit(parseInt(e.target.value));
                  onChange();
                }}
                className="settings-slider"
              />
              <div className="slider-labels">
                <span>80 km/h</span>
                <span className="slider-current">{speedLimit} km/h</span>
                <span>140 km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sensibilidade da IA */}
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Sensibilidade da IA</h3>
            <p className="setting-description">
              Rigor dos algoritmos na detecção de anomalias
            </p>
          </div>
          <div className="setting-control">
            <div className="sensitivity-options">
              {[
                { value: 'low', label: 'Otimizada', desc: 'Foco em performance' },
                { value: 'balanced', label: 'Padrão', desc: 'Balanceado' },
                { value: 'high', label: 'Alta', desc: 'Foco em segurança' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setAiSensitivity(option.value);
                    onChange();
                  }}
                  className={`sensitivity-option ${aiSensitivity === option.value ? 'sensitivity-option-active' : ''}`}
                >
                  <div className="sensitivity-content">
                    <span className="sensitivity-label">{option.label}</span>
                    <span className="sensitivity-desc">{option.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Monitoramento e Eficiência</h3>
            <p className="setting-description">
              Controle de rastreamento e otimização
            </p>
          </div>
          
          <div className="settings-toggles">
            <SettingsToggle
              label="Monitoramento em Tempo Real"
              description="Rastreamento GPS constante para frota ativa"
              enabled={realTimeTracking}
              onChange={(value) => {
                setRealTimeTracking(value);
                onChange();
              }}
              icon={FiRadio}
            />
            
            <SettingsToggle
              label="Otimização de Combustível"
              description="Sugestões automáticas para economia de combustível"
              enabled={fuelEfficiency}
              onChange={(value) => {
                setFuelEfficiency(value);
                onChange();
              }}
              icon={FiZap}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const IntegrationSettings = ({ onChange }) => {
  const [integrations, setIntegrations] = useState({
    googleMaps: { enabled: true, apiKey: '************************' },
    sap: { enabled: false, apiKey: '' },
    weather: { enabled: true, apiKey: '************************' },
    payment: { enabled: false, apiKey: '' },
  });

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2 className="section-title">
          <FiShare2 className="section-icon" />
          Integrações Externas
        </h2>
        <p className="section-description">
          Conexões com serviços de terceiros e APIs
        </p>
      </div>

      <div className="settings-list">
        <div className="integrations-grid">
          {/* Google Maps */}
          <IntegrationCard
            title="Google Maps API"
            description="Roteirização avançada e geolocalização"
            icon={FiMap}
            enabled={integrations.googleMaps.enabled}
            apiKey={integrations.googleMaps.apiKey}
            onToggle={(enabled) => {
              setIntegrations(prev => ({
                ...prev,
                googleMaps: { ...prev.googleMaps, enabled }
              }));
              onChange();
            }}
            onUpdateKey={(key) => {
              setIntegrations(prev => ({
                ...prev,
                googleMaps: { ...prev.googleMaps, apiKey: key }
              }));
              onChange();
            }}
          />

          {/* SAP Integration */}
          <IntegrationCard
            title="ERP SAP Integration"
            description="Sincronização de custos e notas fiscais"
            icon={FiDatabase}
            enabled={integrations.sap.enabled}
            apiKey={integrations.sap.apiKey}
            onToggle={(enabled) => {
              setIntegrations(prev => ({
                ...prev,
                sap: { ...prev.sap, enabled }
              }));
              onChange();
            }}
            onUpdateKey={(key) => {
              setIntegrations(prev => ({
                ...prev,
                sap: { ...prev.sap, apiKey: key }
              }));
              onChange();
            }}
          />

          {/* Weather API */}
          <IntegrationCard
            title="Weather Service"
            description="Previsão meteorológica para rotas"
            icon={FiCloud}
            enabled={integrations.weather.enabled}
            apiKey={integrations.weather.apiKey}
            onToggle={(enabled) => {
              setIntegrations(prev => ({
                ...prev,
                weather: { ...prev.weather, enabled }
              }));
              onChange();
            }}
            onUpdateKey={(key) => {
              setIntegrations(prev => ({
                ...prev,
                weather: { ...prev.weather, apiKey: key }
              }));
              onChange();
            }}
          />
        </div>
      </div>
    </div>
  );
};

const SecuritySettings = ({ onChange }) => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [dataRetention, setDataRetention] = useState('1-year');
  const [sessionTimeout, setSessionTimeout] = useState(30);

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2 className="section-title">
          <FiShield className="section-icon" />
          Segurança e Privacidade
        </h2>
        <p className="section-description">
          Políticas de acesso, dados e segurança da conta
        </p>
      </div>

      <div className="settings-list">
        {/* 2FA */}
        <div className="setting-group">
          <SettingsToggle
            label="Autenticação de Dois Fatores"
            description="Camada extra de proteção para login administrativo"
            enabled={twoFactor}
            onChange={(value) => {
              setTwoFactor(value);
              onChange();
            }}
            icon={FiKey}
            critical
          />
        </div>

        {/* Retenção de Dados */}
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Retenção de Dados</h3>
            <p className="setting-description">
              Tempo que dados operacionais são mantidos
            </p>
          </div>
          <div className="setting-control">
            <select 
              value={dataRetention}
              onChange={(e) => {
                setDataRetention(e.target.value);
                onChange();
              }}
              className="settings-select"
            >
              <option value="6-months">6 Meses</option>
              <option value="1-year">1 Ano</option>
              <option value="2-years">2 Anos</option>
              <option value="indefinite">Indefinido (Premium)</option>
            </select>
          </div>
        </div>

        {/* Timeout de Sessão */}
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Timeout de Sessão</h3>
            <p className="setting-description">
              Tempo de inatividade antes do logout automático
            </p>
          </div>
          <div className="setting-control">
            <div className="timeout-options">
              {[15, 30, 60, 120].map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => {
                    setSessionTimeout(minutes);
                    onChange();
                  }}
                  className={`timeout-option ${sessionTimeout === minutes ? 'timeout-option-active' : ''}`}
                >
                  {minutes} min
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Zona Crítica */}
        <div className="danger-zone">
          <div className="danger-zone-header">
            <FiAlertCircle className="danger-zone-icon" />
            <h3 className="danger-zone-title">Zona Crítica</h3>
          </div>
          <p className="danger-zone-description">
            Ações irreversíveis que afetam a integridade da conta
          </p>
          
          <div className="danger-zone-actions">
            <button className="danger-zone-button">
              <FiHardDrive className="button-icon" />
              <div className="button-content">
                <span className="button-label">Exportar Todos os Dados</span>
                <span className="button-description">Download completo em formato CSV</span>
              </div>
            </button>
            
            <button className="danger-zone-button danger-zone-button-delete">
              <FiX className="button-icon" />
              <div className="button-content">
                <span className="button-label">Apagar Todo Histórico</span>
                <span className="button-description">Remover permanentemente todos os registros</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSettings = ({ onChange }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2 className="section-title">
          <FiBell className="section-icon" />
          Configurações de Notificação
        </h2>
        <p className="section-description">
          Controle como e quando você é notificado
        </p>
      </div>

      <div className="settings-list">
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Canais de Notificação</h3>
            <p className="setting-description">
              Escolha como deseja receber comunicações
            </p>
          </div>
          
          <div className="settings-toggles">
            <SettingsToggle
              label="Notificações por Email"
              description="Receba relatórios e alertas no seu email"
              enabled={emailNotifications}
              onChange={(value) => {
                setEmailNotifications(value);
                onChange();
              }}
              icon={FiMail}
            />
            
            <SettingsToggle
              label="Notificações Push"
              description="Alertas em tempo real no navegador"
              enabled={pushNotifications}
              onChange={(value) => {
                setPushNotifications(value);
                onChange();
              }}
              icon={FiBell}
            />
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Tipos de Alerta</h3>
            <p className="setting-description">
              Controle quais tipos de notificações receber
            </p>
          </div>
          
          <div className="settings-toggles">
            <SettingsToggle
              label="Alertas Críticos"
              description="Multas, falhas de segurança e emergências"
              enabled={criticalAlerts}
              onChange={(value) => {
                setCriticalAlerts(value);
                onChange();
              }}
              icon={FiAlertCircle}
              critical
            />
            
            <SettingsToggle
              label="Relatórios Semanais"
              description="Resumo de performance enviado toda segunda-feira"
              enabled={weeklyReports}
              onChange={(value) => {
                setWeeklyReports(value);
                onChange();
              }}
              icon={FiCalendar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const AdvancedSettings = ({ onChange }) => {
  const [debugMode, setDebugMode] = useState(false);
  const [apiLogging, setApiLogging] = useState(false);
  const [cacheEnabled, setCacheEnabled] = useState(true);

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2 className="section-title">
          <FiCpu className="section-icon" />
          Configurações Avançadas
        </h2>
        <p className="section-description">
          Configurações técnicas para administradores
        </p>
      </div>

      <div className="settings-list">
        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Modo de Desenvolvimento</h3>
            <p className="setting-description">
              Configurações para debug e desenvolvimento
            </p>
          </div>
          
          <div className="settings-toggles">
            <SettingsToggle
              label="Modo Debug"
              description="Ativa logs detalhados para troubleshooting"
              enabled={debugMode}
              onChange={(value) => {
                setDebugMode(value);
                onChange();
              }}
              icon={FiActivity}
            />
            
            <SettingsToggle
              label="Log de API"
              description="Registra todas as requisições API"
              enabled={apiLogging}
              onChange={(value) => {
                setApiLogging(value);
                onChange();
              }}
              icon={FiDatabase}
            />
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Cache e Performance</h3>
            <p className="setting-description">
              Otimizações de performance do sistema
            </p>
          </div>
          
          <div className="settings-toggles">
            <SettingsToggle
              label="Cache Ativado"
              description="Armazena dados em cache para melhor performance"
              enabled={cacheEnabled}
              onChange={(value) => {
                setCacheEnabled(value);
                onChange();
              }}
              icon={FiHardDrive}
            />
          </div>
        </div>

        <div className="setting-group">
          <div className="setting-header">
            <h3 className="setting-label">Exportar Configurações</h3>
            <p className="setting-description">
              Backup e restauração de configurações
            </p>
          </div>
          
          <div className="export-actions">
            <button className="export-button">
              <FiDownload className="export-icon" />
              Exportar Configurações
            </button>
            
            <button className="export-button">
              <FiUpload className="export-icon" />
              Importar Configurações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================================================
// COMPONENTES AUXILIARES
// ==========================================================================

const SettingsToggle = ({ 
  label, 
  description, 
  enabled, 
  onChange,
  icon: Icon,
  critical = false 
}) => {
  const handleToggle = () => {
    onChange(!enabled);
  };

  return (
    <div className="settings-toggle">
      <div className="toggle-header">
        <div className="toggle-icon-wrapper">
          <Icon className={`toggle-icon ${critical ? 'toggle-icon-critical' : ''}`} />
        </div>
        <div className="toggle-content">
          <h4 className="toggle-label">{label}</h4>
          <p className="toggle-description">{description}</p>
        </div>
      </div>
      
      <button
        onClick={handleToggle}
        className={`toggle-switch ${enabled ? 'toggle-switch-enabled' : ''} ${critical ? 'toggle-switch-critical' : ''}`}
        aria-label={`${enabled ? 'Desativar' : 'Ativar'} ${label}`}
      >
        <div className="toggle-switch-handle"></div>
      </button>
    </div>
  );
};

const IntegrationCard = ({ 
  title, 
  description, 
  icon: Icon, 
  enabled, 
  apiKey, 
  onToggle,
  onUpdateKey 
}) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className={`integration-card ${enabled ? 'integration-card-enabled' : 'integration-card-disabled'}`}>
      <div className="integration-header">
        <div className="integration-icon">
          <Icon />
        </div>
        <div className="integration-info">
          <h4 className="integration-title">{title}</h4>
          <p className="integration-description">{description}</p>
        </div>
        <button
          onClick={() => onToggle(!enabled)}
          className={`integration-status ${enabled ? 'integration-status-enabled' : 'integration-status-disabled'}`}
        >
          {enabled ? 'Ativo' : 'Inativo'}
        </button>
      </div>

      {enabled && (
        <div className="integration-api">
          <div className="api-key-wrapper">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => onUpdateKey(e.target.value)}
              className="api-key-input"
              placeholder="Chave da API"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="api-key-toggle"
            >
              {showKey ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          <button className="api-key-button">
            Testar Conexão
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;