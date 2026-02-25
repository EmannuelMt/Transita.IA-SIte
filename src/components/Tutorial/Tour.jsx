// Tour.jsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import Joyride, { EVENTS, STATUS } from 'react-joyride';
import { FiHelpCircle, FiX, FiSkipForward, FiCheckCircle } from 'react-icons/fi';
import { MdExplore, MdTouchApp } from 'react-icons/md';
import { FaRocket } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Tour.scss';

// Flag para desativar temporariamente o sistema de tutorial
const ENABLE_TOUR = false;

const Tour = ({ 
  steps = [], 
  tourId = 'home',
  autoRun = true,
  showLaunchButton = true,
  onComplete,
  onSkip,
  translations = {
    back: 'Voltar',
    close: 'Fechar',
    last: 'Finalizar',
    next: 'Próximo',
    skip: 'Pular',
    open: 'Abrir tour',
    completed: 'Tour concluído!'
  }
}) => {
  if (!ENABLE_TOUR) return null;
  const storageKey = `tour_${tourId}_seen`;
  const [run, setRun] = useState(false);
  // Inicia como true para que o botão esteja visível por padrão
  const [showLaunch, setShowLaunch] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [tourCompleted, setTourCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [resolvedSteps, setResolvedSteps] = useState([]);
  const [resolving, setResolving] = useState(false);
  const joyrideRef = useRef(null);
  const [inHeader, setInHeader] = useState(false);

  // Detecta mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-run na primeira visita
  useEffect(() => {
    let mounted = true;
    const prepareAndRun = async () => {
      if (!autoRun || !steps.length) return setShowLaunch(true);
      try {
        const seen = localStorage.getItem(storageKey);
        if (!seen) {
          // Espera breve para o DOM montar e resolves seletores
          setTimeout(async () => {
            if (!mounted) return;
            setResolving(true);
            const resolved = await resolveStepsAsync(processedSteps);
            if (!mounted) return;
            setResolvedSteps(resolved);
            setResolving(false);
            setRun(true);
            try { localStorage.setItem(storageKey, 'true'); } catch {}
          }, 800);
        } else {
          setShowLaunch(true);
        }
      } catch (e) {
        console.warn('LocalStorage não disponível:', e);
        setShowLaunch(true);
      }
    };

    prepareAndRun();
    return () => { mounted = false; };
  }, [storageKey, autoRun, steps.length]);

  // Evento customizado para reiniciar tour
  useEffect(() => {
    const handler = (e) => {
      if (e?.detail === 'run') {
        startTour();
      } else if (e?.detail === 'reset') {
        resetTour();
      }
    };

    window.addEventListener(`transita:tour:${tourId}`, handler);
    return () => window.removeEventListener(`transita:tour:${tourId}`, handler);
  }, [tourId]);

  // Detecta se existe um header para posicionar o botão próximo ao timer
  useEffect(() => {
    const update = () => setInHeader(!!document.querySelector('.header'));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const startTour = useCallback(() => {
    const start = async () => {
      setShowLaunch(false);
      setStepIndex(0);
      setTourCompleted(false);
      setResolving(true);
      const resolved = await resolveStepsAsync(processedSteps);
      setResolvedSteps(resolved);
      setResolving(false);
      setRun(true);
      try { localStorage.setItem(storageKey, 'true'); } catch (err) { console.warn('Erro ao salvar no localStorage:', err); }
      window.dispatchEvent(new CustomEvent(`transita:tour:${tourId}:start`));
    };

    start();
  }, [storageKey, tourId]);

  const resetTour = useCallback(() => {
    setRun(false);
    setTimeout(() => {
      setStepIndex(0);
      setTourCompleted(false);
      setRun(true);
    }, 300);
  }, []);

  const stopTour = useCallback(() => {
    setRun(false);
    setShowLaunch(true);
  }, []);

  const handleCallback = useCallback((data) => {
    const { status, type, index, action } = data;

    // Log para debug (remover em produção)
    if (process.env.NODE_ENV === 'development') {
      console.log('Tour callback:', { status, type, index, action });
    }

    // Atualiza índice atual
    if (typeof index === 'number') {
      setStepIndex(index);
    }

    // Tratamento de fim do tour
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      setShowLaunch(true);
      
      if (status === STATUS.FINISHED) {
        setTourCompleted(true);
        setTimeout(() => setTourCompleted(false), 3000);
        
        // Callback de conclusão
        if (onComplete) {
          onComplete();
        }
        
        // Dispara evento de conclusão
        window.dispatchEvent(new CustomEvent(`transita:tour:${tourId}:complete`));
      } else if (status === STATUS.SKIPPED && onSkip) {
        onSkip();
      }
    }

    // Tratamento de tipos específicos
    if (type === EVENTS.TOUR_END) {
      setRun(false);
      setShowLaunch(true);
    }

    // Pausa em dispositivos móveis se necessário
    if (isMobile && action === 'next' && type === 'step:after') {
      // Pequeno delay para mobile
      setTimeout(() => {}, 100);
    }
  }, [isMobile, onComplete, onSkip, tourId]);

  // Processa steps para mobile se necessário
  const processedSteps = steps.map((step, idx) => ({
    ...step,
    // Ajusta posicionamento para mobile
    placement: isMobile ? 'center' : (step.placement || 'auto'),
    // Adiciona delay para mobile
    spotlightClicks: isMobile ? true : (step.spotlightClicks || false),
    // Desabilita beacon se já viu
    disableBeacon: idx > 0 || !autoRun,
  }));

  // Resolve seletores (espera por elementos) para melhorar robustez do tour
  async function resolveStepsAsync(stepsToResolve, timeout = 3000, interval = 150) {
    const waitFor = (selector, ms) => new Promise((res) => {
      const start = Date.now();
      const tick = () => {
        const el = document.querySelector(selector);
        if (el) return res(el);
        if (Date.now() - start > ms) return res(null);
        setTimeout(tick, interval);
      };
      tick();
    });

    const out = [];
    for (const s of stepsToResolve) {
      const stepCopy = { ...s };
      try {
        if (typeof s.target === 'string' && (s.target.startsWith('.') || s.target.startsWith('#'))) {
          const el = await waitFor(s.target, timeout);
          if (el) {
            stepCopy.target = el;
          } else {
            // fallback para centro se elemento não existir
            stepCopy.placement = 'center';
            stepCopy.disableBeacon = true;
            // mantém selector string so que o Joyride não explode
            stepCopy.target = s.target;
          }
        }
      } catch (err) {
        // ignore
      }
      out.push(stepCopy);
    }
    return out;
  }

  // Estilos customizados do Joyride
  const joyrideStyles = {
    options: {
      primaryColor: '#16a34a', // Verde principal
      backgroundColor: '#ffffff',
      textColor: '#0f172a',
      arrowColor: '#ffffff',
      overlayColor: 'rgba(0, 0, 0, 0.5)',
      spotlightShadow: '0 0 15px rgba(22, 163, 74, 0.5)',
      beaconSize: 36,
      zIndex: 10000,
    },
    buttonClose: {
      color: '#64748b',
      fontSize: '20px',
      padding: '8px',
      right: '8px',
      top: '8px',
      '&:hover': {
        color: '#16a34a',
      }
    },
    buttonNext: {
      backgroundColor: '#16a34a',
      color: '#ffffff',
      fontSize: '14px',
      fontWeight: 600,
      padding: '8px 16px',
      borderRadius: '9999px',
      border: 'none',
      '&:hover': {
        backgroundColor: '#0f9d58',
      },
      '&:disabled': {
        backgroundColor: '#94a3b8',
        cursor: 'not-allowed',
      }
    },
    buttonBack: {
      backgroundColor: 'transparent',
      color: '#475569',
      fontSize: '14px',
      fontWeight: 500,
      padding: '8px 16px',
      borderRadius: '9999px',
      border: '1px solid #e2e8f0',
      marginRight: '8px',
      '&:hover': {
        backgroundColor: '#f1f5f9',
        color: '#16a34a',
        borderColor: '#16a34a',
      },
    },
    buttonSkip: {
      backgroundColor: 'transparent',
      color: '#94a3b8',
      fontSize: '14px',
      fontWeight: 500,
      padding: '8px 16px',
      '&:hover': {
        color: '#ef4444',
      },
    },
    tooltip: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    tooltipContainer: {
      textAlign: 'left',
    },
    tooltipTitle: {
      color: '#0f172a',
      fontSize: '18px',
      fontWeight: 700,
      marginBottom: '8px',
    },
    tooltipContent: {
      color: '#475569',
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '16px',
    },
    tooltipFooter: {
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    progress: {
      color: '#94a3b8',
      fontSize: '12px',
    },
  };

  return (
    <>
      <Joyride
        ref={joyrideRef}
        steps={resolvedSteps.length ? resolvedSteps : processedSteps}
        run={run}
        stepIndex={stepIndex}
        continuous
        showSkipButton
        showProgress
        spotlightPadding={10}
        disableOverlayClose
        hideCloseButton={false}
        locale={{
          back: translations.back,
          close: translations.close,
          last: translations.last,
          next: translations.next,
          skip: translations.skip,
        }}
        styles={joyrideStyles}
        callback={handleCallback}
        scrollToFirstStep
        scrollOffset={100}
        disableScrolling={false}
        floaterProps={{
          disableAnimation: false,
          styles: {
            floater: {
              filter: 'drop-shadow(0 20px 25px -5px rgba(0, 0, 0, 0.1))',
            }
          }
        }}
      />

      {/* Botão flutuante para abrir o tour */}
      <AnimatePresence>
        {showLaunchButton && showLaunch && !run && (
          <motion.button
              className={`tour-launch-btn ${inHeader ? 'in-header' : ''}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={startTour}
            aria-label={translations.open}
          >
            <FiHelpCircle />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Toast de conclusão */}
      <AnimatePresence>
        {tourCompleted && (
          <motion.div 
            className="tour-completed-toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <FiCheckCircle />
            <span>{translations.completed}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Steps pré-definidos para diferentes páginas
export const tourSteps = {
  // Tour da página inicial
  home: [
    {
      target: '.header',
      content: 'Esse é o header principal. Aqui você encontra navegação e ações rápidas.',
      title: '📌 Navegação',
      placement: 'bottom',
      disableBeacon: true,
    },
    {
      target: '.header .nav',
      content: 'A navegação principal — use para trocar de seção ou abrir o menu móvel.',
      title: '📚 Menu',
      placement: 'bottom',
    },
    {
      target: '.hero-content h1',
      content: 'Bem-vindo à Transita.IA! Vamos conhecer as principais funcionalidades.',
      title: '👋 Olá!',
      placement: 'bottom',
    },
    {
      target: '.hero-stats',
      content: 'Acompanhe estatísticas em tempo real da sua operação logística.',
      title: '📊 Estatísticas',
      placement: 'top',
    },
    {
      target: '.hero-media .phone-frame',
      content: 'Prévia do aplicativo — clique e explore funcionalidades demonstradas no mockup.',
      title: '📱 Prévia do app',
      placement: 'left'
    },
    {
      target: '.hero-actions .btn-primary',
      content: 'Fale com nossos especialistas para uma demonstração personalizada.',
      title: '💬 Contato',
      placement: 'bottom',
    },
    {
      target: '.features-section',
      content: 'Descubra todas as funcionalidades que vão revolucionar sua logística.',
      title: '⚡ Funcionalidades',
      placement: 'top',
    },
    {
      target: '.about',
      content: 'Conheça nossa história e o time por trás da revolução logística.',
      title: '🎯 Sobre nós',
      placement: 'top',
    },
    {
      target: '.investors-grid',
      content: 'Investidores e parceiros — prova social importante para clientes.',
      title: '🤝 Investidores',
      placement: 'top'
    },
    {
      target: '.team-grid',
      content: 'Conheça o time que constrói a tecnologia.',
      title: '👥 Time',
      placement: 'top'
    },
    {
      target: '.contact',
      content: 'Pronto para transformar sua operação? Entre em contato agora!',
      title: '📝 Comece agora',
      placement: 'top',
    }
  ],

  // Tour da página de produto
  product: [
    {
      target: '.product-header',
      content: 'Conheça nossa plataforma completa de gestão logística.',
      title: '🚀 Plataforma Transita.IA',
      placement: 'bottom',
    },
    {
      target: '.features-grid',
      content: 'Funcionalidades poderosas para otimizar sua operação.',
      title: '⚙️ Funcionalidades',
      placement: 'top',
    },
    {
      target: '.pricing-card',
      content: 'Planos flexíveis que se adaptam ao seu negócio.',
      title: '💰 Preços',
      placement: 'left',
    }
  ],

  // Tour da área do cliente
  dashboard: [
    {
      target: '.dashboard-sidebar',
      content: 'Navegue pelas seções do seu painel de controle.',
      title: '📱 Menu',
      placement: 'right',
    },
    {
      target: '.stats-grid',
      content: 'Acompanhe métricas importantes da sua operação.',
      title: '📈 Métricas',
      placement: 'bottom',
    },
    {
      target: '.recent-activity',
      content: 'Veja as atividades recentes da sua frota.',
      title: '⏱️ Atividades',
      placement: 'top',
    },
    {
      target: '.quick-actions',
      content: 'Ações rápidas para agilizar seu dia a dia.',
      title: '⚡ Ações',
      placement: 'left',
    }
  ]
};

// Hook personalizado para controlar o tour
export const useTour = (tourId) => {
  const startTour = useCallback(() => {
    window.dispatchEvent(new CustomEvent(`transita:tour:${tourId}`, { 
      detail: 'run' 
    }));
  }, [tourId]);

  const resetTour = useCallback(() => {
    try {
      localStorage.removeItem(`tour_${tourId}_seen`);
      window.dispatchEvent(new CustomEvent(`transita:tour:${tourId}`, { 
        detail: 'reset' 
      }));
    } catch (e) {
      console.warn('Erro ao resetar tour:', e);
    }
  }, [tourId]);

  const stopTour = useCallback(() => {
    window.dispatchEvent(new CustomEvent(`transita:tour:${tourId}`, { 
      detail: 'stop' 
    }));
  }, [tourId]);

  return { startTour, resetTour, stopTour };
};

export default Tour;