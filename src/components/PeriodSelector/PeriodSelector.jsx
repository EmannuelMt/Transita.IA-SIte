import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTruck, FiLinkedin, FiTwitter, FiInstagram, FiMessageCircle,
  FiMail, FiShield, FiChevronRight, FiArrowRight, FiMapPin,
  FiHeadphones, FiCalendar, FiPlay, FiCheck, FiGlobe, FiTrendingUp,
  FiPackage, FiClock, FiSmartphone, FiChevronDown, FiX
} from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  // Scroll listener para back-to-top
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Show success message
  };

  // Data arrays
  const platformLinks = [
    { name: "Dashboard", href: "/dashboard", icon: FiTrendingUp, desc: "Análises em tempo real" },
    { name: "Soluções", href: "/solucoes", icon: FiPackage, desc: "Módulos completos" },
    { name: "Gestão de Multas", href: "/multas", icon: FiShield, desc: "Prevenção inteligente" },
    { name: "Roteirização IA", href: "/roteirizacao", icon: FiTruck, desc: "Otimização de rotas" },
    { name: "Planos", href: "/planos", icon: FiCheck, desc: "Escolha seu plano" },
    { name: "API", href: "/api", icon: FiGlobe, desc: "Integrações" },
    { name: "Suporte", href: "/support", icon: FiHeadphones, desc: "24/7 disponível" }
  ];

  const companyLinks = [
    { name: "Sobre nós", href: "/sobre" },
    { name: "Carreiras", href: "/carreiras" },
    { name: "Blog", href: "/blog" },
    { name: "Cases", href: "/cases" },
    { name: "Parceiros", href: "/parceiros" },
    { name: "Imprensa", href: "/imprensa" }
  ];

  const resourceLinks = [
    { name: "Documentação", href: "/docs" },
    { name: "Tutoriais", href: "/tutoriais" },
    { name: "FAQ", href: "/faq" },
    { name: "Webinars", href: "/webinars" },
    { name: "E-books", href: "/ebooks" },
    { name: "Calculadora ROI", href: "/roi" }
  ];

  const legalLinks = [
    { name: "Termos de Uso", href: "/termos" },
    { name: "Política de Privacidade", href: "/privacidade" },
    { name: "LGPD", href: "/lgpd" },
    { name: "Cookies", href: "/cookies" },
    { name: "Segurança", href: "/seguranca" },
    { name: "SLA", href: "/sla" }
  ];

  const contactInfo = [
    { icon: FiMail, text: "comercial@transita.ai", href: "mailto:comercial@transita.ai", label: "Email comercial" },
    { icon: FiSmartphone, text: "+55 11 4002-8922", href: "tel:+551140028922", label: "Telefone principal" },
    { icon: FiHeadphones, text: "suporte@transita.ai", href: "mailto:suporte@transita.ai", label: "Suporte técnico" },
    { icon: FiMapPin, text: "São Paulo - SP", href: "https://maps.google.com", label: "Localização" }
  ];

  const socialLinks = [
    { icon: FiLinkedin, href: "#", label: "LinkedIn", color: "#0077B5" },
    { icon: FiTwitter, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: FiInstagram, href: "#", label: "Instagram", color: "#E4405F" },
    { icon: FiMessageCircle, href: "#", label: "WhatsApp", color: "#25D366" }
  ];

  const certifications = [
    { name: "ISO 27001", desc: "Segurança da Informação" },
    { name: "LGPD Compliant", desc: "Conformidade total" },
    { name: "AWS Partner", desc: "Infraestrutura cloud" },
    { name: "Google Maps API", desc: "Parceiro oficial" }
  ];

  // Stats data
  const stats = [
    { value: "2.5K+", label: "Clientes Ativos", icon: FiTruck },
    { value: "98.3%", label: "Satisfação", icon: FiCheck },
    { value: "24/7", label: "Suporte", icon: FiClock },
    { value: "99.9%", label: "Uptime", icon: FiTrendingUp }
  ];

  // Footer Link Group Component
  const FooterLinkGroup = ({ title, links, isColumn = true, withIcons = false }) => (
    <div className={`footer-link-group ${isColumn ? 'footer-column' : ''}`}>
      <h3 className="footer-group-title">{title}</h3>
      <ul className="footer-link-list">
        {links.map((link, index) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <a href={link.href} className="footer-link-item">
              {withIcons && link.icon && (
                <link.icon className="footer-link-icon" />
              )}
              <div className="footer-link-content">
                <span className="footer-link-text">{link.name}</span>
                {link.desc && (
                  <span className="footer-link-desc">{link.desc}</span>
                )}
              </div>
              <FiChevronRight className="footer-link-arrow" />
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );

  // Contact Item Component
  const ContactItem = ({ icon: Icon, text, href, label }) => (
    <motion.a
      href={href}
      className="footer-contact-item"
      whileHover={{ x: 5, color: "var(--primary)" }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div className="footer-contact-icon-wrapper">
        <Icon size={18} />
      </div>
      <span className="footer-contact-text">{text}</span>
    </motion.a>
  );

  // Stats Component
  const StatsDisplay = () => (
    <div className="footer-stats">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="footer-stat"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <div className="footer-stat-icon">
            <stat.icon size={20} />
          </div>
          <div className="footer-stat-content">
            <div className="footer-stat-value">{stat.value}</div>
            <div className="footer-stat-label">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <footer className="footer">
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="footer-back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiChevronDown style={{ transform: 'rotate(180deg)' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Stats Bar */}
      <div className="footer-stats-bar">
        <div className="footer-container">
          <StatsDisplay />
        </div>
      </div>

      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand & Contact Section */}
          <div className="footer-brand-section">
            <motion.div 
              className="footer-brand"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="footer-logo-wrapper">
                <div className="footer-logo">
                  <span className="footer-logo-text">TRANSITA</span>
                  <span className="footer-logo-ai">.AI</span>
                </div>
                <div className="footer-logo-badge">AI-Powered</div>
              </div>
              
              <p className="footer-tagline">
                Inteligência Avançada em Logística
              </p>
              
              <p className="footer-description">
                Transformamos operações logísticas com tecnologia de ponta, 
                inteligência artificial e análise preditiva. Mais eficiência, 
                menos custos, resultados mensuráveis.
              </p>

              {/* Contact Info */}
              <div className="footer-contact-info">
                <h4 className="footer-contact-title">Entre em contato</h4>
                <div className="footer-contact-grid">
                  {contactInfo.map((contact, index) => (
                    <ContactItem key={index} {...contact} />
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="footer-social-section">
                <h4 className="footer-social-title">Siga-nos</h4>
                <div className="footer-social-links">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="footer-social-link"
                      style={{ '--social-color': social.color }}
                      aria-label={social.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                        y: -5 
                      }}
                      transition={{ 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 400 
                      }}
                      viewport={{ once: true }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div 
              className="footer-newsletter-section"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="footer-newsletter-card">
                <div className="footer-newsletter-header">
                  <FiMail className="footer-newsletter-header-icon" />
                  <h3 className="footer-newsletter-title">Insights Exclusivos</h3>
                </div>
                
                <p className="footer-newsletter-desc">
                  Receba análises de mercado, cases de sucesso e as últimas 
                  inovações em logística inteligente.
                </p>

                <form onSubmit={handleSubmit} className="footer-newsletter-form">
                  <div className="footer-input-group">
                    <div className="footer-input-wrapper">
                      <FiMail className="footer-input-icon" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="footer-newsletter-input"
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      className="footer-newsletter-button"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiArrowRight size={20} />
                      <span>Inscrever</span>
                    </motion.button>
                  </div>
                  
                  <div className="footer-newsletter-agreement">
                    <input 
                      type="checkbox" 
                      id="newsletter-agreement" 
                      required 
                      className="footer-checkbox"
                    />
                    <label htmlFor="newsletter-agreement">
                      Concordo em receber comunicações da Transita.AI
                    </label>
                  </div>
                </form>

                <div className="footer-certifications-grid">
                  {certifications.map((cert, index) => (
                    <div key={cert.name} className="footer-certification">
                      <FiShield className="footer-certification-icon" />
                      <div className="footer-certification-content">
                        <div className="footer-certification-name">{cert.name}</div>
                        <div className="footer-certification-desc">{cert.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="footer-links-grid">
            <FooterLinkGroup 
              title="Plataforma" 
              links={platformLinks} 
              withIcons={true}
            />
            
            <div className="footer-links-columns">
              <FooterLinkGroup title="Empresa" links={companyLinks} />
              <FooterLinkGroup title="Recursos" links={resourceLinks} />
            </div>
          </div>

          {/* CTA Section */}
          <motion.div 
            className="footer-cta-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="footer-cta-content">
              <h2 className="footer-cta-title">
                Pronto para transformar sua <span className="footer-cta-highlight">logística</span>?
              </h2>
              <p className="footer-cta-subtitle">
                Agende uma demonstração personalizada e veja resultados em 30 dias.
              </p>
            </div>
            
            <div className="footer-cta-actions">
              <motion.a
                href="/demo"
                className="footer-cta-primary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlay size={18} />
                <span>Solicitar Demonstração</span>
              </motion.a>
              
              <motion.a
                href="/contato"
                className="footer-cta-secondary"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiCalendar size={18} />
                <span>Agendar Consulta</span>
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="footer-divider">
          <div className="footer-divider-line" />
          <div className="footer-divider-ornament">
            <FiTruck size={20} />
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <div className="footer-copyright-text">
                <span>&copy; {new Date().getFullYear()} Transita.AI</span>
                <span className="footer-copyright-separator">•</span>
                <span>Todos os direitos reservados</span>
              </div>
              <div className="footer-version">v2.5.1</div>
            </div>
            
            <div className="footer-legal-section">
              <div className="footer-legal-links">
                {legalLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <a href={link.href} className="footer-legal-link">
                      {link.name}
                    </a>
                    {index < legalLinks.length - 1 && (
                      <span className="footer-legal-separator">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              
              <div className="footer-language-selector">
                <button className="footer-language-button">
                  <span>🇧🇷 Português (BR)</span>
                  <FiChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);