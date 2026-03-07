import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Plus, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  ArrowUpRight,
  Trash2,
  Edit2
} from 'lucide-react';
import toast from 'react-hot-toast';
import './Billing.css';

const Billing = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
    { id: 2, type: 'Mastercard', last4: '8888', expiry: '08/25', isDefault: false },
  ]);

  const invoices = [
    { id: 'INV-001', date: '01 Out, 2023', amount: 'R$ 499,00', status: 'Pago' },
    { id: 'INV-002', date: '01 Set, 2023', amount: 'R$ 499,00', status: 'Pago' },
    { id: 'INV-003', date: '01 Ago, 2023', amount: 'R$ 499,00', status: 'Pago' },
    { id: 'INV-004', date: '01 Jul, 2023', amount: 'R$ 499,00', status: 'Pago' },
  ];

  const handleSetDefault = (id) => {
    setPaymentMethods(paymentMethods.map(pm => ({
      ...pm,
      isDefault: pm.id === id
    })));
    toast.success('Cartão padrão atualizado!');
  };

  const handleRemove = (id) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    toast.success('Cartão removido com sucesso.');
  };

  return (
    <div className="billing-root billing-container">
      <div className="billing-wrapper">
        <header className="billing-header">
          <h1 className="billing-title">Faturamento e Assinatura</h1>
          <p className="billing-subtitle">Gerencie seus métodos de pagamento, planos e histórico de faturas.</p>
        </header>

        <div className="billing-grid">
          {/* Left Column: Plan & Payment */}
          <div className="billing-left">

            {/* Current Plan Card */}
            <section className="billing-card plan-card">
              <div className="plan-header">
                <div>
                  <span className="plan-badge">Plano Atual</span>
                  <h2 className="plan-name">Transita Pro</h2>
                  <p className="plan-next-billing">Faturamento mensal • Próxima cobrança em 01 Nov, 2023</p>
                </div>
                <div className="plan-price">
                  <p className="plan-amount">R$ 499</p>
                  <p className="plan-period">por mês</p>
                </div>
              </div>

              <div className="billing-features-grid">
                {[
                  'Rotas ilimitadas',
                  'Suporte prioritário 24/7',
                  'Dashboard avançado',
                  'Até 50 veículos',
                  'API de integração',
                  'Relatórios personalizados'
                ].map((feature, i) => (
                  <div key={i} className="billing-feature-item">
                    <CheckCircle2 size={16} className="billing-feature-icon" />
                    {feature}
                  </div>
                ))}
              </div>

              <div className="plan-actions">
                <button className="btn-primary">Fazer Upgrade</button>
                <button className="btn-secondary">Cancelar Plano</button>
              </div>

              <div className="plan-footer">
                <div className="plan-warning">
                  <AlertCircle size={16} />
                  <span>Você está usando 85% dos seus tokens mensais.</span>
                </div>
                <button className="plan-link">Comprar mais tokens</button>
              </div>
            </section>

            {/* Payment Methods */}
            <section className="billing-card">
              <div className="card-header">
                <h3 className="card-title">Métodos de Pagamento</h3>
                <button className="btn-add">
                  <Plus size={16} />
                  Adicionar Novo
                </button>
              </div>

              <div className="payment-list">
                {paymentMethods.map((pm) => (
                  <div key={pm.id} className={`payment-method ${pm.isDefault ? 'default' : ''}`}>
                    <div className="payment-left">
                      <div className="pm-icon">
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <div className="pm-meta">
                          <p className="pm-name">{pm.type} terminando em {pm.last4}</p>
                          {pm.isDefault && <span className="pm-badge">Padrão</span>}
                        </div>
                        <p className="pm-expiry">Expira em {pm.expiry}</p>
                      </div>
                    </div>
                    <div className="payment-actions">
                      {!pm.isDefault && (
                        <button onClick={() => handleSetDefault(pm.id)} className="pm-action">
                          <CheckCircle2 size={18} />
                        </button>
                      )}
                      <button className="pm-action"><Edit2 size={18} /></button>
                      <button onClick={() => handleRemove(pm.id)} className="pm-action pm-delete"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: History & Support */}
          <div className="billing-right">
            {/* Invoice History */}
            <section className="billing-card">
              <h3 className="card-title">Histórico de Faturas</h3>
              <div className="invoices-list">
                {invoices.map((inv) => (
                  <div key={inv.id} className="invoice-row">
                    <div>
                      <p className="invoice-id">{inv.id}</p>
                      <p className="invoice-date">{inv.date}</p>
                    </div>
                    <div className="invoice-right">
                      <p className="invoice-amount">{inv.amount}</p>
                      <button className="invoice-download"><Download size={12} /> PDF</button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-view-all">Ver todas as faturas <ArrowUpRight size={14} /></button>
            </section>

            {/* Support Card */}
            <section className="support-card">
              <div className="support-icon"><HelpCircle size={24} /></div>
              <h3 className="support-title">Precisa de ajuda?</h3>
              <p className="support-desc">Dúvidas sobre cobrança ou faturamento? Nossa equipe financeira está pronta para ajudar.</p>
              <button className="support-cta">Falar com Suporte</button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;