import React from 'react';
import { FiUsers, FiTrendingUp, FiShield, FiMapPin } from 'react-icons/fi';
import './CompanyAbout.css';

const CompanyAbout = () => {
  return (
    <section className="company-about">
      <header className="company-hero">
        <div className="hero-content">
          <h1>Sobre a Transita.IA</h1>
          <p className="lead">Soluções inteligentes para gestão de frotas, multas e operações — usando dados e IA para tomar decisões mais seguras e eficientes.</p>
          <div className="hero-cta">
            <a className="btn-primary" href="#contact">Fale conosco</a>
            <a className="btn-outline" href="#mission">Nossa missão</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="badge">Transita.IA</div>
        </div>
      </header>

      <div className="company-grid">
        <article className="company-card">
          <FiTrendingUp className="card-icon" />
          <div>
            <h3>Crescimento orientado a dados</h3>
            <p>Ajudamos frotas a reduzir custos e riscos com análises preditivas e automações operacionais.</p>
          </div>
        </article>

        <article className="company-card">
          <FiUsers className="card-icon" />
          <div>
            <h3>Equipe especializada</h3>
            <p>Times de engenharia, dados e especialistas em tráfego trabalhando juntos para resultados práticos.</p>
          </div>
        </article>

        <article className="company-card">
          <FiShield className="card-icon" />
          <div>
            <h3>Segurança e conformidade</h3>
            <p>Priorizamos segurança de dados e conformidade legal em todas as nossas soluções.</p>
          </div>
        </article>

        <article className="company-card">
          <FiMapPin className="card-icon" />
          <div>
            <h3>Presença nacional</h3>
            <p>Atuamos com clientes em todo o país, com suporte e integração local sob medida.</p>
          </div>
        </article>
      </div>

      <section className="company-mission" id="mission">
        <div className="mission-content">
          <h2>Nossa missão</h2>
          <p>Transformar operações de mobilidade com inteligência: reduzir acidentes, otimizar custos e tornar a gestão de frotas previsível.</p>
          <ul className="mission-list">
            <li>Monitoramento em tempo real</li>
            <li>Análises preditivas para manutenção</li>
            <li>Automação de processos e notificações</li>
          </ul>
        </div>
        <aside className="mission-stats">
          <div className="stat">
            <strong>+120</strong>
            <span>Clientes</span>
          </div>
          <div className="stat">
            <strong>45k</strong>
            <span>Multas processadas</span>
          </div>
          <div className="stat">
            <strong>98%</strong>
            <span>SLA de atendimento</span>
          </div>
        </aside>
      </section>

      <footer className="company-contact" id="contact">
        <div>
          <h3>Quer melhorar sua gestão de frota?</h3>
          <p>Agende uma demo gratuita e veja como a Transita.IA pode reduzir custos e riscos na sua operação.</p>
        </div>
        <div className="contact-actions">
          <a className="btn-primary" href="mailto:contato@transita.ia">contato@transita.ia</a>
          <a className="btn-outline" href="/contact">Agendar demo</a>
        </div>
      </footer>
    </section>
  );
};

export default CompanyAbout;
