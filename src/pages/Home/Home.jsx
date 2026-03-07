import React, { 
  useState, useEffect, useRef, Fragment, memo, 
  useCallback, useMemo, lazy, Suspense 
} from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';
import { useInView } from 'react-intersection-observer';
import * as Icons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as GiIcons from 'react-icons/gi';
import * as TbIcons from 'react-icons/tb';
import * as Io5Icons from 'react-icons/io5';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import heroBanner from '../../assets/images/Logo/logobannerhero.jpg';
import Tour from '../../components/Tutorial/Tour.jsx';
import './Home.css';

// ==========================================================================
// CONSTANTES GLOBAIS
// ==========================================================================

const APP_CONFIG = {
  ANIMATION: {
    DURATION: { FAST: 0.2, NORMAL: 0.4, SLOW: 0.6 },
    EASING: [0.43, 0.13, 0.23, 0.96],
    SPRING: { type: "spring", stiffness: 100, damping: 20, mass: 1 }
  },
  METRICS: {
    VEHICLES: 1250,
    ROUTES: 8450,
    SAVINGS: 3.2,
    CO2: 1250,
    SATISFACTION: 98,
    REDUCTION: 40
  },
  BREAKPOINTS: { MOBILE: 480, TABLET: 768, DESKTOP: 1024, WIDE: 1280 }
};

// ==========================================================================
// HOOKS PERSONALIZADOS AVANÇADOS
// ==========================================================================

const useIntersectionObserver = (options = {}) => {
  const [ref, inView, entry] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px',
    ...options
  });
  return { ref, inView, entry };
};

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (winScroll / height) * 100 : 0);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
};

const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    setIsComplete(false);

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(prev => prev + text[index]);
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

// ==========================================================================
// COMPONENTES BASE ULTRA-OTIMIZADOS
// ==========================================================================

const Icon = memo(({ name, size = 20, className = '' }) => {
  const IconComponent = Icons[name] || MdIcons[name] || GiIcons[name] || 
                        TbIcons[name] || Io5Icons[name] || RiIcons[name] || 
                        BsIcons[name] || AiIcons[name] || HiIcons[name];
  
  return IconComponent ? (
    <IconComponent className={`icon ${className}`} size={size} aria-hidden="true" />
  ) : null;
});

Icon.displayName = 'Icon';

const LazyImage = memo(({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useIntersectionObserver();

  return (
    <div ref={ref} className={`lazy-image-wrapper ${className || ''}`}>
      {inView && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

const Badge = memo(({ children, variant = 'primary', size = 'md', icon: IconName }) => {
  const variants = {
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    info: 'badge-info',
    outline: 'badge-outline'
  };

  const sizes = { sm: 'badge-sm', md: 'badge-md', lg: 'badge-lg' };

  return (
    <span className={`badge ${variants[variant]} ${sizes[size]}`}>
      {IconName && <Icon name={IconName} size={size === 'lg' ? 16 : 14} />}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

const Button = memo(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: IconName,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    outlinePrimary: 'btn-outline-primary',
    ghost: 'btn-ghost',
    danger: 'btn-danger'
  };

  const sizes = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg' };

  return (
    <button
      type={type}
      className={`btn ${variants[variant]} ${sizes[size]} ${fullWidth ? 'btn-full' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <div className="spinner" />}
      {!loading && IconName && iconPosition === 'left' && <Icon name={IconName} size={size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
      {!loading && IconName && iconPosition === 'right' && <Icon name={IconName} size={size === 'lg' ? 20 : 16} />}
    </button>
  );
});

Button.displayName = 'Button';

const Counter = memo(({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useIntersectionObserver();
  const countRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = startValue + (end - startValue) * easeOutQuart;
      
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const startValue = 0;
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [inView, end, duration]);

  const formattedCount = useMemo(() => {
    return Math.round(count).toLocaleString();
  }, [count]);

  return (
    <span ref={ref} className="counter">
      {prefix}{formattedCount}{suffix}
    </span>
  );
});

Counter.displayName = 'Counter';

const SectionHeader = memo(({ badge, title, description, alignment = 'center' }) => (
  <div className={`section-header section-header-${alignment}`}>
    {badge && <Badge variant="primary" size="lg">{badge}</Badge>}
    <h2 className="section-title">{title}</h2>
    {description && <p className="section-description">{description}</p>}
  </div>
));

SectionHeader.displayName = 'SectionHeader';

const AnimatedCard = memo(({ children, delay = 0, className = '', ...props }) => {
  const { ref, inView } = useIntersectionObserver();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: APP_CONFIG.ANIMATION.DURATION.NORMAL, delay }}
      className={`animated-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
});

AnimatedCard.displayName = 'AnimatedCard';

// ==========================================================================
// COMPONENTES DE FORMULÁRIO
// ==========================================================================

const Input = memo(({ 
  label, 
  error, 
  icon: IconName,
  type = 'text',
  id,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  ...props 
}) => {
  const inputId = id || name;

  return (
    <div className={`form-group ${error ? 'error' : ''}`}>
      {label && <label htmlFor={inputId}>{label}{required && <span className="required">*</span>}</label>}
      <div className="input-wrapper">
        {IconName && <Icon name={IconName} className="input-icon" />}
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={error ? 'error' : ''}
          {...props}
        />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';

const Textarea = memo(({ 
  label, 
  error,
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  ...props 
}) => {
  const inputId = id || name;

  return (
    <div className={`form-group ${error ? 'error' : ''}`}>
      {label && <label htmlFor={inputId}>{label}{required && <span className="required">*</span>}</label>}
      <textarea
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        className={error ? 'error' : ''}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

// ==========================================================================
// COMPONENTES DE SEÇÃO
// ==========================================================================

const VideoHero = memo(() => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);
  const controlsTimer = useRef(null);

  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 500], [0, 200]), APP_CONFIG.ANIMATION.SPRING);
  const opacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]), APP_CONFIG.ANIMATION.SPRING);

  const { displayText } = useTypewriter('Inteligência Artificial para Logística Inteligente', 70);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      isPlaying ? videoRef.current.pause() : videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    return () => clearTimeout(controlsTimer.current);
  }, []);

  const stats = useMemo(() => [
    { value: APP_CONFIG.METRICS.VEHICLES, label: 'Veículos', suffix: '+' },
    { value: APP_CONFIG.METRICS.SATISFACTION, label: 'Satisfação', suffix: '%' },
    { value: APP_CONFIG.METRICS.REDUCTION, label: 'Economia', suffix: '%' }
  ], []);

  return (
    <section className="hero" aria-label="Hero section">
      <div
        className="hero-video"
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
        style={{
          position: 'relative',
          height: '80vh',
          minHeight: '560px',
          backgroundImage: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 100%)',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          overflow: 'hidden'
        }}
      >
        <video
          ref={videoRef}
          className="hero-video-media"
          autoPlay
          muted={isMuted}
          loop
          playsInline
          poster={heroBanner}
          style={{ position: 'absolute', right: 0, top: 0, width: '55%', height: '100%', objectFit: 'cover', objectPosition: 'right center' }}
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-fleet-of-trucks-driving-on-highway-44225-large.mp4" 
            type="video/mp4" 
          />
        </video>

        <div className="hero-overlay" />

        <AnimatePresence>
          {showControls && (
            <motion.div 
              className="hero-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button onClick={togglePlay} className="hero-control-btn" aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}>
                <Icon name={isPlaying ? 'FaPause' : 'FaPlay'} />
              </button>
              <button onClick={toggleMute} className="hero-control-btn" aria-label={isMuted ? 'Ativar som' : 'Desativar som'}>
                <Icon name={isMuted ? 'FaVolumeMute' : 'FaVolumeUp'} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="hero-content"
          style={{
            y,
            opacity,
            position: 'absolute',
            left: '6%',
            top: '12%',
            maxWidth: '44%',
            textAlign: 'left'
          }}
        >
          <Badge variant="warning" size="lg" icon="FaRocket">
            REVOLUCIONE SUA OPERAÇÃO
          </Badge>

          <h1 className="hero-title">
            {displayText}
            <span className="hero-cursor">|</span>
          </h1>

          <p className="hero-description">
            Reduza custos operacionais em até 40% com nossa plataforma de IA preditiva 
            e gestão inteligente de frotas.
          </p>

          <div className="hero-stats">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="hero-stat-value">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <div className="hero-actions">
            <Button variant="primary" size="lg" icon="FaRocket" iconPosition="right">
              Iniciar Demonstração
            </Button>
            <Button variant="outline" size="lg" icon="FaHeadset" iconPosition="right">
              Falar com Especialista
            </Button>
          </div>
        </motion.div>

        <div className="hero-scroll">
          <div className="hero-scroll-line">
            <div className="hero-scroll-dot" />
          </div>
          <span>Role para explorar</span>
        </div>
      </div>

      <div className="progress-bar" style={{ width: `${useScrollProgress()}%` }} />
    </section>
  );
});

VideoHero.displayName = 'VideoHero';

const MetricsSection = memo(() => {
  const metrics = useMemo(() => [
    { icon: 'FaTruck', value: APP_CONFIG.METRICS.VEHICLES, label: 'Veículos Monitorados', trend: '+12%', color: 'primary' },
    { icon: 'FaRoute', value: APP_CONFIG.METRICS.ROUTES, label: 'Rotas Otimizadas', trend: '+28%', color: 'success' },
    { icon: 'FaDollarSign', value: APP_CONFIG.METRICS.SAVINGS, label: 'Economia Gerada', prefix: 'R$ ', suffix: 'M', trend: '+45%', color: 'warning' },
    { icon: 'FaLeaf', value: APP_CONFIG.METRICS.CO2, label: 'CO₂ Reduzido', suffix: 't', trend: '-32%', color: 'info' }
  ], []);

  return (
    <section className="metrics" aria-label="Métricas">
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className={`metric-card metric-${metric.color}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: APP_CONFIG.ANIMATION.DURATION.NORMAL }}
              viewport={{ once: true }}
            >
              <div className="metric-icon">
                <Icon name={metric.icon} size={28} />
              </div>
              <div className="metric-content">
                <span className="metric-value">
                  <Counter end={metric.value} suffix={metric.suffix} prefix={metric.prefix} />
                </span>
                <span className="metric-label">{metric.label}</span>
              </div>
              <div className={`metric-trend ${metric.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                <Icon name={metric.trend.startsWith('+') ? 'FaArrowUp' : 'FaArrowDown'} size={12} />
                {metric.trend}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

MetricsSection.displayName = 'MetricsSection';

const SolutionsSection = memo(() => {
  const solutions = useMemo(() => [
    {
      icon: 'GiArtificialIntelligence',
      title: 'Otimização com IA',
      description: 'Rotas inteligentes que reduzem custos e aumentam eficiência',
      features: ['Redução de 30% no KM', 'Economia de combustível', 'Desvio automático'],
      color: 'primary'
    },
    {
      icon: 'FaTachometerAlt',
      title: 'Gestão de Frotas',
      description: 'Monitoramento completo em tempo real',
      features: ['Rastreamento GPS', 'Alertas preditivos', 'Manutenção preventiva'],
      color: 'success'
    },
    {
      icon: 'FaChartLine',
      title: 'Análise Preditiva',
      description: 'Previsão precisa de custos e oportunidades',
      features: ['Previsão de gastos', 'Otimização fiscal', 'Detecção de anomalias'],
      color: 'warning'
    },
    {
      icon: 'FaShieldAlt',
      title: 'Segurança',
      description: 'Compliance e proteção de dados',
      features: ['Score de motoristas', 'LGPD compliance', 'Alertas de segurança'],
      color: 'info'
    }
  ], []);

  return (
    <section className="solutions" aria-label="Soluções">
      <div className="container">
        <SectionHeader
          badge="SOLUÇÕES"
          title="Tecnologia que Transforma"
          description="Soluções completas para cada desafio da sua operação logística"
        />

        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <AnimatedCard key={index} delay={index * 0.1} className={`solution-card solution-${solution.color}`}>
              <div className="solution-icon">
                <Icon name={solution.icon} size={32} />
              </div>
              <h3 className="solution-title">{solution.title}</h3>
              <p className="solution-description">{solution.description}</p>
              <ul className="solution-features">
                {solution.features.map((feature, i) => (
                  <li key={i}>
                    <Icon name="FaCheckCircle" size={14} className="feature-icon" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="ghost" size="sm" icon="FaChevronRight" iconPosition="right">
                Saiba mais
              </Button>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
});

SolutionsSection.displayName = 'SolutionsSection';

const ContactSection = memo(() => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    else if (formData.name.length < 3) newErrors.name = 'Mínimo 3 caracteres';
    
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'E-mail inválido';
    
    if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    
    if (!formData.message.trim()) newErrors.message = 'Mensagem é obrigatória';
    else if (formData.message.length < 10) newErrors.message = 'Mínimo 10 caracteres';
    
    return newErrors;
  }, [formData]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  }, [errors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const phoneMask = useCallback((e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    }
    
    return value;
  }, []);

  const handlePhoneChange = useCallback((e) => {
    const masked = phoneMask(e);
    setFormData(prev => ({ ...prev, phone: masked }));
  }, [phoneMask]);

  return (
    <section className="contact" aria-label="Contato">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <Badge variant="primary" icon="FaHeadset">CONTATO</Badge>
            <h2 className="contact-title">Pronto para Transformar?</h2>
            <p className="contact-description">
              Nossos especialistas estão prontos para ajudar você a otimizar sua operação
            </p>

            <div className="contact-details">
              {[
                { icon: 'FaPhone', title: 'Telefone', value: '(11) 3333-4444' },
                { icon: 'FaEnvelope', title: 'Email', value: 'contato@transita.ai' },
                { icon: 'FaMapMarkerAlt', title: 'Matriz', value: 'Av. Paulista, 1000 - São Paulo' }
              ].map((item, i) => (
                <div key={i} className="contact-detail">
                  <div className="detail-icon">
                    <Icon name={item.icon} size={20} />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AnimatedCard className="contact-form">
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  className="form-message success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Icon name="FaCheckCircle" /> Mensagem enviada com sucesso!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div 
                  className="form-message error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Icon name="FaExclamationTriangle" /> Erro ao enviar. Tente novamente.
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} noValidate>
              <Input
                label="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                icon="FaUser"
                placeholder="Seu nome"
                required
              />

              <div className="form-row">
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon="FaEnvelope"
                  placeholder="seu@email.com"
                  required
                />

                <Input
                  label="Telefone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  error={errors.phone}
                  icon="FaPhone"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <Input
                label="Empresa"
                name="company"
                value={formData.company}
                onChange={handleChange}
                icon="FaBuilding"
                placeholder="Sua empresa"
              />

              <Textarea
                label="Mensagem"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                placeholder="Como podemos ajudar?"
                required
              />

              <Button 
                type="submit" 
                variant="primary" 
                size="lg" 
                icon="FaPaperPlane"
                iconPosition="right"
                loading={isSubmitting}
                fullWidth
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
            </form>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

const FAQSection = memo(() => {
  const [openItems, setOpenItems] = useState(new Set());

  const faqs = useMemo(() => [
    {
      id: 1,
      question: 'Como funciona a integração?',
      answer: 'Nossa integração é via API REST, compatível com qualquer sistema. Em até 24h sua frota já está funcionando.'
    },
    {
      id: 2,
      question: 'Qual o prazo para resultados?',
      answer: 'Os primeiros resultados aparecem em 30 dias. Em 90 dias você já terá ROI positivo.'
    },
    {
      id: 3,
      question: 'Preciso de equipamentos especiais?',
      answer: 'Não. Trabalhamos com os sistemas que você já possui. Oferecemos dispositivos GPS sem custo adicional.'
    },
    {
      id: 4,
      question: 'Como funciona a segurança dos dados?',
      answer: 'Utilizamos criptografia AES-256, conformidade com LGPD e backup automático em múltiplas localidades.'
    }
  ], []);

  const toggleItem = useCallback((id) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }, []);

  const openAll = useCallback(() => {
    setOpenItems(new Set(faqs.map(f => f.id)));
  }, [faqs]);

  const closeAll = useCallback(() => {
    setOpenItems(new Set());
  }, []);

  return (
    <section className="faq" aria-label="Perguntas frequentes">
      <div className="container">
        <SectionHeader
          badge="FAQ"
          title="Perguntas Frequentes"
          description="Tire suas dúvidas sobre nossa plataforma"
        />

        <div className="faq-controls">
          <Button variant="ghost" size="sm" icon="FaChevronDown" onClick={openAll}>
            Abrir todas
          </Button>
          <Button variant="ghost" size="sm" icon="FaChevronUp" onClick={closeAll}>
            Fechar todas
          </Button>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="faq-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className={`faq-question ${openItems.has(faq.id) ? 'open' : ''}`}
                onClick={() => toggleItem(faq.id)}
                aria-expanded={openItems.has(faq.id)}
              >
                <span>{faq.question}</span>
                <Icon 
                  name="FaChevronDown" 
                  className={`faq-chevron ${openItems.has(faq.id) ? 'rotated' : ''}`} 
                />
              </button>
              
              <AnimatePresence>
                {openItems.has(faq.id) && (
                  <motion.div
                    className="faq-answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';

const NewsletterSection = memo(() => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
    setIsSubmitting(false);
    setTimeout(() => setStatus(null), 3000);
  }, []);

  return (
    <section className="newsletter" aria-label="Newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h3>Fique por dentro das novidades</h3>
          <p>Receba dicas e cases de sucesso diretamente no seu email</p>

          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="newsletter-input-group">
              <Icon name="FaEnvelope" className="input-icon" />
              <input
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <Button 
                type="submit" 
                variant="primary" 
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                Inscrever-se
              </Button>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.p 
                  className="newsletter-message success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Icon name="FaCheckCircle" /> Inscrição realizada com sucesso!
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
});

NewsletterSection.displayName = 'NewsletterSection';

const ScrollToTop = memo(() => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Voltar ao topo"
        >
          <Icon name="FaChevronUp" size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
});

ScrollToTop.displayName = 'ScrollToTop';

// ==========================================================================
// COMPONENTE PRINCIPAL
// ==========================================================================

const TransitaAI = () => {
  return (
    <div className="app">
      <a href="#main" className="skip-link">Pular para o conteúdo principal</a>

      <Tour tourId="home" />

      <main id="main">
        <VideoHero />
        <MetricsSection />
        <SolutionsSection />
        <ContactSection />
        <FAQSection />
        <NewsletterSection />
      </main>

      <ScrollToTop />
    </div>
  );
};

export default memo(TransitaAI);