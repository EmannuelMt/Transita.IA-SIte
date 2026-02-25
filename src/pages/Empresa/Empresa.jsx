import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import Anime from 'react-anime';
import { 
  FiArrowRight, 
  FiCheck, 
  FiMap, 
  FiClock, 
  FiTrendingUp,
  FiMail,
  FiPhone,
  FiClock as FiClockIcon,
  FiMenu,
  FiX,
  FiLinkedin,
  FiInstagram,
  FiTwitter
} from 'react-icons/fi';
import { 
  FaTruck, 
  FaRobot, 
  FaChartLine, 
  FaShieldAlt,
  FaWhatsapp 
} from 'react-icons/fa';
import { 
  BsGraphUp, 
  BsPeople, 
  BsBuilding,
  BsGeoAlt 
} from 'react-icons/bs';
import { 
  MdOutlineSupportAgent,
  MdOutlineDashboard 
} from 'react-icons/md';
import { TbDeviceAnalytics } from 'react-icons/tb';
import CountUp from 'react-countup';
import { useInView as useInViewLib } from 'react-intersection-observer';
import Lottie from 'lottie-react';
import { toast, Toaster } from 'react-hot-toast';
import './Empresa.scss';
import phoneImg from '../../assets/empresa/logobobre.png';
import logo from '../../assets/images/Logo/logo.svg';
import animationData from '../../assets/animations/truck-loading.json'; // Exemplo de animação

const TEAM = [
  { 
    name: 'Mariana Silva', 
    role: 'CEO & Co-fundadora',
    bio: 'Ex-McKinsey, especialista em supply chain com passagem pela Amazon',
    icon: <BsPeople />,
    color: '#16a34a'
  },
  { 
    name: 'Carlos Pereira', 
    role: 'CTO & Co-fundador',
    bio: 'PhD em IA pela Stanford, ex-Google AI Research',
    icon: <FaRobot />,
    color: '#0f9d58'
  },
  { 
    name: 'Ana Gomes', 
    role: 'Head de Operações',
    bio: '10+ anos em logística na Ambev e Magazine Luiza',
    icon: <TbDeviceAnalytics />,
    color: '#86efac'
  },
];

const INVESTORS = [
  { name: 'Fundo Alpha', type: 'Série A', amount: 'R$ 50M', icon: <BsGraphUp /> },
  { name: 'CapLog', type: 'Venture Capital', amount: 'R$ 30M', icon: <BsBuilding /> },
  { name: 'Green Ventures', type: 'Impacto', amount: 'R$ 20M', icon: <FaShieldAlt /> },
];

const OFFICES = [
  { 
    city: 'São Paulo', 
    address: 'Av. Paulista, 1000', 
    coords: '-23.561, -46.655', 
    region: 'Sudeste',
    icon: <BsGeoAlt />
  },
  { 
    city: 'Porto Alegre', 
    address: 'Rua da Logística, 45', 
    coords: '-30.027, -51.228', 
    region: 'Sul',
    icon: <BsGeoAlt />
  },
  { 
    city: 'Recife', 
    address: 'Av. Nordeste, 210', 
    coords: '-8.047, -34.877', 
    region: 'Nordeste',
    icon: <BsGeoAlt />
  },
];

const FEATURES = [
  {
    icon: <FaTruck />,
    title: 'Roteirização Dinâmica',
    description: 'Otimização em tempo real considerando trânsito, entregas e restrições',
    stats: '+40% eficiência'
  },
  {
    icon: <MdOutlineDashboard />,
    title: 'Monitoramento em Tempo Real',
    description: 'Acompanhe sua frota com atualizações a cada 5 segundos',
    stats: '99.9% uptime'
  },
  {
    icon: <TbDeviceAnalytics />,
    title: 'Análise Preditiva',
    description: 'Preveja demandas e evite gargalos com machine learning',
    stats: '95% precisão'
  },
  {
    icon: <FaShieldAlt />,
    title: 'Segurança Avançada',
    description: 'Criptografia de ponta a ponta e conformidade com LGPD',
    stats: 'ISO 27001'
  }
];

const TESTIMONIALS = [
  {
    name: 'João Silva',
    role: 'Diretor de Logística - Magazine Luiza',
    content: 'Reduzimos nossos custos em 35% no primeiro trimestre usando a Transita.IA.',
    rating: 5
  },
  {
    name: 'Maria Santos',
    role: 'COO - AMBEV',
    content: 'A integração foi rápida e o suporte é excepcional. Recomendo fortemente.',
    rating: 5
  }
];

const Empresa = () => {
  const [heroExited, setHeroExited] = useState(false);
  const [formStatus, setFormStatus] = useState('idle');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const aboutRef = useRef(null);
  const contatoRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  
  const controls = useAnimation();
  const [featuresRefInView, featuresInView] = useInViewLib({ threshold: 0.3 });

  // Animações quando elementos entram em view
  useEffect(() => {
    if (featuresInView) {
      controls.start('visible');
    }
  }, [controls, featuresInView]);

  const goContact = () => {
    toast.success('Redirecionando para contato...');
    setTimeout(() => {
      window.location.href = '/contato';
    }, 1500);
  };

  const handleLearn = () => {
    setHeroExited(true);
    setTimeout(() => {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };

  const handleScrollToContato = () => {
    contatoRef.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulação de envio com toast notifications
    toast.loading('Enviando mensagem...', { id: 'contact' });
    
    setTimeout(() => {
      setFormStatus('success');
      toast.success('Mensagem enviada com sucesso!', { id: 'contact' });
      setTimeout(() => {
        setFormStatus('idle');
        e.target.reset();
      }, 3000);
    }, 1500);
  };

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'sobre', 'contato'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="empresa">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            icon: '✅',
          },
        }}
      />

     

      {/* Hero Section com Animações Avançadas */}
      <section id="home" className={`hero ${heroExited ? 'exited' : ''}`}>
        <div className="hero-content">
          <motion.div 
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span 
              className="badge"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Logística 4.0
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Transformamos logística em 
              <motion.span 
                className="highlight"
                animate={{ 
                  scale: [1, 1.02, 1],
                  transition: { duration: 2, repeat: Infinity }
                }}
              >
                {' '}vantagem competitiva
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Roteirização inteligente com IA, monitoramento em tempo real 
              e decisões baseadas em dados — tudo em um só aplicativo.
            </motion.p>

            {/* Stats com CountUp */}
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              {[
                { value: 40, label: 'Eficiência operacional', suffix: '%' },
                { value: 25, label: 'Custos logísticos', suffix: '%', prefix: '-' },
                { value: 99.9, label: 'Uptime garantido', suffix: '%' }
              ].map((stat, index) => (
                <motion.div 
                  className="stat"
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix}
                    prefix={stat.prefix || ''}
                    enableScrollSpy
                    scrollSpyDelay={200}
                  />
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="hero-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button 
                className="btn-primary"
                onClick={goContact}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(22, 163, 74, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                Falar com especialista
                <FiArrowRight />
              </motion.button>
              <motion.button 
                className="btn-secondary"
                onClick={handleLearn}
                whileHover={{ scale: 1.05, borderColor: '#16a34a' }}
                whileTap={{ scale: 0.95 }}
              >
                Como funciona
              </motion.button>
            </motion.div>

            {/* Features com React Anime */}
            <Anime
              easing="easeOutElastic"
              loop={false}
              delay={(el, index) => index * 200}
              translateY={[20, 0]}
              opacity={[0, 1]}
            >
              <ul className="features">
                <li>
                  <FiCheck /> Roteirização dinâmica
                </li>
                <li>
                  <FiCheck /> Monitoramento em tempo real
                </li>
                <li>
                  <FiCheck /> Integração TMS/ERP
                </li>
              </ul>
            </Anime>
          </motion.div>

          {/* Hero Media com Animações */}
          <motion.div 
            className="hero-media"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="phone-frame"
              animate={{ 
                y: [0, -10, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="phone-screen">
                <img src={phoneImg} alt="Prévia do app - logística" loading="lazy" />
              </div>
              <div className="phone-notch"></div>
            </motion.div>
            
            <motion.div 
              className="floating-card card-1"
              animate={{ 
                x: [0, 20, 0],
                y: [0, -10, 0],
                transition: { duration: 5, repeat: Infinity }
              }}
            >
              <span>📦 Economia de 25%</span>
            </motion.div>
            <motion.div 
              className="floating-card card-2"
              animate={{ 
                x: [0, -20, 0],
                y: [0, 10, 0],
                transition: { duration: 6, repeat: Infinity, delay: 1 }
              }}
            >
              <span>📍 Rotas otimizadas</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="main">
        {/* Features Section com Grid Animado */}
        <section ref={featuresRefInView} className="section features-section">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">Funcionalidades</span>
              <h2>Tudo que você precisa em um só lugar</h2>
            </motion.div>

            <motion.div 
              className="features-grid"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              initial="hidden"
              animate={controls}
            >
              {FEATURES.map((feature, index) => (
                <motion.div 
                  className="feature-card"
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  }}
                >
                  <motion.div 
                    className="feature-icon"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-stats">{feature.stats}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Sobre Section com Lottie Animation */}
        <section ref={aboutRef} id="sobre" className="section about">
          <div className="container">
            <div className="about-wrapper">
              <motion.div 
                className="about-content"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="section-tag">Sobre nós</span>
                <h2>Tecnologia que move o Brasil</h2>
                <p className="section-description">
                  Somos uma plataforma focada em otimizar operações logísticas usando 
                  modelos preditivos, telemetria avançada e integração com sistemas legados.
                </p>

                <div className="about-stats">
                  <div className="stat-item">
                    <CountUp end={500} suffix="+" enableScrollSpy />
                    <span>Clientes ativos</span>
                  </div>
                  <div className="stat-item">
                    <CountUp end={1000000} suffix="+" enableScrollSpy />
                    <span>Entregas otimizadas</span>
                  </div>
                  <div className="stat-item">
                    <CountUp end={24} suffix="/7" enableScrollSpy />
                    <span>Suporte disponível</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="about-animation"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Lottie 
                  animationData={animationData} 
                  loop={true}
                  style={{ width: '100%', height: '400px' }}
                />
              </motion.div>
            </div>

            <motion.div 
              className="about-cards"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.3 }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { icon: <FiTrendingUp />, title: 'Missão', text: 'Democratizar o acesso à tecnologia de ponta no setor logístico brasileiro.' },
                { icon: <BsGraphUp />, title: 'Visão', text: 'Ser referência em inteligência logística na América Latina até 2026.' },
                { icon: <FaShieldAlt />, title: 'Valores', text: 'Inovação, sustentabilidade e parcerias de longo prazo.' }
              ].map((item, index) => (
                <motion.div 
                  className="card"
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="card-icon">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Investidores Section */}
        <section className="section investors">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">Quem confia</span>
              <h2>Nossos investidores</h2>
            </motion.div>

            <div className="investors-grid">
              {INVESTORS.map((investor, index) => (
                <motion.div 
                  className="investor-card"
                  key={investor.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <motion.div 
                    className="investor-logo"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {investor.icon}
                  </motion.div>
                  <div className="investor-info">
                    <strong>{investor.name}</strong>
                    <span>{investor.type}</span>
                    <span className="investor-amount">{investor.amount}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="section team">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">Time</span>
              <h2>Quem está construindo o futuro</h2>
            </motion.div>

            <div className="team-grid">
              {TEAM.map((member, index) => (
                <motion.div 
                  className="team-card"
                  key={member.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <motion.div 
                    className="member-avatar"
                    style={{ backgroundColor: member.color }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {member.icon}
                  </motion.div>
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <span className="member-role">{member.role}</span>
                    <p className="member-bio">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section testimonials">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">Depoimentos</span>
              <h2>O que nossos clientes dizem</h2>
            </motion.div>

            <div className="testimonials-grid">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div 
                  className="testimonial-card"
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i}>⭐</span>
                    ))}
                  </div>
                  <p className="testimonial-content">"{testimonial.content}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Offices Section */}
        <section className="section offices">
          <div className="container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="section-tag">Presença</span>
              <h2>Onde estamos</h2>
            </motion.div>

            <div className="offices-grid">
              {OFFICES.map((office, index) => (
                <motion.div 
                  className="office-card"
                  key={office.city}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <motion.div 
                    className="office-pin"
                    animate={{ 
                      y: [0, -5, 0],
                      transition: { duration: 2, repeat: Infinity }
                    }}
                  >
                    {office.icon}
                  </motion.div>
                  <div className="office-info">
                    <h3>{office.city}</h3>
                    <p>{office.address}</p>
                    <span className="office-region">{office.region}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contato Section */}
        <section ref={contatoRef} id="contato" className="section contact">
          <div className="container">
            <motion.div 
              className="contact-wrapper"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="contact-info">
                <span className="section-tag">Contato</span>
                <h2>Vamos transformar sua logística?</h2>
                <p className="contact-description">
                  Preencha o formulário e nossa equipe entrará em contato 
                  em até 24 horas para uma consultoria gratuita.
                </p>
                
                <motion.div 
                  className="contact-details"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.2 }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    { icon: <FiPhone />, title: 'Telefone', text: '(11) 99999-9999' },
                    { icon: <FiMail />, title: 'Email', text: 'contato@transita.ia' },
                    { icon: <FiClockIcon />, title: 'Horário', text: 'Segunda à Sexta, 9h às 18h' }
                  ].map((detail, index) => (
                    <motion.div 
                      className="detail"
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      whileHover={{ x: 10 }}
                    >
                      <span className="detail-icon">{detail.icon}</span>
                      <div>
                        <strong>{detail.title}</strong>
                        <p>{detail.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.button 
                  className="btn-whatsapp"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
                >
                  <FaWhatsapp /> Falar no WhatsApp
                </motion.button>
              </div>

              <motion.form 
                className="contact-form" 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Anime
                  easing="easeOutQuad"
                  delay={(el, index) => index * 100}
                  translateY={[20, 0]}
                  opacity={[0, 1]}
                >
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Nome completo" required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email corporativo" required />
                  </div>
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Telefone" required />
                  </div>
                  <div className="form-group">
                    <input type="text" name="company" placeholder="Empresa" required />
                  </div>
                  <div className="form-group">
                    <textarea name="message" rows="4" placeholder="Como podemos ajudar?" required></textarea>
                  </div>
                </Anime>

                <motion.button 
                  type="submit" 
                  className="btn-submit"
                  disabled={formStatus === 'loading'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {formStatus === 'loading' ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.div>
                  ) : formStatus === 'success' ? 'Enviado! ✓' : 'Solicitar contato'}
                </motion.button>

                <AnimatePresence>
                  {formStatus === 'success' && (
                    <motion.p 
                      className="form-success"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Recebemos sua mensagem! Em breve entraremos em contato.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Empresa;