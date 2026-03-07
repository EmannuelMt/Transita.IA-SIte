import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Zap, 
  Shield, 
  Globe, 
  Cpu, 
  Users, 
  BarChart3, 
  MessageSquare,
  ArrowRight,
  Star
} from 'lucide-react';
import './Planos.css';

const Planos = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal para pequenas frotas e operações locais.',
      price: billingCycle === 'monthly' ? '199' : '159',
      features: [
        'Até 10 veículos',
        'Otimização de rotas básica',
        'App para motoristas',
        'Suporte por e-mail',
        'Relatórios mensais',
      ],
      cta: 'Começar Agora',
      popular: false,
      color: 'indigo'
    },
    {
      name: 'Professional',
      description: 'Para empresas em crescimento que precisam de escala.',
      price: billingCycle === 'monthly' ? '499' : '399',
      features: [
        'Até 50 veículos',
        'IA preditiva de tráfego',
        'Monitoramento em tempo real',
        'Suporte prioritário 24/7',
        'Relatórios personalizados',
        'Integração com ERP',
      ],
      cta: 'Escolher Pro',
      popular: true,
      color: 'indigo'
    },
    {
      name: 'Enterprise',
      description: 'Soluções customizadas para grandes operações globais.',
      price: 'Sob consulta',
      features: [
        'Veículos ilimitados',
        'IA dedicada e customizada',
        'Gerente de conta exclusivo',
        'SLA de 99.9%',
        'Segurança avançada (SSO)',
        'Treinamento on-site',
      ],
      cta: 'Falar com Consultor',
      popular: false,
      color: 'slate'
    }
  ];

  const tokenPacks = [
    { amount: '500', price: 'R$ 49', bonus: '0%' },
    { amount: '2.000', price: 'R$ 149', bonus: '15%' },
    { amount: '10.000', price: 'R$ 599', bonus: '30%' },
  ];

  return (
    <div className="planos-root">
      <div className="container">
        
        {/* Header */}
        <div className="plans-header">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="plans-title"
          >
            Planos que evoluem com sua logística
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="plans-desc"
          >
            Escolha a melhor opção para otimizar sua operação. Economize até 20% no faturamento anual.
          </motion.p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <span className={`billing-label ${billingCycle === 'monthly' ? 'active' : ''}`}>Mensal</span>
            <button onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')} className={`toggle-btn ${billingCycle === 'yearly' ? 'yearly' : 'monthly'}`}>
              <span className="toggle-knob" />
            </button>
            <span className={`billing-label ${billingCycle === 'yearly' ? 'active' : ''}`}>
              Anual <span className="billing-note">(-20%)</span>
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`plan-card ${plan.popular ? 'popular' : ''}`}>
              {plan.popular && (
                <div className="plan-badge"><Star size={12} fill="currentColor" /> MAIS POPULAR</div>
              )}

              <div className="plan-meta">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-desc">{plan.description}</p>
              </div>

              <div className="plan-price">
                <span className="currency">R$</span>
                <span className="amount">{plan.price}</span>
                {plan.price !== 'Sob consulta' && <span className="per">/mês</span>}
              </div>

              <div className="plan-features">
                {plan.features.map((feature, j) => (
                  <div key={j} className="feature-row">
                    <div className="feature-dot"><Check size={12} /></div>
                    <div className="feature-text">{feature}</div>
                  </div>
                ))}
              </div>

              <button className={`plan-cta ${plan.popular ? 'popular' : ''}`}>{plan.cta}</button>
            </motion.div>
          ))}
        </div>

        {/* Token Packages */}
        <div className="tokens-section">
          <div className="tokens-inner">
            <div className="tokens-left">
              <div className="tag">CRÉDITOS DE IA</div>
              <h2 className="tokens-title">Precisa de mais poder de processamento?</h2>
              <p className="tokens-desc">Nossa IA utiliza tokens para processar otimizações complexas e previsões. Adquira pacotes adicionais conforme sua necessidade, sem compromisso mensal.</p>
              <div className="tokens-features">
                <div>Validade ilimitada</div>
                <div>Uso flexível</div>
              </div>
            </div>

            <div className="tokens-grid">
              {tokenPacks.map((pack, i) => (
                <div key={i} className="token-pack">
                  <p className="token-label">Pacote</p>
                  <p className="token-amount">{pack.amount}</p>
                  <p className="token-type">Tokens</p>
                  <div className="token-divider" />
                  <p className="token-price">{pack.price}</p>
                  {pack.bonus !== '0%' && <p className="token-bonus">+{pack.bonus} BÔNUS</p>}
                  <button className="token-cta">Comprar</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="plans-faq">
          <h2 className="faq-title">Ainda tem dúvidas?</h2>
          <div className="faq-actions">
            <button className="btn-outline icon-left"><MessageSquare size={18} />Falar com Vendas</button>
            <button className="btn-outline icon-right">Ver FAQ Completo<ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planos;