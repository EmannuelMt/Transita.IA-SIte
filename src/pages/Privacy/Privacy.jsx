import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiShield, FiLock, FiEye, FiDatabase, FiDownload, 
  FiTrash2, FiCheckCircle, FiInfo, FiExternalLink, 
  FiMapPin, FiActivity, FiCpu, FiAlertCircle,
  FiUser, FiFileText, FiMail, FiChevronRight,
  FiCalendar, FiHardDrive, FiGlobe
} from 'react-icons/fi';
import './Privacy.css';

const Privacy = () => {
  const [consents, setConsents] = useState({
    gps: true,
    telemetry: true,
    aiAnalysis: true,
    marketing: false,
    sharing: false,
    dataRetention: true,
    cookies: true
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleConsent = (key) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);
    
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsExporting(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    // Em uma aplicação real, aqui seria a chamada API
    alert('Solicitação de exclusão enviada. Você receberá um email de confirmação.');
  };

  const privacyFeatures = [
    {
      id: 1,
      title: 'Criptografia de Ponta a Ponta',
      description: 'Todos os dados são criptografados em trânsito e em repouso usando padrões AES-256.',
      icon: FiLock,
      color: 'feature-green'
    },
    {
      id: 2,
      title: 'Anonimização de Dados',
      description: 'Dados pessoais são anonimizados antes de serem usados para treinamento de IA.',
      icon: FiUser,
      color: 'feature-blue'
    },
    {
      id: 3,
      title: 'Retenção Limitada',
      description: 'Dados são automaticamente excluídos após 36 meses, exceto por obrigação legal.',
      icon: FiCalendar,
      color: 'feature-purple'
    },
    {
      id: 4,
      title: 'Conformidade Global',
      description: 'Estamos em conformidade com LGPD, GDPR e outras regulamentações internacionais.',
      icon: FiGlobe,
      color: 'feature-orange'
    },
  ];

  const aiTransparency = [
    {
      id: 1,
      title: 'Otimização de Rotas',
      description: 'Processamos sua localização em tempo real para calcular trajetos mais curtos e reduzir emissões de CO2.',
      icon: FiMapPin,
      dataPoints: ['Localização', 'Tempo de viagem', 'Consumo de combustível'],
      purpose: 'Reduzir custos operacionais e impacto ambiental'
    },
    {
      id: 2,
      title: 'Análise de Comportamento',
      description: 'Telemetria de aceleração e frenagem é usada para gerar seu Score de Segurança.',
      icon: FiActivity,
      dataPoints: ['Padrões de direção', 'Eventos de frenagem', 'Acelerações'],
      purpose: 'Melhorar a segurança dos motoristas'
    },
    {
      id: 3,
      title: 'Manutenção Preditiva',
      description: 'Dados do veículo são analisados para prever falhas antes que aconteçam.',
      icon: FiCpu,
      dataPoints: ['Desempenho do motor', 'Temperatura', 'Pressão dos pneus'],
      purpose: 'Prevenir quebras e reduzir custos de manutenção'
    },
  ];

  const userRights = [
    { id: 1, title: 'Acesso aos Dados', icon: FiEye, description: 'Verifique todos os dados que temos sobre você' },
    { id: 2, title: 'Correção', icon: FiCheckCircle, description: 'Solicite correção de dados incorretos' },
    { id: 3, title: 'Portabilidade', icon: FiDatabase, description: 'Obtenha uma cópia dos seus dados' },
    { id: 4, title: 'Oposição', icon: FiAlertCircle, description: 'Oponha-se ao processamento de dados' },
  ];

  return (
    <div className="privacy-variables privacy-page">
      <div className="privacy-container">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="privacy-header"
        >
          <div className="privacy-badge">
            <FiShield className="privacy-badge-icon" />
            <span>Privacidade e Transparência</span>
          </div>
          <h1 className="privacy-title">
            Sua segurança é nossa <span className="privacy-highlight">prioridade</span>
          </h1>
          <p className="privacy-subtitle">
            Gerencie como seus dados são utilizados pela Transita.IA e mantenha o controle total sobre sua pegada digital.
          </p>
        </motion.header>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="privacy-features"
        >
          {privacyFeatures.map(feature => {
            const Icon = feature.icon;
            return (
              <div key={feature.id} className={`privacy-feature-card ${feature.color}`}>
                <div className="feature-icon">
                  <Icon className="feature-icon-svg" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </motion.div>

        {/* AI Transparency Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="privacy-card"
        >
          <div className="privacy-card-header">
            <div className="privacy-card-icon">
              <FiCpu className="privacy-card-icon-svg" />
            </div>
            <div className="privacy-card-title-section">
              <h2 className="privacy-card-title">Transparência de IA</h2>
              <p className="privacy-card-subtitle">
                Saiba exatamente como nossos algoritmos processam seus dados
              </p>
            </div>
          </div>

          <div className="ai-transparency-grid">
            {aiTransparency.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="ai-transparency-card">
                  <div className="ai-card-header">
                    <div className="ai-card-icon">
                      <Icon className="ai-card-icon-svg" />
                    </div>
                    <h3 className="ai-card-title">{item.title}</h3>
                  </div>
                  
                  <p className="ai-card-description">{item.description}</p>
                  
                  <div className="ai-card-data">
                    <h4 className="data-title">Dados Coletados:</h4>
                    <div className="data-tags">
                      {item.dataPoints.map((point, index) => (
                        <span key={index} className="data-tag">{point}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="ai-card-purpose">
                    <FiInfo className="purpose-icon" />
                    <span className="purpose-text">{item.purpose}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Consent Center */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="privacy-card consent-center"
        >
          <div className="privacy-card-header">
            <div className="privacy-card-icon">
              <FiLock className="privacy-card-icon-svg" />
            </div>
            <div className="privacy-card-title-section">
              <h2 className="privacy-card-title">Centro de Consentimento</h2>
              <p className="privacy-card-subtitle">
                Controle o que você deseja compartilhar conosco
              </p>
            </div>
          </div>

          <div className="consent-list">
            <ConsentToggle
              label="Rastreamento GPS em Tempo Real"
              description="Necessário para monitoramento de frota e segurança do motorista."
              enabled={consents.gps}
              onChange={() => toggleConsent('gps')}
              critical
            />
            
            <ConsentToggle
              label="Processamento de Telemetria Avançada"
              description="Uso de dados de sensores para prever manutenções preventivas."
              enabled={consents.telemetry}
              onChange={() => toggleConsent('telemetry')}
            />
            
            <ConsentToggle
              label="Treinamento de Modelos de IA"
              description="Contribua anonimamente para a melhoria dos nossos algoritmos de trânsito."
              enabled={consents.aiAnalysis}
              onChange={() => toggleConsent('aiAnalysis')}
            />
            
            <ConsentToggle
              label="Retenção de Dados Estendida"
              description="Manter dados além do período necessário para melhorar nossos serviços."
              enabled={consents.dataRetention}
              onChange={() => toggleConsent('dataRetention')}
            />
            
            <div className="consent-divider">
              <span className="divider-label">Compartilhamento com Terceiros</span>
            </div>
            
            <ConsentToggle
              label="Parceiros de Seguros"
              description="Permitir que parceiros acessem seus dados de segurança para descontos."
              enabled={consents.sharing}
              onChange={() => toggleConsent('sharing')}
            />
            
            <ConsentToggle
              label="Anúncios Personalizados"
              description="Receba ofertas relevantes baseadas em seus padrões de uso."
              enabled={consents.marketing}
              onChange={() => toggleConsent('marketing')}
            />
          </div>
        </motion.div>

        {/* User Rights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="user-rights-section"
        >
          <h2 className="rights-title">Seus Direitos de Privacidade</h2>
          <p className="rights-subtitle">
            De acordo com a LGPD e regulamentações internacionais
          </p>
          
          <div className="rights-grid">
            {userRights.map(right => {
              const Icon = right.icon;
              return (
                <div key={right.id} className="right-card">
                  <div className="right-icon">
                    <Icon className="right-icon-svg" />
                  </div>
                  <h3 className="right-title">{right.title}</h3>
                  <p className="right-description">{right.description}</p>
                  <button className="right-action">
                    <span>Exercer Direito</span>
                    <FiChevronRight className="action-icon" />
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="data-management-section"
        >
          <div className="management-grid">
            {/* Export Card */}
            <div className="management-card export-card">
              <div className="management-card-header">
                <FiDownload className="management-card-icon" />
                <h3 className="management-card-title">Exportar Dados</h3>
              </div>
              
              <p className="management-card-description">
                Baixe uma cópia completa de todas as suas atividades, trajetos e logs de sistema em formato compatível com LGPD.
              </p>
              
              <div className="export-progress">
                <div className="progress-info">
                  <span className="progress-label">Preparando exportação...</span>
                  <span className="progress-value">{exportProgress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${exportProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <button 
                onClick={handleExport}
                disabled={isExporting}
                className="management-button export-button"
              >
                {isExporting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Processando...
                  </>
                ) : (
                  <>
                    <FiDownload className="button-icon" />
                    Solicitar Download
                  </>
                )}
              </button>
            </div>

            {/* Delete Card */}
            <div className="management-card delete-card">
              <div className="management-card-header">
                <FiTrash2 className="management-card-icon delete-icon" />
                <h3 className="management-card-title">Excluir Conta</h3>
              </div>
              
              <p className="management-card-description delete-description">
                Esta ação é definitiva. Todos os seus dados serão anonimizados e sua conta será desativada permanentemente.
              </p>
              
              <div className="delete-warning">
                <FiAlertCircle className="warning-icon" />
                <span className="warning-text">
                  Período de carência: 30 dias para cancelar a exclusão
                </span>
              </div>
              
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="management-button delete-button"
              >
                <FiTrash2 className="button-icon" />
                Solicitar Exclusão
              </button>
            </div>
          </div>
        </motion.div>

        {/* Legal Support */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="legal-support-section"
        >
          <div className="legal-support-overlay"></div>
          
          <div className="legal-support-content">
            <div className="legal-support-info">
              <h2 className="legal-support-title">Precisa de Ajuda Jurídica?</h2>
              <p className="legal-support-description">
                Consulte nossa Política de Privacidade completa ou entre em contato com nosso DPO (Data Protection Officer).
              </p>
            </div>
            
            <div className="legal-support-actions">
              <button className="legal-action-button">
                <FiFileText className="action-button-icon" />
                Ver Política Completa
              </button>
              
              <button className="legal-action-button legal-action-primary">
                <FiMail className="action-button-icon" />
                Falar com DPO
              </button>
            </div>
          </div>
        </motion.div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="delete-confirmation-modal"
            >
              <div className="modal-header">
                <FiAlertCircle className="modal-icon" />
                <h3 className="modal-title">Confirmar Exclusão de Conta</h3>
              </div>
              
              <div className="modal-content">
                <p className="modal-warning">
                  Você está prestes a solicitar a exclusão permanente da sua conta. Esta ação:
                </p>
                
                <ul className="modal-list">
                  <li>Removerá todos os seus dados pessoais</li>
                  <li>Cancelará assinaturas ativas</li>
                  <li>Excluirá histórico de viagens e relatórios</li>
                  <li>É irreversível após 30 dias</li>
                </ul>
                
                <div className="modal-actions">
                  <button 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="modal-button modal-button-cancel"
                  >
                    Cancelar
                  </button>
                  
                  <button 
                    onClick={handleDeleteAccount}
                    className="modal-button modal-button-confirm"
                  >
                    Confirmar Exclusão
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

const ConsentToggle = ({ label, description, enabled, onChange, critical = false }) => {
  return (
    <div className="consent-toggle">
      <div className="toggle-content">
        <div className="toggle-header">
          <h4 className="toggle-label">{label}</h4>
          {critical && (
            <span className="toggle-critical-badge">
              <FiAlertCircle size={12} />
              Essencial
            </span>
          )}
        </div>
        <p className="toggle-description">{description}</p>
      </div>
      
      <button
        onClick={onChange}
        className={`toggle-switch ${enabled ? 'toggle-switch-enabled' : ''}`}
        aria-label={`${enabled ? 'Desativar' : 'Ativar'} ${label}`}
      >
        <div className="toggle-switch-handle"></div>
      </button>
    </div>
  );
};

export default Privacy;