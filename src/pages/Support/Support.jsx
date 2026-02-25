import { useState, useEffect, useRef } from 'react';
import {
  FaRobot, FaTruck, FaRoute, FaChartLine, FaDollarSign,
  FaWrench, FaUserCog, FaBell, FaClock, FaShieldAlt,
  FaMapMarkerAlt, FaGasPump, FaUsers, FaCogs, FaDatabase,
  FaCloud, FaMobileAlt, FaDesktop, FaChartBar, FaFilter,
  FaChevronRight, FaPlay, FaCalendarAlt, FaCheckCircle,
  FaPhone, FaWhatsapp, FaEnvelope, FaVideo, FaComments,
  FaLinkedin, FaInstagram, FaFacebook, FaStar, FaRegStar,
  FaArrowUp, FaArrowDown, FaSync, FaBolt, FaLeaf,
  FaCrown, FaAward, FaMedal, FaTrophy, FaHandshake,
  FaChevronLeft, FaChevronDown, FaBuilding, FaExpandAlt, FaCompressAlt,
  FaPause, FaPlayCircle, FaVolumeUp, FaVolumeMute,
  FaSearch, FaCalculator, FaQuestionCircle, FaLock,
  FaChartPie, FaExclamationTriangle, FaMoneyBillWave,
  FaRegClock, FaSyncAlt, FaDatabase as FaDatabaseIcon,
  FaPlug, FaCog, FaEye, FaEyeSlash, FaPercent,
  FaChevronUp, FaGasPump as FaFuel, FaTools,
  FaHeadset, FaTicketAlt, FaBook, FaLifeRing, FaUserFriends,
  FaClock as FaClockIcon, FaCheck, FaTimes, FaPaperPlane,
  FaMicrophone, FaKeyboard, FaMousePointer
} from 'react-icons/fa';
import { MdDashboard, MdAnalytics, MdWarning, MdVerifiedUser, MdCheckCircle, MdCompareArrows } from 'react-icons/md';
import { TbRoute, TbMap2 } from 'react-icons/tb';
import { GiArtificialIntelligence } from 'react-icons/gi';
import './Support.css';

// ==========================================================================
// COMPONENTES REUTILIZÁVEIS
// ==========================================================================

const AnimatedCounter = ({ value, suffix = '', duration = 1500, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;
    const endValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.]/g, '')) : value;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (endValue - startValue) * easeOutQuart;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isVisible, value, duration]);

  return (
    <span ref={ref} className="animated-counter">
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}
    </span>
  );
};

// ==========================================================================
// COMPONENTES DE SUPORTE
// ==========================================================================

const SupportHero = () => {
  return (
    <section className="support-hero-section">
      <div className="container">
        <div className="support-hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Como podemos <span className="gradient-text">ajudar</span> hoje?
            </h1>
            <p className="hero-description">
              Nossa equipe de especialistas e inteligência artificial está pronta para auxiliar você a maximizar a eficiência da sua frota.
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">Disponibilidade</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                <AnimatedCounter value={15} suffix="min" />
              </div>
              <div className="stat-label">Tempo de Resposta</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">4,9/5</div>
              <div className="stat-label">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactChannels = () => {
  const channels = [
    {
      icon: <FaComments />,
      title: "Chat em Tempo Real",
      description: "Converse com um especialista agora mesmo.",
      responseTime: "Imediato",
      availability: "24/7",
      status: "online",
      actionText: "Abrir Chat",
      actionIcon: <FaComments />,
      color: "green"
    },
    {
      icon: <FaEnvelope />,
      title: "Suporte por E-mail",
      description: "Para solicitações técnicas detalhadas.",
      responseTime: "Até 2h",
      availability: "24/7",
      status: "available",
      actionText: "Enviar Ticket",
      actionIcon: <FaTicketAlt />,
      color: "blue"
    },
    {
      icon: <FaPhone />,
      title: "Telefone Direto",
      description: "Atendimento premium para emergências.",
      responseTime: "Imediato",
      availability: "08h - 18h",
      status: "available",
      actionText: "Ligar Agora",
      actionIcon: <FaPhone />,
      color: "orange"
    }
  ];

  return (
    <section className="contact-channels-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Canais de <span className="gradient-text">Contato</span>
          </h2>
          <p className="section-description">
            Escolha o canal que melhor se adapta à sua urgência.
          </p>
        </div>

        <div className="channels-grid">
          {channels.map((channel, index) => (
            <div key={index} className={`channel-card ${channel.status}`}>
              <div className="channel-header">
                <div className={`channel-icon ${channel.color}`}>
                  {channel.icon}
                </div>
                <div className={`status-indicator ${channel.status}`}>
                  <div className="status-dot" />
                  <span className="status-text">{channel.status}</span>
                </div>
              </div>

              <div className="channel-content">
                <h3 className="channel-title">{channel.title}</h3>
                <p className="channel-description">{channel.description}</p>

                <div className="channel-details">
                  <div className="detail-item">
                    <span className="detail-label">Resposta:</span>
                    <span className="detail-value">{channel.responseTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Horário:</span>
                    <span className="detail-value">{channel.availability}</span>
                  </div>
                </div>
              </div>

              <button className={`channel-action action-${channel.color}`}>
                {channel.actionIcon}
                <span className="action-text">{channel.actionText}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: "Como faço para integrar a Transita.AI com meu sistema atual?",
      category: "Integração"
    },
    {
      question: "Quais são os requisitos mínimos de sistema?",
      category: "Técnico"
    },
    {
      question: "A Transita.AI funciona com minha frota atual?",
      category: "Compatibilidade"
    },
    {
      question: "Como é a segurança dos meus dados?",
      category: "Segurança"
    }
  ];

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="section-description">
            Respostas rápidas para as dúvidas mais comuns dos nossos clientes.
          </p>
        </div>

        <div className="faq-list compact">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${activeFAQ === index ? 'active' : ''}`}
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              >
                <div className="question-content">
                  <span className="question-category">{faq.category}</span>
                  <span className="question-text">{faq.question}</span>
                </div>
                <div className="question-icon">
                  {activeFAQ === index ? <FaChevronDown /> : <FaChevronRight />}
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const KnowledgeBase = () => {
  const articles = [
    {
      title: "Guia de Integração API",
      description: "Documentação técnica completa para desenvolvedores integradores.",
      category: "Integração",
      readTime: "12 min",
      icon: <FaPlug />,
      featured: true
    },
    {
      title: "Manutenção Preditiva",
      description: "Como usar os alertas de IA para antecipar falhas mecânicas.",
      category: "Manutenção",
      readTime: "8 min",
      icon: <FaWrench />,
      featured: true
    },
    {
      title: "Otimização de Rotas",
      description: "Algoritmos avançados para redução de consumo de combustível.",
      category: "Performance",
      readTime: "10 min",
      icon: <TbRoute />,
      featured: false
    }
  ];

  return (
    <section className="knowledge-base-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Base de <span className="gradient-text">Conhecimento</span>
          </h2>
          <p className="section-description">
            Artigos técnicos e guias de otimização criados pelo nosso time de engenharia.
          </p>
        </div>

        <div className="kb-search">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              className="search-input"
            />
          </div>
        </div>

        <div className="articles-grid compact">
          {articles.map((article, index) => (
            <div key={index} className={`article-card ${article.featured ? 'featured' : ''}`}>
              {article.featured && (
                <div className="featured-badge">
                  <FaStar />
                  <span>Destaque</span>
                </div>
              )}

              <div className="article-header">
                <div className="article-category">{article.category}</div>
                <div className="article-title">{article.title}</div>
              </div>

              <div className="article-content">
                <p className="article-description">{article.description}</p>
                
                <div className="article-meta">
                  <div className="read-time">
                    <FaClock />
                    <span>{article.readTime}</span>
                  </div>
                  <button className="read-more-btn">
                    <span>Ler artigo</span>
                    <FaChevronRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SystemStatus = () => {
  const services = [
    {
      name: "API Engine",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "Nenhum"
    },
    {
      name: "Dashboards",
      status: "operational",
      uptime: "99.95%",
      lastIncident: "3 dias atrás"
    },
    {
      name: "Route Optimizer",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "Nenhum"
    },
    {
      name: "Mobile App",
      status: "operational",
      uptime: "99.90%",
      lastIncident: "1 semana atrás"
    }
  ];

  return (
    <section className="system-status-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Sistemas <span className="gradient-text">Operacionais</span>
          </h2>
          <p className="section-description">
            Todos os serviços funcionando normalmente.
          </p>
        </div>

        <div className="status-overview">
          <div className="overall-status">
            <div className="uptime-summary">
              <div className="uptime-value">99.98%</div>
              <div className="uptime-label">Uptime Total (30 dias)</div>
            </div>
          </div>
        </div>

        <div className="services-grid compact">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-info">
                <div className="service-name">{service.name}</div>
                <div className={`service-status ${service.status}`}>
                  <div className="status-dot" />
                  <span className="status-text">
                    {service.status === 'operational' && 'Operacional'}
                  </span>
                </div>
              </div>

              <div className="service-metrics">
                <div className="metric">
                  <span className="metric-label">Último Incidente:</span>
                  <span className="metric-value">{service.lastIncident}</span>
                </div>
                <div className="metric">
                  <span className="metric-label">{service.uptime} uptime</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const subjects = [
    "Suporte Técnico",
    "Consultoria de Implementação",
    "Problemas de Integração",
    "Dúvidas sobre Funcionalidades",
    "Sugestões de Melhoria",
    "Outros"
  ];

  return (
    <section className="contact-form-section">
      <div className="container">
        <div className="contact-form-wrapper">
          <div className="form-header">
            <h2 className="section-title">
              Precisa de suporte <span className="gradient-text">personalizado</span>?
            </h2>
            <p className="section-description">
              Nossa equipe de Customer Success está pronta para resolver desafios complexos de integração ou logística. Preencha o formulário e responderemos em tempo recorde.
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info-sidebar">
              <div className="info-item">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <div className="info-content">
                  <h4>E-mail Corporativo</h4>
                  <p>enterprise@transita.ai</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <div className="info-content">
                  <h4>Telefone Suporte</h4>
                  <p>+55 11 4002-8922</p>
                </div>
              </div>
            </div>

            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nome Completo</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ex: João Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail de Trabalho</label>
                <input
                  type="email"
                  id="email"
                  placeholder="joao@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="">Selecione um assunto</option>
                  {subjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Descreva sua dúvida ou solicitação..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button type="submit" className="submit-btn">
                <FaPaperPlane />
                <span>Enviar Mensagem</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================================================
// COMPONENTE PRINCIPAL
// ==========================================================================

const Support = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(scroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="transita-support">
      {/* Scroll Progress Bar */}
      <div className="scroll-progress">
        <div
          className="progress-bar"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Hero Section */}
      <SupportHero />

      {/* Contact Channels */}
      <ContactChannels />

      {/* FAQ Section */}
      <FAQSection />

      {/* Knowledge Base */}
      <KnowledgeBase />

      {/* System Status */}
      <SystemStatus />

      {/* Contact Form */}
      <ContactForm />
    </div>
  );
};

export default Support;