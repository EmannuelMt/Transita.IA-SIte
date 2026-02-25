import React, { useState, useCallback, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiBarChart2,
  FiAlertTriangle,
  FiFileText,
  FiNavigation,
  FiMenu,
  FiHelpCircle,
  FiX,
  FiSearch,
  FiBell,
  FiUser,
  FiSettings,
  FiShield,
  FiLogOut,
  FiZap,
  FiChevronRight,
  FiChevronDown,
  FiTruck,
  FiBriefcase
} from 'react-icons/fi';
import NotificationPanel from '../NotificationPanel/NotificationPanel.jsx';
import './Navbar.css';
import logo from '../../assets/images/Logo/logo.svg';
import TimeClock from '../TimeClock/TimeClock.jsx';
import { useAuth } from '../../context/AuthContext';

const PremiumNavbar = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const q = (searchTerm || '').trim();
      if (!q) return;
      // navega para rota de busca (crie a rota /search se precisar)
      navigate(`/search?q=${encodeURIComponent(q)}`);
      // opcional: fechar menus
      closeAll();
    }
  };

  const isActive = useCallback((path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);
  const closeAll = () => {
    setIsSidebarOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationsOpen(false);
  };

  const navigationItems = [
    { path: '/', label: 'Home', icon: FiHome, description: 'Página inicial do sistema' },
     { path: '/empresa', label: 'Sobre a Empresa', icon: FiNavigation, description: 'Portal corporativo' },
       {path: '/planos', label: 'Planos & Tokens', icon: FiFileText, description: 'Veja nossos planos de assinatura' },
       { path: '/dashboard', label: 'Dashboard', icon: FiBarChart2, description: 'Analytics em tempo real' },
       { path: '/register-driver', label: 'Registrar Motorista', icon: FiTruck, description: 'Adicionar novo motorista à frota' },
       { path: '/employees', label: 'Funcionários', icon: FiBriefcase, description: 'Gestão de funcionários da empresa' },
       { path: '/multas', label: 'Multas', icon: FiAlertTriangle, description: 'Gestão de multas', badge: 'NOVO' },
  ];

  const { user, logout } = useAuth();

  const displayName = user?.displayName || 'Usuário';
  const photoURL = user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=16a34a&color=fff&bold=true`;

  const menuItems = [
   { icon: FiUser, label: 'Meu Perfil', onClick: () => { navigate('/profile'); closeAll(); } },
        { icon: FiFileText, label: 'Planos & Pagamentos', onClick: () => { navigate('/billing'); closeAll(); } },
       { icon: FiTruck, label: 'Meu Operacional', onClick: () => { navigate('/profile/employee'); closeAll(); } },
       { icon: FiBriefcase, label: 'Dados da Empresa', onClick: () => { navigate('/profile/company'); closeAll(); } },
       { icon: FiSettings, label: 'Configurações', onClick: () => { navigate('/settings'); closeAll(); } },
       { icon: FiShield, label: 'Privacidade', onClick: () => { navigate('/privacy'); closeAll(); } },
  ];

  return (
    <>
      {/* Navbar Principal */}
      <header className="premium-navbar">
        <div className="navbar-logo-container">
          <button 
            className="navbar-menu-btn"
            onClick={toggleSidebar}
            aria-label="Abrir menu"
          >
            <FiMenu size={20} />
          </button>
          
          <div className="navbar-brand">
            <Link to="/" className="navbar-logo-link">
              <img src={logo} alt="Transita.IA" className="navbar-logo" />
            </Link>
          </div>
        </div>

        {/* Barra de Pesquisa */}
        <div className="navbar-search-container">
          <div className="navbar-search-wrapper">
            <FiSearch className="navbar-search-icon" size={18} />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="navbar-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>
        </div>

        {/* Ações */}
        <div className="navbar-actions">
          <button className="navbar-tour-btn" aria-label="Ver tutorial" onClick={() => {
            try { localStorage.removeItem('tour_home_seen'); } catch (e) { /* ignore */ }
            window.dispatchEvent(new CustomEvent('transita:runTour:home', { detail: 'run' }));
          }}>
            <FiHelpCircle size={18} />
          </button>
          <div className="navbar-time-clock">
            <TimeClock />
          </div>
          <button className="navbar-notification-btn" aria-label="Notificações" onClick={toggleNotifications} aria-expanded={isNotificationsOpen}>
            <FiBell size={20} />
            <span className="navbar-notification-badge"></span>
          </button>
          
          {user ? (
            <button
              className="navbar-user-btn"
              onClick={toggleUserMenu}
              aria-label="Menu do usuário"
              aria-expanded={isUserMenuOpen}
            >
              <img
                src={photoURL}
                alt={displayName}
                className="navbar-user-avatar"
                onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=16a34a&color=fff`; }}
              />
              <span className="navbar-user-name">{displayName}</span>
              <FiChevronDown className="navbar-user-chevron" size={16} />
            </button>
          ) : (
            <button
              className="navbar-user-btn"
              onClick={() => { navigate('/login'); }}
              aria-label="Entrar"
            >
              <FiUser size={18} />
              <span className="navbar-user-name">Entrar</span>
            </button>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
              className="sidebar-overlay"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="sidebar"
            >
              {/* Cabeçalho */}
              <div className="sidebar-header">
                <div className="sidebar-brand-container">
                    <img src={logo} alt="Transita.IA" className="sidebar-logo-img" />
                    <div>
                      <div className="sidebar-title">Transita.IA</div>
                      <div className="sidebar-subtitle">Premium Fleet</div>
                    </div>
                  </div>
                <button 
                  className="sidebar-close-btn"
                  onClick={closeAll}
                  aria-label="Fechar menu"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="sidebar-content">
                <div className="sidebar-section">
                  <div className="sidebar-section-title">Navegação Principal</div>
                  {navigationItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                      onClick={closeAll}
                    >
                      <div className="nav-item-icon">
                        <item.icon size={18} />
                      </div>
                      <div className="nav-item-content">
                        <div className="nav-item-label">
                          {item.label}
                          {item.badge && (
                            <span className="nav-item-badge">{item.badge}</span>
                          )}
                        </div>
                        <div className="nav-item-description">
                          {item.description}
                        </div>
                      </div>
                      <FiChevronRight className="nav-item-chevron" size={16} />
                    </Link>
                  ))}
                </div>

                {/* Card Premium */}
                <div className="sidebar-premium-card">
                  <FiZap className="sidebar-premium-icon" size={20} />
                  <div className="sidebar-premium-title">Seja Premium</div>
                  <div className="sidebar-premium-description">
                    Acesse mapas em tempo real e relatórios avançados.
                  </div>
                  <button className="sidebar-premium-btn">
                    Upgrade Agora
                  </button>
                </div>
              </div>

              {/* Rodapé */}
              <div className="sidebar-footer">
                <button
                  className="sidebar-logout-btn"
                  onClick={async () => {
                    try { await logout?.(); } catch (e) { /* ignore */ }
                    onLogout?.();
                    navigate('/login');
                    closeAll();
                  }}
                >
                  <FiLogOut size={16} />
                  Sair da Conta
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Menu do Usuário */}
      <AnimatePresence>
        {isUserMenuOpen && (
          <>
            <div 
              className="user-menu-overlay"
              onClick={closeAll}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="user-menu"
            >
              {/* Cabeçalho */}
              <div className="user-menu-header">
                <div className="user-menu-profile">
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName}
                    className="user-menu-avatar"
                  />
                  <div className="user-menu-info">
                    <div className="user-menu-name">{user.displayName}</div>
                    <div className="user-menu-badge">Premium</div>
                  </div>
                </div>
              </div>

              {/* Itens do Menu */}
              <div className="user-menu-items">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className="user-menu-item"
                    onClick={item.onClick}
                  >
                    <item.icon className="user-menu-icon" size={16} />
                    {item.label}
                  </button>
                ))}
                
                <div className="user-menu-divider" />
                
                <button
                  className="user-menu-item danger"
                  onClick={async () => {
                    try { await logout?.(); } catch (e) { /* ignore */ }
                    onLogout?.();
                    closeAll();
                    navigate('/login');
                  }}
                >
                  <FiLogOut className="user-menu-icon" size={16} />
                  Sair
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Painel de Notificações */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <>
            <div className="user-menu-overlay" onClick={closeAll} />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              className="user-menu"
            >
              <NotificationPanel modal />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(PremiumNavbar);