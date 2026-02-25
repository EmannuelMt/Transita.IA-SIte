// NotFound.jsx
import React from 'react';
import './NotFound.scss';
import notFoundImage from './image.png';

const NotFound = () => {
  const go = (url) => (window.location.href = url);
  const goBack = () => window.history.back();

  return (
    <div className="notfound-page">
      <div className="container">
        <header className="site-header">
          <div className="brand">
            <div className="brand-badge">404</div>
            <div className="brand-text">
              <strong>Transita.IA</strong>
              <span>Logística Inteligente</span>
            </div>
          </div>
        </header>

        <main className="hero">
          <div className="hero-left">
            <h1>Ops — Página não encontrada</h1>
            <p className="lead">
              O recurso solicitado não está disponível. Volte para a aplicação ou
              use as opções abaixo para continuar navegando.
            </p>

            <div className="cta-row">
              <button className="btn primary" onClick={() => go('/')}>Início</button>
              <button className="btn outline" onClick={goBack}>Voltar</button>
              <button className="btn ghost" onClick={() => go('/contato')}>Contato</button>
            </div>

            <div className="meta">
              <div><strong>Código:</strong> 404</div>
              <div><strong>Horário:</strong> {new Date().toLocaleString('pt-BR')}</div>
            </div>
          </div>

          <aside className="hero-right">
            <div className="card truck-card" aria-hidden>
              <img src={notFoundImage} alt="Ilustração logística" className="truck-img" />
            </div>

            <div className="status-card">
              <h4>Status</h4>
              <ul>
                <li><span className="dot up"/> Plataforma: Operacional</li>
                <li><span className="dot down"/> Recurso: Não encontrado</li>
                <li><span className="dot up"/> Rede: Conectada</li>
              </ul>
            </div>
          </aside>
        </main>

        <footer className="site-footer">
          <small>© {new Date().getFullYear()} Transita.IA — Soluções para logística.</small>
        </footer>
      </div>
    </div>
  );
};

export default NotFound;