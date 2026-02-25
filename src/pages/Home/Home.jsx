import { useState, useEffect, useRef, Fragment } from 'react';

// Hook personalizado para animação de digitação
import heroBanner from '../../assets/images/Logo/logobannerhero.jpg';
const useTypewriter = (text, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};
import logoBanner from '../../assets/images/Logo/logo.svg';
import Tour from '../../components/Tutorial/Tour.jsx';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Dialog, Disclosure, Tab, Transition, Listbox, Menu } from '@headlessui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut, Radar, Scatter } from 'react-chartjs-2';
import {
  FaRobot, FaTruck, FaRoute, FaChartLine, FaDollarSign,
  FaWrench, FaUserCog, FaBell, FaClock, FaShieldAlt,
  FaMapMarkerAlt, FaGasPump, FaUsers, FaCogs, FaDatabase,
  FaCloud, FaMobileAlt, FaDesktop, FaChartBar, FaFilter,
  FaChevronRight, FaPlay, FaCalendarAlt, FaCheckCircle, FaCheck, FaInfoCircle,
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
  FaTachometerAlt, FaTrafficLight, FaRoute as FaRouteIcon,
  FaExclamationCircle, FaDownload, FaUpload, FaTrash,
  FaEdit, FaCopy, FaShare, FaExternalLinkAlt, FaQrcode,
  FaGlobe, FaKey, FaServer, FaNetworkWired, FaCogs as FaCogsIcon,
  FaPaperPlane, FaRocket, FaTimes
} from 'react-icons/fa';
import {
  MdDashboard, MdLocationOn, MdAnalytics, MdSecurity,
  MdSpeed, MdTrendingUp, MdAttachMoney, MdPeople,
  MdSettings, MdBuild, MdAssessment, MdShowChart,
  MdVerifiedUser, MdPrecisionManufacturing, MdDevices,
  MdCloudQueue, MdDataUsage, MdSecurityUpdateGood,
  MdOutlineSensors, MdOutlineTravelExplore, MdOutlineEco,
  MdCompareArrows, MdArrowForward, MdCheckCircle,
  MdWarning, MdInfo, MdTimeline, MdBarChart,
  MdPieChart, MdTrendingFlat, MdAccountBalance,
  MdCompare, MdOutlineStorage, MdOutlinePolicy,
  MdOutlineNotifications, MdOutlineAccountBalanceWallet,
  MdOutlineLocalShipping, MdOutlineFingerprint
} from 'react-icons/md';
import {
  GiCarWheel, GiMoneyStack, GiPathDistance, GiMechanicGarage,
  GiElectric, GiProgression, GiNetworkBars, GiSpeedometer,
  GiArtificialIntelligence, GiProcessor, GiMechaHead,
  GiPathDistance as GiRoute, GiMoneyStack as GiProfit,
  GiStopwatch, GiPathDistance as GiDistance
} from 'react-icons/gi';
import { SiAuth0, SiRedux } from 'react-icons/si';
import { TbMap2, TbRoute, TbCalculator, TbShieldCheck, TbChartLine } from 'react-icons/tb';
import { IoStatsChart, IoShieldCheckmark, IoTime, IoCloudUploadOutline } from 'react-icons/io5';
import { RiRobot2Line, RiCustomerService2Line, RiSecurePaymentLine } from 'react-icons/ri';
import { BsLightningFill, BsGraphUp, BsShieldCheck, BsClockHistory } from 'react-icons/bs';
import { AiFillSafetyCertificate, AiOutlinePercentage, AiOutlineRocket } from 'react-icons/ai';
import './Home.css';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);

// ==========================================================================
// COMPONENTES REUTILIZÁVEIS
// ==========================================================================

// Componente Badge Premium
const PremiumBadge = ({ text, icon, color = 'blue', variant = 'solid' }) => {
  const variants = {
    solid: `badge-${color}`,
    outline: `badge-outline-${color}`,
    subtle: `badge-subtle-${color}`
  };

  return (
    <div className={`transita-premium-badge ${variants[variant]}`}>
      {icon && <span className="badge-icon">{icon}</span>}
      <span className="badge-text">{text}</span>
    </div>
  );
};

// Componente Counter (reutilizável)
const Counter = ({ end = 0, duration = 1500, decimals = 0, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const target = parseFloat(end) || 0;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            const interval = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCount(Number(target.toFixed(decimals)));
                clearInterval(interval);
              } else {
                setCount(Number(current.toFixed(decimals)));
              }
            }, duration / steps);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration, decimals]);

  const formatted = Number(count).toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <span ref={ref}>
      {formatted}{suffix}
    </span>
  );
};

// Componente Metric Card
const MetricCard = ({ title, value, change, icon, chartData, trend = 'up', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const target = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [isVisible, value]);

  const miniChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true, mode: 'index', intersect: false }
    },
    interaction: { mode: 'index', intersect: false },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      point: { radius: 0, hoverRadius: 4 },
      line: { 
        tension: 0.4,
        borderWidth: 2,
        fill: true
      }
    }
  };

  return (
    <div 
      ref={ref}
      className="transita-metric-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="metric-header">
        <div className="metric-icon">{icon}</div>
        <PremiumBadge text="EM TEMPO REAL" />
      </div>
      
      <div className="metric-content">
        <div className="metric-value">
          {typeof value === 'string' && value.includes('R$') ? 'R$ ' : ''}
          {typeof value === 'string' && value.includes('%') ? count.toFixed(1) + '%' : count.toLocaleString()}
          {typeof value === 'string' && value.includes('h') && !value.includes('R$') && !value.includes('%') ? 'h' : ''}
        </div>
        <div className="metric-title">{title}</div>
      </div>
      
      {chartData && (
        <div className="metric-chart">
          <Line 
            data={chartData}
            options={miniChartOptions}
            height={80}
          />
        </div>
      )}
      
      <div className={`metric-trend trend-${trend}`}>
        {trend === 'up' ? <FaArrowUp /> : <FaArrowDown />}
        <span>{change}</span>
      </div>
    </div>
  );
};

// Componente Video Hero Corrigido
const VideoHero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef(null);

  // Animação baseada em scroll
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 1000], [0, -500])); // Move para cima ao rolar
  const yLogo = useSpring(useTransform(scrollY, [0, 1000], [0, 300])); // Logo move para baixo
  const opacity = useSpring(useTransform(scrollY, [0, 500], [1, 0])); // Fade out

  // Animação de digitação para o título
  const typewriterText = useTypewriter('Inteligência Artificial para Logística Inteligente', 80);

  const handleVideoControl = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="video-hero-container">
      <div
        className="video-background"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.06), rgba(0,0,0,0.06)), url(${heroBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <video
          ref={videoRef}
          className="hero-video"
          style={{ display: 'none' }}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onClick={handleVideoControl}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-city-traffic-at-night-3457-large.mp4" type="video/mp4" />
          Seu navegador não suporta o elemento de vídeo.
        </video>
        
        <div className="video-overlay" style={{ display: 'none' }}>
          <div className="overlay-gradient overlay-top" />
          <div className="overlay-gradient overlay-bottom" />
        </div>

        <div className={`video-controls-overlay ${showControls ? 'visible' : ''}`}>
          <div className="controls-wrapper">
            <button 
              className="control-btn play-pause"
              onClick={handleVideoControl}
              aria-label={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            >
              {isPlaying ? <FaPause /> : <FaPlayCircle />}
            </button>
            
            <button 
              className="control-btn volume"
              onClick={handleVolumeToggle}
              aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>
        </div>
      </div>

      <div className="hero-content hero-container container">
        <motion.div 
          className="hero-left animate-on-scroll"
          style={{ y, opacity }}
        >
          <div className="hero-badge">
            <PremiumBadge 
              text="REVOLUCIONE SUA FROTA" 
              color="orange" 
              variant="solid"
            />
          </div>
          
          <>
            <style>{`#heroTitleInline{display:inline-block!important; background: linear-gradient(90deg, var(--green-900), var(--green-400)) !important; background-size:100% 100% !important; -webkit-background-clip: text !important; background-clip: text !important; -webkit-text-fill-color: transparent !important; color: var(--green-900) !important;` + `} #heroTitleInline .typewriter-cursor{color:var(--green-400) !important;}`}</style>
            <h1 id="heroTitleInline" className="hero-title">
              {typewriterText}
              <span className="typewriter-cursor">|</span>
            </h1>
          </>
          
          <p className="hero-description" style={{ color: '#ffffff' }}>
            Reduza custos em até 40%, otimize rotas com IA preditiva e transforme 
            sua operação logística com tecnologia de ponta.
          </p>
          
          

          {/* hero-features removidas conforme solicitado */}
        </motion.div>

        <motion.div 
          className="hero-right animate-on-scroll"
          style={{ y: useTransform(scrollY, [0, 1000], [0, 300]), opacity }}
        >
          <div className="logo-container">
            <div className="logo-glow" />
            <img src={logoBanner} alt="Transita.IA Logo" className="logo-image" />
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        style={{ opacity: useTransform(scrollY, [0, 200], [1, 0]) }}
      >
        <div className="scroll-line">
          <div className="scroll-dot" />
        </div>
        <span className="scroll-text">Role para explorar</span>
      </motion.div>
    </div>
  );
};

// Greeting banner: mostra Bom dia/Boa tarde/Boa noite + nome da empresa/usuário
const GreetingBanner = ({ fallbackName = 'Transita.IA' }) => {
  const getHour = () => new Date().getHours();
  const hour = getHour();
  let greeting = 'Olá';
  if (hour >= 5 && hour < 12) greeting = 'Bom dia';
  else if (hour >= 12 && hour < 18) greeting = 'Boa tarde';
  else greeting = 'Boa noite';

  // tenta obter nome do usuário logado em várias fontes
  let name = fallbackName;
  try {
    if (window && window.__TRANSTA_USER && window.__TRANSTA_USER.name) name = window.__TRANSTA_USER.name;
    else if (localStorage) {
      const stored = localStorage.getItem('transita_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.name) name = parsed.name;
      }
    }
  } catch (e) {
    // ignore
  }

  return (
    null
  );
};

// ==========================================================================
// DASHBOARD COM GRÁFICOS REAIS
// ==========================================================================

const DashboardInteligente = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('efficiency');
  const [isLive, setIsLive] = useState(true);
  const [selectedChart, setSelectedChart] = useState(null);

  // Dados para Gráfico de Dispersão 1 - Eficiência vs Consumo
  const scatterData1 = {
    datasets: [{
      label: 'Eficiência vs Consumo',
      data: [
        { x: 65, y: 85 }, { x: 78, y: 72 }, { x: 82, y: 68 }, { x: 75, y: 80 },
        { x: 90, y: 65 }, { x: 88, y: 70 }, { x: 95, y: 60 }, { x: 70, y: 90 },
        { x: 85, y: 75 }, { x: 92, y: 55 }, { x: 80, y: 78 }, { x: 88, y: 62 }
      ],
      backgroundColor: 'rgba(51, 133, 255, 0.6)',
      borderColor: 'var(--blue-400)',
      borderWidth: 1
    }]
  };

  const scatterOptions1 = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Eficiência: ${context.parsed.x}%, Consumo: ${context.parsed.y}%`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Eficiência (%)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'var(--text-muted)' }
      },
      y: {
        title: { display: true, text: 'Consumo (%)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'var(--text-muted)' }
      }
    }
  };

  // Dados para Gráfico de Dispersão 2 - Distância vs Tempo
  const scatterData2 = {
    datasets: [{
      label: 'Distância vs Tempo',
      data: [
        { x: 150, y: 2.5 }, { x: 200, y: 3.2 }, { x: 180, y: 2.8 }, { x: 220, y: 3.5 },
        { x: 170, y: 2.9 }, { x: 190, y: 3.1 }, { x: 210, y: 3.3 }, { x: 160, y: 2.7 },
        { x: 230, y: 3.7 }, { x: 140, y: 2.3 }, { x: 195, y: 3.0 }, { x: 175, y: 2.6 }
      ],
      backgroundColor: 'rgba(255, 133, 51, 0.6)',
      borderColor: 'var(--orange-400)',
      borderWidth: 1
    }]
  };

  const scatterOptions2 = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Distância: ${context.parsed.x}km, Tempo: ${context.parsed.y}h`;
          }
        }
      }
    },
    scales: {
      x: {
        title: { display: true, text: 'Distância (km)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'var(--text-muted)' }
      },
      y: {
        title: { display: true, text: 'Tempo (horas)' },
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: 'var(--text-muted)' }
      }
    }
  };

  // Dados para Gráfico de Barras
  const barData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Economia (R$ mil)',
        data: [15, 22, 28, 35, 42, 48],
        backgroundColor: 'rgba(51, 133, 255, 0.6)',
        borderColor: 'var(--blue-400)',
        borderWidth: 1
      },
      {
        label: 'Redução de Custos (%)',
        data: [12, 19, 25, 28, 32, 36],
        backgroundColor: 'rgba(16, 185, 129, 0.6)',
        borderColor: 'var(--green-400)',
        borderWidth: 1
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' }
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' } }
    }
  };

  // Dados para Gráfico de Linhas
  const lineData = {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Eficiência',
        data: [65, 78, 82, 75, 90, 88, 95],
        borderColor: 'var(--blue-400)',
        backgroundColor: 'rgba(51, 133, 255, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Consumo',
        data: [85, 72, 68, 80, 65, 70, 60],
        borderColor: 'var(--orange-400)',
        backgroundColor: 'rgba(255, 133, 51, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        backgroundColor: 'var(--black-800)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-secondary)',
        borderColor: 'var(--blue-500)',
        borderWidth: 1,
        cornerRadius: 8
      }
    },
    scales: {
      x: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'var(--text-muted)' } },
      y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: 'var(--text-muted)' } }
    }
  };

  // Dados para Gráfico de Donuts
  // Resolver cor do fundo do cartão em runtime para passar um valor válido ao canvas
  const _bgCard = (typeof window !== 'undefined')
    ? getComputedStyle(document.documentElement).getPropertyValue('--bg-card').trim() || '#FFFFFF'
    : '#FFFFFF';

  const donutData = {
    labels: ['Combustível', 'Manutenção', 'Multas', 'Pedágios', 'Outros'],
    datasets: [{
      data: [45, 25, 15, 10, 5],
      backgroundColor: [
        getComputedStyle(document.documentElement).getPropertyValue('--blue-400').trim() || '#3B82F6',
        getComputedStyle(document.documentElement).getPropertyValue('--green-400').trim() || '#10B981',
        getComputedStyle(document.documentElement).getPropertyValue('--orange-400').trim() || '#F97316',
        getComputedStyle(document.documentElement).getPropertyValue('--purple-400').trim() || '#8B5CF6',
        getComputedStyle(document.documentElement).getPropertyValue('--yellow-400').trim() || '#F59E0B'
      ],
      borderColor: _bgCard,
      borderWidth: 2
    }]
  };

  // Opções específicas para o Doughnut (evitar círculo escuro no centro)
  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  // Opções expandidas para os gráficos (para o modal)
  const scatterOptions1Expanded = {
    ...scatterOptions1,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      ...scatterOptions1.plugins,
      legend: { display: true, position: 'top' }
    }
  };

  const scatterOptions2Expanded = {
    ...scatterOptions2,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      ...scatterOptions2.plugins,
      legend: { display: true, position: 'top' }
    }
  };

  const barOptionsExpanded = {
    ...barOptions,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      ...barOptions.plugins,
      legend: { display: true, position: 'top' }
    }
  };

  const lineOptionsExpanded = {
    ...lineOptions,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      ...lineOptions.plugins,
      legend: { display: true, position: 'top' }
    }
  };

  // Componente Modal para Gráfico Expandido
  const ChartModal = ({ chart, onClose }) => {
    if (!chart) return null;

    const getChartComponent = () => {
      switch (chart.type) {
        case 'scatter1':
          return <Scatter data={scatterData1} options={scatterOptions1Expanded} />;
        case 'scatter2':
          return <Scatter data={scatterData2} options={scatterOptions2Expanded} />;
        case 'bar':
          return <Bar data={barData} options={barOptionsExpanded} />;
        case 'line':
          return <Line data={lineData} options={lineOptionsExpanded} />;
        case 'donut':
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <div style={{ width: '400px', height: '400px' }}>
                <Doughnut data={donutData} options={donutOptions} />
              </div>
              <div className="cost-breakdown" style={{ flex: 1 }}>
                {donutData.labels.map((label, index) => (
                  <div key={index} className="cost-item">
                    <div className="cost-label">
                      <div 
                        className="cost-color" 
                        style={{ backgroundColor: donutData.datasets[0].backgroundColor[index] }}
                      />
                      <span>{label}</span>
                    </div>
                    <div className="cost-value">{donutData.datasets[0].data[index]}%</div>
                  </div>
                ))}
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div className="chart-modal-overlay" onClick={onClose}>
        <div className="chart-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="chart-modal-header">
            <h3>{chart.title}</h3>
            <button className="chart-modal-close" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
          <div className="chart-modal-body">
            {getChartComponent()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h2>Gráficos Essenciais</h2>
          <p className="dashboard-subtitle">
            Análise completa dos dados da frota com visualizações avançadas
          </p>
        </div>
        
        <div className="dashboard-controls">
          <div className="listbox-container">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="listbox-button"
            >
              <option value="week">Semanal</option>
              <option value="month">Mensal</option>
              <option value="year">Anual</option>
            </select>
          </div>

          <button 
            className={`transita-btn ${isLive ? 'transita-btn-primary' : 'transita-btn-secondary'}`}
            onClick={() => setIsLive(!isLive)}
          >
            <div className={`live-indicator ${isLive ? 'live' : ''}`} />
            <span>{isLive ? 'AO VIVO' : 'PAUSADO'}</span>
          </button>

          <button className="transita-btn transita-btn-secondary">
            <FaSync />
            <span>Atualizar</span>
          </button>

          <button className="transita-btn transita-btn-primary">
            <FaChartLine />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Gráfico de Dispersão 1 */}
        <div 
          className="dashboard-card clickable"
          onClick={() => setSelectedChart({ type: 'scatter1', title: 'Gráfico de Dispersão - Eficiência vs Consumo' })}
        >
          <div className="card-header">
            <h3>Gráfico de Dispersão</h3>
            <span className="card-period">Eficiência vs Consumo</span>
            <div className="card-click-hint">
              <FaExpandAlt />
              <span>Clique para expandir</span>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-wrapper">
              <Scatter data={scatterData1} options={scatterOptions1} height={250} />
            </div>
          </div>
        </div>

        {/* Gráfico de Dispersão 2 */}
        <div 
          className="dashboard-card clickable"
          onClick={() => setSelectedChart({ type: 'scatter2', title: 'Gráfico de Dispersão - Distância vs Tempo' })}
        >
          <div className="card-header">
            <h3>Gráfico de Dispersão</h3>
            <span className="card-period">Distância vs Tempo</span>
            <div className="card-click-hint">
              <FaExpandAlt />
              <span>Clique para expandir</span>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-wrapper">
              <Scatter data={scatterData2} options={scatterOptions2} height={250} />
            </div>
          </div>
        </div>

        {/* Gráfico de Barras */}
        <div 
          className="dashboard-card clickable"
          onClick={() => setSelectedChart({ type: 'bar', title: 'Gráfico de Barras - Economia & Redução de Custos' })}
        >
          <div className="card-header">
            <h3>Gráfico de Barras</h3>
            <span className="card-period">Economia & Redução de Custos</span>
            <div className="card-click-hint">
              <FaExpandAlt />
              <span>Clique para expandir</span>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-wrapper">
              <Bar data={barData} options={barOptions} height={250} />
            </div>
          </div>
        </div>

        {/* Gráfico de Linhas */}
        <div 
          className="dashboard-card clickable"
          onClick={() => setSelectedChart({ type: 'line', title: 'Gráfico de Linhas - Desempenho Semanal' })}
        >
          <div className="card-header">
            <h3>Gráfico de Linhas</h3>
            <span className="card-period">Desempenho Semanal</span>
            <div className="card-click-hint">
              <FaExpandAlt />
              <span>Clique para expandir</span>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-wrapper">
              <Line data={lineData} options={lineOptions} height={250} />
            </div>
          </div>
        </div>

        {/* Gráfico de Donuts */}
        <div 
          className="dashboard-card wide clickable"
          onClick={() => setSelectedChart({ type: 'donut', title: 'Gráfico de Donuts - Distribuição de Custos' })}
        >
          <div className="card-header">
            <h3>Gráfico de Donuts</h3>
            <span className="card-period">Distribuição de Custos</span>
            <div className="card-click-hint">
              <FaExpandAlt />
              <span>Clique para expandir</span>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <Doughnut data={donutData} options={donutOptions} height={200} />
            </div>
            <div className="cost-breakdown">
              {donutData.labels.map((label, index) => (
                <div key={index} className="cost-item">
                  <div className="cost-label">
                    <div 
                      className="cost-color" 
                      style={{ backgroundColor: donutData.datasets[0].backgroundColor[index] }}
                    />
                    <span>{label}</span>
                  </div>
                  <div className="cost-value">{donutData.datasets[0].data[index]}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal do Gráfico */}
      <ChartModal 
        chart={selectedChart} 
        onClose={() => setSelectedChart(null)} 
      />
    </div>
  );
};

// ==========================================================================
// COMPONENTE PRINCIPAL
// ==========================================================================

const TransitaAI = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const containerRef = useRef(null);

  // Dados dos planos
  const plansData = {
    essencial: {
      name: 'Essencial',
      monthlyPrice: 49,
      yearlyPrice: 470, // 49 * 12 * 0.8 = 470.4 (20% desconto)
      description: 'Para pequenas frotas iniciantes',
      features: [
        'Até 5 veículos ativos',
        'Rastreamento básico GPS',
        'Relatórios simples',
        'Suporte por email',
        'App móvel básico',
        'Atualizações mensais'
      ]
    },
    profissional: {
      name: 'Profissional',
      monthlyPrice: 99,
      yearlyPrice: 950, // 99 * 12 * 0.8 = 950.4
      description: 'Ideal para empresas em crescimento',
      features: [
        'Até 20 veículos ativos',
        'Rastreamento avançado',
        'Otimização de rotas com IA',
        'Suporte 24/7 prioritário',
        'API completa',
        'Dashboard personalizável',
        'Relatórios avançados',
        'Integrações ilimitadas'
      ],
      popular: true
    },
    empresarial: {
      name: 'Empresarial',
      monthlyPrice: 249,
      yearlyPrice: 2395, // 249 * 12 * 0.8 = 2395.2
      description: 'Solução completa para grandes empresas',
      features: [
        'Frota ilimitada',
        'Todos os recursos premium',
        'Dashboard customizado',
        'Suporte dedicado 24/7',
        'Consultoria estratégica',
        'Treinamentos presenciais',
        'SLA 99.9%',
        'Integração white-label'
      ],
      recommended: true
    }
  };

  // Dados para os gráficos dos MetricCards
  const efficiencyChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      data: [65, 70, 75, 80, 85, 88, 92],
      borderColor: 'var(--blue-400)',
      backgroundColor: 'rgba(51, 133, 255, 0.12)',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointBackgroundColor: 'var(--blue-400)',
      fill: true
    }]
  };

  const fuelChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      data: [85, 82, 78, 75, 72, 70, 68],
      borderColor: 'var(--green-400)',
      backgroundColor: 'rgba(16, 185, 129, 0.12)',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointBackgroundColor: 'var(--green-400)',
      fill: true
    }]
  };

  const timeChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      data: [30, 45, 55, 65, 85, 110, 142],
      borderColor: 'var(--purple-400)',
      backgroundColor: 'rgba(139, 92, 246, 0.12)',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointBackgroundColor: 'var(--purple-400)',
      fill: true
    }]
  };

  const finesChartData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [{
      data: [85, 80, 75, 70, 65, 60, 40],
      borderColor: 'var(--orange-400)',
      backgroundColor: 'rgba(255, 106, 0, 0.12)',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
      pointBackgroundColor: 'var(--orange-400)',
      fill: true
    }]
  };

  // Dados para o FAQ
  const faqItems = [
    {
      title: 'Como funciona a integração?',
      content: 'Nossa integração é feita via API em 24 horas, sem necessidade de hardware adicional. Funcionamos com todos os sistemas existentes.',
      icon: <FaPlug />
    },
    {
      title: 'Qual o tempo para ver resultados?',
      content: 'Primeiros resultados em 30 dias, ROI visível em 90 dias. Oferecemos garantia de resultados.',
      icon: <FaChartLine />
    },
    {
      title: 'Precisa de hardware especial?',
      content: 'Não é obrigatório. Para dados em tempo real, recomendamos dispositivos GPS simples que fornecemos sem custo adicional.',
      icon: <FaTruck />
    },
    {
      title: 'Como é a segurança dos dados?',
      content: 'Criptografia AES-256, conformidade LGPD/GDPR, backup automático em 3 locais, auditorias trimestrais independentes.',
      icon: <FaLock />
    }
  ];

  // Efeito para detectar a seção ativa
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'metrics', 'dashboard', 'journey', 'plans', 'contact', 'testimonials', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ==========================================================================
  // JS PARA ANIMAÇÕES DE SCROLL 
  // ==========================================================================
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Para stagger effects
          if (entry.target.classList.contains('stagger-item')) {
            const items = entry.target.querySelectorAll('.stagger-item');
            items.forEach((item, index) => {
              item.style.setProperty('--delay', `${index * 0.1}s`);
              item.classList.add('visible');
            });
          }
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll, .progressive-reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="transita-ai">
      {/* Tour (react-joyride) - passos básicos da Home */}
      <Tour
        tourId="home"
        steps={[
          { target: '.navbar-menu-btn', content: 'Aqui fica o menu principal do sistema.' },
          { target: '.navbar-search-input', content: 'Pesquise por drivers, rotas e muito mais.' },
          { target: '.navbar-notification-btn', content: 'Notificações importantes aparecerão aqui.' },
          { target: '.transita-btn-primary', content: 'Clique aqui para começar a demonstração.' },
          { target: '.navbar-user-btn', content: 'Acesse seu perfil e configurações.' }
        ]}
      />
      {/* Hero Section */}
      <section id="hero" className="transita-hero-section">
        <VideoHero />
      </section>

      {/* Video Demo Section */}
<section
  id="video-demo"
  className="video-demo-section"
  style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('https://images.unsplash.com/photo-NKr0qBAkU4s?auto=format&fit=crop&w=1800&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <div className="container" style={{ position: 'relative', zIndex: 2 }}>
    <div className="video-demo-content">
      <div className="video-demo-text">
        <h2>Veja Todas as Funcionalidades em Ação</h2>
        <p>Assista a uma demonstração completa de como nossa IA transforma sua operação logística, otimizando rotas, reduzindo custos e aumentando a eficiência da frota.</p>
      </div>
      <div className="video-demo-player">
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/MMyZ9Pu01RI"
            title="Demonstração da IA Logística"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="youtube-video"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Metrics Section */}
      <section id="metrics" className="metrics-section">
        <div className="container">
          <GreetingBanner />
          <div className="section-header">
            <PremiumBadge text="MÉTRICAS EM TEMPO REAL" color="blue" />
            <h2 className="section-title gradient-text">
              Resultados que Impressionam
            </h2>
            <p className="section-description">
              Dados atualizados em tempo real mostram o impacto da Transita.AI na sua operação
            </p>
          </div>
          
          <div className="metrics-grid">
            <MetricCard
              title="Eficiência da Frota"
              value="92%"
              change="+2.4%"
              icon={<MdSpeed />}
              chartData={efficiencyChartData}
              trend="up"
              delay={0}
            />
            <MetricCard
              title="Economia de Combustível"
              value="18%"
              change="+5.1%"
              icon={<FaGasPump />}
              chartData={fuelChartData}
              trend="up"
              delay={150}
            />
            <MetricCard
              title="Tempo Economizado"
              value="142h"
              change="+22%"
              icon={<FaClock />}
              chartData={timeChartData}
              trend="up"
              delay={300}
            />
            <MetricCard
              title="Redução de Multas"
              value="40%"
              change="+15%"
              icon={<FaBell />}
              chartData={finesChartData}
              trend="up"
              delay={450}
            />
          </div>
        </div>
      </section>

      {/* Dashboard Inteligente Section */}
      <section id="dashboard" className="dashboard-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="DASHBOARD INTELIGENTE" color="purple" />
            <h2 className="section-title gradient-text">
              Controle Total em Tempo Real
            </h2>
            <p className="section-description">
              Monitoramento completo da sua frota com análises preditivas, alertas inteligentes 
              e tomada de decisão baseada em dados em tempo real.
            </p>
          </div>
          
          <DashboardInteligente />
        </div>
      </section>

      {/* Nossa Jornada Section */}
      <section id="journey" className="journey-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="NOSSA JORNADA" color="green" />
            <h2 className="section-title gradient-text">
              História & Valores
            </h2>
            <p className="section-description">
              Transformando a logística brasileira com tecnologia de ponta e inovação contínua desde 2018.
            </p>
          </div>
          
          <div className="journey-layout">
            <div className="journey-left">
              <div className="journey-header">
                <div className="journey-logo">
                  <img src={logoBanner} alt="Transita.AI Logo" className="journey-logo-image" />
                </div>
                <div className="journey-text">
                  <p className="journey-intro">
                    Desde 2018, a Transita.AI vem revolucionando o setor logístico brasileiro através da tecnologia de ponta. Nossa missão é simplificar a complexidade das operações logísticas, proporcionando eficiência, redução de custos e sustentabilidade para empresas de todos os portes.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="journey-right">
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">
                    <AiOutlineRocket />
                  </div>
                  <h3 style={{ color: '#000000' }}>Inovação Constante</h3>
                  <p style={{ color: '#000000' }}>Buscamos constantemente novas tecnologias e soluções criativas para superar expectativas.</p>
                </div>
                
                <div className="value-item">
                  <div className="value-icon">
                    <FaHandshake />
                  </div>
                  <h3 style={{ color: '#000000' }}>Parceria Estratégica</h3>
                  <p style={{ color: '#000000' }}>Trabalhamos lado a lado com nossos clientes, construindo relações de longo prazo.</p>
                </div>
                
                <div className="value-item">
                  <div className="value-icon">
                    <FaShieldAlt />
                  </div>
                  <h3 style={{ color: '#000000' }}>Confiança Total</h3>
                  <p style={{ color: '#000000' }}>Segurança, transparência e confiabilidade são a base de todas as nossas relações.</p>
                </div>
                
                <div className="value-item">
                  <div className="value-icon">
                    <FaLeaf />
                  </div>
                  <h3 style={{ color: '#000000' }}>Sustentabilidade</h3>
                  <p style={{ color: '#000000' }}>Compromisso com operações eco-friendly e responsabilidade ambiental em todas as ações.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="timeline-tree">
            <div className="timeline-cards-grid">
              <div className="timeline-card">
                <div className="timeline-year">2018</div>
                <h4>Fundação</h4>
                <p>Criação da Transita.AI com foco em transformar a logística brasileira</p>
              </div>

              <div className="timeline-card">
                <div className="timeline-year">2019</div>
                <h4>Primeiros Clientes</h4>
                <p>Implementação para 10 empresas pioneiras no setor logístico</p>
              </div>

              <div className="timeline-card">
                <div className="timeline-year">2020</div>
                <h4>Expansão Nacional</h4>
                <p>Presença em 5 estados brasileiros e crescimento acelerado</p>
                <div className="timeline-stats">
                  <span>5 estados</span>
                  <span>+100 clientes</span>
                  <span>Investimento série A</span>
                </div>
              </div>

              <div className="timeline-card">
                <div className="timeline-year">2021</div>
                <h4>IA Avançada</h4>
                <p>Implementação de algoritmos de machine learning próprios</p>
              </div>

              <div className="timeline-card">
                <div className="timeline-year">2022</div>
                <h4>Escala Nacional</h4>
                <p>Atendimento em todo território nacional com 100+ colaboradores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      {/* Planos Premium Section */}
      <section id="plans" className="plans-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="PLANOS PREMIUM" color="purple" />
            <h2 className="section-title gradient-text">
              Escolha o Plano Perfeito
            </h2>
            <p className="section-description">
              Soluções que crescem com você, do essencial ao empresarial.
            </p>
          </div>

          <div className="plans-content">
            {/* Toggle Mensal/Anual */}
            <div className="billing-toggle">
              <div className="toggle-options">
                <button
                  className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Mensal
                </button>
                <button
                  className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Anual <span className="discount-badge">-20%</span>
                </button>
              </div>
            </div>

            {/* Planos Grid */}
            <div className="plans-grid">
              {/* Essencial */}
              <div className="plan-card">
                <div className="plan-header">
                  <h3>{plansData.essencial.name}</h3>
                  <div className="plan-price">
                    <span className="currency">R$</span>
                    <span className="amount">
                      {billingCycle === 'monthly'
                        ? plansData.essencial.monthlyPrice
                        : Math.round(plansData.essencial.yearlyPrice / 12)
                      }
                    </span>
                    <span className="period">/{billingCycle === 'monthly' ? 'mês' : 'mês'}</span>
                    {billingCycle === 'yearly' && (
                      <div className="yearly-total">
                        <span className="plan-total">Total anual: R$ {plansData.essencial.yearlyPrice}</span>
                      </div>
                    )}
                  </div>
                  <p className="plan-description">{plansData.essencial.description}</p>
                </div>

                <div className="plan-features">
                  {plansData.essencial.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <FaCheck className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="plan-btn">
                  <span>Começar Agora</span>
                  <FaChevronRight />
                </button>
              </div>

              {/* Profissional - Mais Popular */}
              <div className="plan-card popular">
                <div className="popular-badge">
                  <FaCrown />
                  <span>Mais Popular</span>
                </div>

                <div className="plan-header">
                  <h3>{plansData.profissional.name}</h3>
                  <div className="plan-price">
                    <span className="currency">R$</span>
                    <span className="amount">
                      {billingCycle === 'monthly'
                        ? plansData.profissional.monthlyPrice
                        : Math.round(plansData.profissional.yearlyPrice / 12)
                      }
                    </span>
                    <span className="period">/{billingCycle === 'monthly' ? 'mês' : 'mês'}</span>
                    {billingCycle === 'yearly' && (
                      <div className="yearly-total">
                        <span className="plan-total">Total anual: R$ {plansData.profissional.yearlyPrice}</span>
                      </div>
                    )}
                  </div>
                  <p className="plan-description">{plansData.profissional.description}</p>
                </div>

                <div className="plan-features">
                  {plansData.profissional.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <FaCheck className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="plan-highlights">
                  <div className="highlight-item">
                    <FaClock />
                    <span>30 dias grátis</span>
                  </div>
                  <div className="highlight-item">
                    <FaShieldAlt />
                    <span>Suporte prioritário</span>
                  </div>
                </div>

                <button className="plan-btn primary">
                  <span>Começar Agora</span>
                  <FaChevronRight />
                </button>
              </div>

              {/* Empresarial */}
              <div className="plan-card">
                <div className="recommended-badge">
                  <FaStar />
                  <span>Recomendado</span>
                </div>

                <div className="plan-header">
                  <h3>{plansData.empresarial.name}</h3>
                  <div className="plan-price">
                    <span className="currency">R$</span>
                    <span className="amount">
                      {billingCycle === 'monthly'
                        ? plansData.empresarial.monthlyPrice
                        : Math.round(plansData.empresarial.yearlyPrice / 12)
                      }
                    </span>
                    <span className="period">/{billingCycle === 'monthly' ? 'mês' : 'mês'}</span>
                    {billingCycle === 'yearly' && (
                      <div className="yearly-total">
                        <span className="plan-total">Total anual: R$ {plansData.empresarial.yearlyPrice}</span>
                      </div>
                    )}
                  </div>
                  <p className="plan-description">{plansData.empresarial.description}</p>
                </div>

                <div className="plan-features">
                  {plansData.empresarial.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <FaCheck className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="plan-btn">
                  <span>Começar Agora</span>
                  <FaChevronRight />
                </button>
              </div>
            </div>

            {/* Pacotes de Tokens */}
            <div className="tokens-section">
              <div className="tokens-header">
                <h3>Pacotes de Tokens</h3>
                <p>Recarregue seus créditos de IA para otimização contínua</p>
              </div>

              <div className="tokens-grid">
                {/* Starter Pack */}
                <div className="token-card">
                  <div className="token-header">
                    <div className="token-icon">
                      <FaBolt />
                    </div>
                    <h4>Starter Pack</h4>
                  </div>

                  <div className="token-amount">
                    <span className="amount">1.000</span>
                    <span className="unit">tokens</span>
                  </div>

                  <div className="token-price">
                    <span className="price">R$ 49</span>
                    <span className="per-token">4,9¢/token</span>
                  </div>

                  <div className="token-features">
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Otimização básica</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Relatórios simples</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Validade: 6 meses</span>
                    </div>
                  </div>

                  <button className="token-btn">
                    <span>Comprar</span>
                  </button>
                </div>

                {/* Professional Pack */}
                <div className="token-card popular">
                  <div className="popular-badge">
                    <FaCrown />
                    <span>Mais Vendido</span>
                  </div>

                  <div className="token-header">
                    <div className="token-icon">
                      <FaRocket />
                    </div>
                    <h4>Professional Pack</h4>
                  </div>

                  <div className="token-amount">
                    <span className="amount">5.000</span>
                    <span className="unit">tokens</span>
                  </div>

                  <div className="token-price">
                    <span className="price">R$ 199</span>
                    <span className="per-token">4,0¢/token</span>
                    <span className="savings">Economia de 18%</span>
                  </div>

                  <div className="token-features">
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Otimização avançada</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>IA preditiva</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Relatórios detalhados</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Validade: 12 meses</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Suporte prioritário</span>
                    </div>
                  </div>

                  <button className="token-btn primary">
                    <span>Comprar</span>
                  </button>
                </div>

                {/* Enterprise Pack */}
                <div className="token-card">
                  <div className="token-header">
                    <div className="token-icon">
                      <FaBuilding />
                    </div>
                    <h4>Enterprise Pack</h4>
                  </div>

                  <div className="token-amount">
                    <span className="amount">25.000</span>
                    <span className="unit">tokens</span>
                  </div>

                  <div className="token-price">
                    <span className="price">R$ 799</span>
                    <span className="per-token">3,2¢/token</span>
                    <span className="savings">Economia de 35%</span>
                  </div>

                  <div className="token-features">
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Todos os recursos premium</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>IA avançada customizada</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Consultoria incluída</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Validade: 24 meses</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>Suporte dedicado</span>
                    </div>
                    <div className="token-feature">
                      <FaCheck className="feature-check" />
                      <span>API ilimitada</span>
                    </div>
                  </div>

                  <button className="token-btn">
                    <span>Comprar</span>
                  </button>
                </div>
              </div>

              {/* Token Usage Info */}
              <div className="token-info">
                <div className="info-grid">
                  <div className="info-item">
                    <FaCalculator className="info-icon" />
                    <div className="info-content">
                      <h5>Como Funciona</h5>
                      <p>Cada otimização de rota consome tokens baseado na complexidade. Tokens não utilizados expiram conforme validade do pacote.</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <FaSync className="info-icon" />
                    <div className="info-content">
                      <h5>Recarga Automática</h5>
                      <p>Configure recargas automáticas quando seus tokens estiverem acabando. Nunca fique sem créditos para otimização.</p>
                    </div>
                  </div>

                  <div className="info-item">
                    <FaShieldAlt className="info-icon" />
                    <div className="info-content">
                      <h5>Tokens Seguros</h5>
                      <p>Seus tokens são criptografados e armazenados com segurança. Monitoramento 24/7 contra fraudes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ dos Planos */}
            <div className="plans-faq">
              <h3>Perguntas Frequentes sobre Planos</h3>
              <div className="faq-items">
                <div className="faq-item">
                  <h4>Posso mudar de plano a qualquer momento?</h4>
                  <p>Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor no próximo ciclo de cobrança.</p>
                </div>
                <div className="faq-item">
                  <h4>Existe período de teste?</h4>
                  <p>Oferecemos 30 dias de teste grátis no plano Profissional. Para outros planos, entre em contato conosco.</p>
                </div>
                <div className="faq-item">
                  <h4>Como funciona o suporte?</h4>
                  <p>O suporte varia por plano: email no Essencial, prioritário 24/7 no Profissional, e dedicado no Empresarial.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


{/* Quem Usa, Aprova Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="QUEM USA, APROVA" color="green" />
            <h2 className="section-title gradient-text">
              Confiança de Quem Decide
            </h2>
            <p className="section-description">
              Empresas líderes que transformaram suas operações logísticas com a Transita.AI
            </p>
          </div>

          <div className="testimonials-content">
            {/* Statistics */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number"><Counter end={524} duration={1600} decimals={0} suffix="+" /></div>
                <div className="stat-label">Empresas Atendidas</div>
              </div>
              <div className="stat-card">
                <div className="stat-number"><Counter end={98.7} duration={1600} decimals={1} suffix="%" /></div>
                <div className="stat-label">Satisfação</div>
              </div>
              <div className="stat-card">
                <div className="stat-number"><Counter end={5} duration={1600} decimals={0} suffix="+" /></div>
                <div className="stat-label">Anos no Mercado</div>
              </div>
              <div className="stat-card">
                <div className="stat-number"><Counter end={96} duration={1600} decimals={0} suffix="%" /></div>
                <div className="stat-label">Retenção de Clientes</div>
              </div>
            </div>

            {/* Company Logos */}
            <div className="companies-section">
              <h3>Confiado por líderes do mercado</h3>
              <div className="companies-grid">
                <div className="company-logo">
                  <div className="logo-placeholder">AMBEV</div>
                  <span>Bebidas</span>
                </div>
                <div className="company-logo">
                  <div className="logo-placeholder">VALE</div>
                  <span>Mineração</span>
                </div>
                <div className="company-logo">
                  <div className="logo-placeholder">AMZN</div>
                  <span>E-commerce</span>
                </div>
                <div className="company-logo">
                  <div className="logo-placeholder">MB</div>
                  <span>Automotivo</span>
                </div>
                <div className="company-logo">
                  <div className="logo-placeholder">NEST</div>
                  <span>Alimentos</span>
                </div>
                <div className="company-logo">
                  <div className="logo-placeholder">ULVR</div>
                  <span>Consumer Goods</span>
                </div>
                <div className="company-logo">
                  <div className="logo-placeholder">BRF</div>
                  <span>Alimentos</span>
                </div>
                <div className="company-logo">
                  <div className="logo-placeholder">JBS</div>
                  <span>Alimentos</span>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="testimonial-quote">
                  "Reduzimos 32% dos custos operacionais em apenas 3 meses. A IA identificou rotas 40% mais eficientes."
                </div>

                {/* metric cards removidos conforme solicitado */}

                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>TE</span>
                  </div>
                  <div className="author-info">
                    <div className="author-name">Carlos Lima</div>
                    <div className="author-role">Diretor Logístico</div>
                    <div className="author-company">Transportes Express</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-quote">
                  "A implementação foi surpreendentemente rápida. Em 2 semanas já tínhamos visibilidade completa da frota."
                </div>


                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>LD</span>
                  </div>
                  <div className="author-info">
                    <div className="author-name">Ana Silva</div>
                    <div className="author-role">Gerente de Operações</div>
                    <div className="author-company">LogiDistribuição</div>
                  </div>
                </div>
              </div>

              <div className="testimonial-card">
                <div className="testimonial-quote">
                  "ROI impressionante. Recuperamos o investimento em 45 dias e desde então economizamos R$ 180 mil mensalmente."
                </div>

               

                <div className="testimonial-author">
                  <div className="author-avatar">
                    <span>TC</span>
                  </div>
                  <div className="author-info">
                    <div className="author-name">Roberto Santos</div>
                    <div className="author-role">CEO</div>
                    <div className="author-company">Transporte Cardoso</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fale Conosco Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="FALE CONOSCO" color="green" />
            <h2 className="section-title gradient-text">
              Estamos Prontos para Ajudar
            </h2>
            <p className="section-description">
              Converse com nossos especialistas e transforme sua operação logística hoje mesmo.
            </p>
          </div>

          <div className="contact-content">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h3>Envie uma Mensagem</h3>
                <p>Preencha o formulário abaixo e nossa equipe entrará em contato em até 2 horas úteis.</p>
              </div>

              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Nome Completo *</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Digite seu nome completo"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="company">Empresa</label>
                    <input
                      type="text"
                      id="company"
                      placeholder="Nome da sua empresa"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Telefone *</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Assunto *</label>
                  <select id="subject" required>
                    <option value="">Selecione o assunto</option>
                    <option value="orcamento">Orçamento</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="demonstracao">Demonstração</option>
                    <option value="parceria">Parceria</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensagem *</label>
                  <textarea
                    id="message"
                    placeholder="Descreva sua dúvida, problema ou solicitação..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <div className="form-footer">
                  <p className="privacy-notice">
                    <FaLock className="privacy-icon" />
                    Seus dados estão seguros conosco. Não compartilhamos informações com terceiros.
                  </p>
                  <button type="submit" className="transita-btn transita-btn-primary transita-btn-xl">
                    <span>Enviar Mensagem</span>
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info">
              {/* Units */}
              <div className="contact-units">
                <h3>Nossas Unidades</h3>

                <div className="unit-card">
                  <div className="unit-header">
                    <div className="unit-badge">HQ</div>
                    <h4>São Paulo - Matriz</h4>
                  </div>
                  <div className="unit-address">
                    <FaMapMarkerAlt />
                    <span>Av. Paulista, 1000 - 10º andar<br />Bela Vista, São Paulo - SP</span>
                  </div>
                  <div className="unit-contact">
                    <div className="contact-item">
                      <FaPhone />
                      <span>(11) 3333-4444</span>
                    </div>
                    <div className="contact-item">
                      <FaEnvelope />
                      <span>sp@transita.ai</span>
                    </div>
                    <div className="contact-item">
                      <FaClock />
                      <span>Seg-Sex: 8h às 18h</span>
                    </div>
                  </div>
                </div>

                <div className="unit-card">
                  <div className="unit-header">
                    <div className="unit-badge">FILIAL</div>
                    <h4>Goiás - Anápolis</h4>
                  </div>
                  <div className="unit-address">
                    <FaMapMarkerAlt />
                    <span>Av. Brasil, 500 - Centro<br />Anápolis, Goiás - GO</span>
                  </div>
                  <div className="unit-contact">
                    <div className="contact-item">
                      <FaPhone />
                      <span>(62) 2222-3333</span>
                    </div>
                    <div className="contact-item">
                      <FaEnvelope />
                      <span>go@transita.ai</span>
                    </div>
                    <div className="contact-item">
                      <FaClock />
                      <span>Seg-Sex: 8h às 18h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="contact-social">
                <h3>Conecte-se Conosco</h3>
                <div className="social-links">
                  <a href="#" className="social-link linkedin">
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </a>
                  <a href="#" className="social-link instagram">
                    <FaInstagram />
                    <span>Instagram</span>
                  </a>
                  <a href="#" className="social-link facebook">
                    <FaFacebook />
                    <span>Facebook</span>
                  </a>
                  <a href="#" className="social-link whatsapp">
                    <FaWhatsapp />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Modal de Contato */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="modal-overlay" onClose={() => setIsModalOpen(false)}>
          <div className="modal-container">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="modal-backdrop" onClick={() => setIsModalOpen(false)} />
            </Transition.Child>

            <div className="modal-wrapper">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="modal-panel">
                  <div className="modal-header">
                    <Dialog.Title as="h3" className="modal-title">
                      Agendar Demonstração
                    </Dialog.Title>
                    <button
                      type="button"
                      className="modal-close"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="modal-content">
                    <p>Agende uma demonstração personalizada com nossos especialistas.</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

       {/* FAQ Section */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header">
            <PremiumBadge text="PERGUNTAS FREQUENTES" color="orange" />
            <h2 className="section-title gradient-text">
              Tire suas Dúvidas
            </h2>
            <p className="section-description">
              Respostas para as principais perguntas sobre nossa plataforma
            </p>
          </div>
          
          <div className="faq-content">
            <div className="faq-grid">
              <div className="faq-intro">
                <h3>Como podemos ajudar?</h3>
                <p>Selecionamos as perguntas mais frequentes de nossos clientes para facilitar seu entendimento.</p>
                
                <button 
                  className="transita-btn transita-btn-primary transita-btn-xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span>Falar com Especialista</span>
                  <FaComments />
                </button>
              </div>
              
              <div className="faq-accordion">
                <div className="transita-accordion">
                  {faqItems.map((item, index) => (
                    <div key={index} className="accordion-item">
                      <button className="accordion-button">
                        <div className="accordion-header">
                          <div className="accordion-icon">{item.icon}</div>
                          <span className="accordion-title">{item.title}</span>
                        </div>
                        <FaChevronDown className="accordion-chevron" />
                      </button>
                      <div className="accordion-panel">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default TransitaAI;