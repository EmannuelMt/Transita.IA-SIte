import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiTruck, FiLinkedin, FiTwitter, FiInstagram, FiMessageCircle,
  FiMail, FiShield, FiChevronRight, FiArrowRight, FiMapPin,
  FiHeadphones, FiCalendar, FiPlay, FiCheck, FiGlobe, FiTrendingUp,
  FiPackage, FiClock, FiSmartphone, FiChevronUp, FiZap,
  FiStar, FiAward, FiDownload, FiFileText, FiExternalLink
} from 'react-icons/fi';
import logoBanner from '../../assets/images/Logo/Logo.png';
import './Footer.css';

// Componentes memoizados
const FooterLink = memo(({ link, index }) => (
  <motion.li
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.03, duration: 0.3 }}
    viewport={{ once: true, margin: "-50px" }}
  >
    <a href={link.href} className="footer-link">
      <span className="footer-link-bullet" />
      <div className="footer-link-content">
        <span className="footer-link-text">{link.name}</span>
        {link.desc && (
          <span className="footer-link-desc">{link.desc}</span>
        )}
      </div>
      <FiChevronRight className="footer-link-arrow" />
    </a>
  </motion.li>
));

const SocialLink = memo(({ social, index }) => (
  <motion.a
    href={social.href}
    className="footer-social-link"
    style={{ '--social-color': social.color }}
    aria-label={social.label}
    initial={{ opacity: 0, scale: 0 }}
    whileInView={{ opacity: 1, scale: 1 }}
    whileHover={{ 
      scale: 1.2, 
      rotate: [0, -10, 10, 0],
      y: -5,
      backgroundColor: social.color
    }}
    whileTap={{ scale: 0.9 }}
    transition={{ 
      delay: index * 0.1,
      type: "spring",
      stiffness: 400 
    }}
    viewport={{ once: true }}
  >
    <social.icon size={20} />
    <span className="footer-social-tooltip">{social.label}</span>
  </motion.a>
));

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Scroll listener otimizado
  React.useEffect(() => {
    let ticking = false;
    
    const updateBackToTop = () => {
      setShowBackToTop(window.scrollY > 500);
      ticking = false;
    };
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateBackToTop);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!email) return;
    
    try {
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Newsletter subscription:', email);
      setNewsletterSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setNewsletterSuccess(false), 5000);
    } catch (error) {
      console.error('Subscription error:', error);
    }
  }, [email]);

  // Data arrays
  const platformLinks = [
    { name: "Dashboard", href: "/dashboard", desc: "Análises em tempo real", badge: "NEW" },
    { name: "Soluções", href: "/solucoes", desc: "Módulos completos", icon: FiPackage },
    { name: "Gestão de Multas", href: "/multas", desc: "Prevenção inteligente", icon: FiShield },
    { name: "Roteirização IA", href: "/roteirizacao", desc: "Otimização de rotas", icon: FiTruck },
    { name: "Monitoramento", href: "/monitoramento", desc: "GPS ao vivo", icon: FiGlobe },
    { name: "Relatórios", href: "/relatorios", desc: "BI avançado", icon: FiTrendingUp },
    { name: "API", href: "/api", desc: "Integrações", badge: "DEV" },
    { name: "Mobile App", href: "/app", desc: "iOS & Android", icon: FiSmartphone }
  ];

  const companyLinks = [
    { name: "Sobre nós", href: "/sobre", icon: FiStar },
    { name: "Carreiras", href: "/carreiras", badge: "WE'RE HIRING" },
    { name: "Blog", href: "/blog", icon: FiFileText },
    { name: "Cases", href: "/cases", desc: "Histórias de sucesso" },
    { name: "Parceiros", href: "/parceiros", icon: FiAward },
    { name: "Imprensa", href: "/imprensa", desc: "Na mídia" },
    { name: "Eventos", href: "/eventos", icon: FiCalendar },
    { name: "Contato", href: "/contato", desc: "Fale conosco" }
  ];

  const resourceLinks = [
    { name: "Documentação", href: "/docs", icon: FiFileText },
    { name: "Tutoriais", href: "/tutoriais", desc: "Vídeos passo a passo" },
    { name: "FAQ", href: "/faq", icon: FiHeadphones },
    { name: "Webinars", href: "/webinars", badge: "LIVE" },
    { name: "E-books", href: "/ebooks", icon: FiDownload },
    { name: "Calculadora ROI", href: "/roi", desc: "Calcule sua economia" },
    { name: "Status", href: "/status", desc: "Sistema online" },
    { name: "Suporte", href: "/support", icon: FiHeadphones }
  ];

  const legalLinks = [
    { name: "Termos de Uso", href: "/termos" },
    { name: "Privacidade", href: "/privacidade" },
    { name: "LGPD", href: "/lgpd" },
    { name: "Cookies", href: "/cookies" },
    { name: "Segurança", href: "/seguranca" },
    { name: "SLA", href: "/sla", badge: "99.9%" },
    { name: "DPO", href: "/dpo", desc: "Encarregado de dados" },
    { name: "Acessibilidade", href: "/acessibilidade" }
  ];

  const contactInfo = [
    { icon: FiMail, text: "comercial@transita.ai", href: "mailto:comercial@transita.ai", label: "Email comercial", type: "email" },
    { icon: FiSmartphone, text: "+55 11 4002-8922", href: "tel:+551140028922", label: "Telefone principal", type: "phone" },
    { icon: FiMessageCircle, text: "WhatsApp", href: "https://wa.me/5511940028922", label: "WhatsApp Business", type: "whatsapp", badge: "Rápido" },
    { icon: FiMapPin, text: "São Paulo - SP", href: "https://maps.google.com", label: "Escritório matriz", type: "location" },
    { icon: FiHeadphones, text: "suporte@transita.ai", href: "mailto:suporte@transita.ai", label: "Suporte técnico", type: "support" }
  ];

  const socialLinks = [
    { icon: FiLinkedin, href: "#", label: "LinkedIn", color: "#0077B5" },
    { icon: FiTwitter, href: "#", label: "Twitter", color: "#1DA1F2" },
    { icon: FiInstagram, href: "#", label: "Instagram", color: "#E4405F" },
    { icon: FiMessageCircle, href: "#", label: "WhatsApp", color: "#25D366" },
    { icon: FiDownload, href: "#", label: "App Store", color: "#000000" }
  ];

  const certifications = [
    { name: "ISO 27001", desc: "Segurança da Informação", icon: FiShield },
    { name: "LGPD Compliant", desc: "Conformidade total", icon: FiCheck },
    { name: "AWS Advanced", desc: "Parceiro AWS", icon: FiZap },
    { name: "GDPR Ready", desc: "Europa", icon: FiGlobe },
    { name: "SOC 2", desc: "Auditoria completa", icon: FiAward }
  ];

  const downloadLinks = [
    { name: "Whitepaper AI", href: "/whitepaper", icon: FiDownload, size: "2.4 MB" },
    { name: "Case Santander", href: "/case-santander", icon: FiFileText, badge: "NEW" },
    { name: "App iOS", href: "/app-ios", icon: FiSmartphone },
    { name: "App Android", href: "/app-android", icon: FiSmartphone }
  ];

  // Componentes
  const ContactItem = memo(({ contact, index }) => (
    <motion.a
      href={contact.href}
      className={`footer-contact-item footer-contact-${contact.type}`}
      aria-label={contact.label}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5, scale: 1.02 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      viewport={{ once: true }}
    >
      <div className="footer-contact-icon-wrapper">
        <contact.icon size={18} />
      </div>
      <div className="footer-contact-content">
        <span className="footer-contact-text">{contact.text}</span>
        {contact.badge && (
          <span className="footer-contact-badge">{contact.badge}</span>
        )}
      </div>
      <FiExternalLink className="footer-contact-external" />
    </motion.a>
  ));

  const DownloadLink = memo(({ link, index }) => (
    <motion.a
      href={link.href}
      className="footer-download-link"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <link.icon size={16} />
      <span className="footer-download-text">{link.name}</span>
      {link.size && (
        <span className="footer-download-size">{link.size}</span>
      )}
      {link.badge && (
        <span className="footer-download-badge">{link.badge}</span>
      )}
      <FiDownload className="footer-download-icon" />
    </motion.a>
  ));

  return (
    <footer className="footer" role="contentinfo">
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="footer-back-to-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Voltar ao topo"
          >
            <FiChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="footer-container">
        {/* Main Content */}
        <div className="footer-main-content">
          {/* Brand & Newsletter Section */}
          <div className="footer-brand-newsletter">
            {/* Brand Section */}
            <motion.div 
              className="footer-brand-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="footer-brand">
                <div className="footer-logo-container">
                  <motion.div 
                    className="footer-logo"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <img src={logoBanner} alt="Transita.AI Logo" className="footer-logo-image" />
                    <span className="footer-logo-text">TRANSITA</span>
                    <motion.span 
                      className="footer-logo-ai"
                      animate={{ opacity: [1, 0.8, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      .AI
                    </motion.span>
                  </motion.div>
                  <div className="footer-logo-tagline">
                    <FiZap className="footer-zap-icon" />
                    <span>Logística Inteligente</span>
                  </div>
                </div>

                <p className="footer-brand-description">
                  Revolucionamos a gestão logística com inteligência artificial, 
                  automação e dados em tempo real. Mais eficiência, menos custos, 
                  resultados mensuráveis.
                </p>

                {/* Download Links */}
                <div className="footer-downloads">
                  <h4 className="footer-downloads-title">Recursos para download</h4>
                  <div className="footer-downloads-grid">
                    {downloadLinks.map((link, index) => (
                      <DownloadLink key={link.name} link={link} index={index} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="footer-contact-section">
                <h3 className="footer-contact-title">Fale conosco</h3>
                <div className="footer-contact-list">
                  {contactInfo.map((contact, index) => (
                    <ContactItem key={index} contact={contact} index={index} />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Newsletter Section */}
            <motion.div 
              className="footer-newsletter-section"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="footer-newsletter-card">
                <div className="footer-newsletter-header">
                  <div className="footer-newsletter-icon-wrapper">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h3 className="footer-newsletter-title">Newsletter Transita.AI</h3>
                    <p className="footer-newsletter-subtitle">
                      Insights semanais de logística & IA
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {newsletterSuccess ? (
                    <motion.div
                      className="footer-newsletter-success"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <FiCheck size={24} />
                      <div>
                        <h4>Inscrição confirmada!</h4>
                        <p>Enviamos um email de confirmação para você.</p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="footer-newsletter-form">
                      <div className="footer-input-wrapper">
                        <FiMail className="footer-input-icon" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="footer-newsletter-input"
                          required
                          aria-label="Email para newsletter"
                        />
                        <motion.button
                          type="submit"
                          className="footer-newsletter-button"
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={!email}
                        >
                          <FiArrowRight size={20} />
                        </motion.button>
                      </div>
                      
                      <div className="footer-newsletter-features">
                        <span className="footer-feature">
                          <FiCheck size={14} />
                          Sem spam
                        </span>
                        <span className="footer-feature">
                          <FiCheck size={14} />
                          Conteúdo exclusivo
                        </span>
                        <span className="footer-feature">
                          <FiCheck size={14} />
                          Cancelar a qualquer momento
                        </span>
                      </div>
                    </form>
                  )}
                </AnimatePresence>

                {/* Certifications */}
                <div className="footer-certifications">
                  <h4 className="footer-certifications-title">Certificações e selos</h4>
                  <div className="footer-certifications-grid">
                    {certifications.map((cert, index) => (
                      <div key={cert.name} className="footer-certification">
                        <div className="footer-certification-icon">
                          <cert.icon size={16} />
                        </div>
                        <div className="footer-certification-content">
                          <div className="footer-certification-name">{cert.name}</div>
                          <div className="footer-certification-desc">{cert.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="footer-links-grid">
            <div className="footer-links-column">
              <h3 className="footer-links-title">
                <FiPackage className="footer-links-title-icon" />
                Plataforma
              </h3>
              <ul className="footer-links-list">
                {platformLinks.map((link, index) => (
                  <FooterLink key={link.name} link={link} index={index} />
                ))}
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-links-title">
                <FiStar className="footer-links-title-icon" />
                Empresa
              </h3>
              <ul className="footer-links-list">
                {companyLinks.map((link, index) => (
                  <FooterLink key={link.name} link={link} index={index} />
                ))}
              </ul>
            </div>

            <div className="footer-links-column">
              <h3 className="footer-links-title">
                <FiFileText className="footer-links-title-icon" />
                Recursos
              </h3>
              <ul className="footer-links-list">
                {resourceLinks.map((link, index) => (
                  <FooterLink key={link.name} link={link} index={index} />
                ))}
              </ul>
            </div>
          </div>

          {/* Social & CTA Section */}
          <div className="footer-social-cta">
            <div className="footer-social-section">
              <h3 className="footer-social-title">Conecte-se conosco</h3>
              <div className="footer-social-links">
                {socialLinks.map((social, index) => (
                  <SocialLink key={social.label} social={social} index={index} />
                ))}
              </div>
            </div>

            <div className="footer-cta-section">
              <div className="footer-cta-content">
                <h2 className="footer-cta-title">
                  Transforme sua logística com <span className="footer-cta-highlight">IA</span>
                </h2>
                <p className="footer-cta-subtitle">
                  Demonstração personalizada em 30 minutos. Resultados em 30 dias.
                </p>
              </div>
              <div className="footer-cta-buttons">
                <motion.a
                  href="/demo"
                  className="footer-cta-button footer-cta-primary"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiPlay size={18} />
                  <span>Solicitar Demo</span>
                  <span className="footer-cta-badge">Gratuita</span>
                </motion.a>
                
                <motion.a
                  href="/contato"
                  className="footer-cta-button footer-cta-secondary"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiCalendar size={18} />
                  <span>Agendar Consulta</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <div className="footer-copyright-main">
                <span>&copy; {new Date().getFullYear()} Transita.AI</span>
                <span className="footer-copyright-separator">•</span>
                <span>Todos os direitos reservados</span>
              </div>
              <div className="footer-version">
                <span>v2.8.1</span>
                <span className="footer-version-badge">Stable</span>
              </div>
            </div>
            
            <div className="footer-legal-links">
              {legalLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <a href={link.href} className="footer-legal-link">
                    {link.name}
                    {link.badge && (
                      <span className="footer-legal-badge">{link.badge}</span>
                    )}
                  </a>
                  {index < legalLinks.length - 1 && (
                    <span className="footer-legal-separator">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);