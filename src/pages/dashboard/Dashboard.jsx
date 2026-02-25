import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiHome } from 'react-icons/fi';
import DashboardSidebar from './DashboardSidebar';
import OverviewSection from './OverviewSection';
import DriversSection from './DriversSection';
import EmployeesSection from './EmployeesSection';
import FinesSection from './FinesSection';
import FinancialSection from './FinancialSection';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [visibleSections, setVisibleSections] = useState({
    overview: true,
    drivers: true,
    employees: true,
    fines: true,
    financial: true,
  });
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Sistema de autenticação desativado
  const handleProfileClick = () => {
    navigate('/profile/company');
  };

  const toggleSectionVisibility = (id) => {
    setVisibleSections((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      // if current activeSection was hidden, switch to first visible
      if (!next[activeSection]) {
        const first = Object.keys(next).find((k) => next[k]);
        if (first) setActiveSection(first);
      }
      return next;
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'drivers':
        return <DriversSection />;
      case 'employees':
        return <EmployeesSection />;
      case 'fines':
        return <FinesSection />;
      case 'financial':
        return <FinancialSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-top-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-header"
        >
          <div className="header-content">
            <div className="header-info">
              <div className="header-icon">
                <FiHome />
              </div>
              <div className="header-text">
                <h1>Dashboard Transita.IA</h1>
                <p>Gerenciamento completo de frota e operações</p>
              </div>
            </div>
            <div className="header-buttons">
                <div style={{position:'relative'}}>
                  <button
                    onClick={() => setShowFilterPanel((s) => !s)}
                    className="btn"
                    title="Filtrar seções"
                  >
                    <span>Filtrar</span>
                  </button>
                  {showFilterPanel && (
                    <div className="filter-panel">
                      <div className="filter-row"><strong>Seções visíveis</strong></div>
                      <label className="filter-row"><input type="checkbox" checked={visibleSections.overview} onChange={() => toggleSectionVisibility('overview')} /> Visão Geral</label>
                      <label className="filter-row"><input type="checkbox" checked={visibleSections.drivers} onChange={() => toggleSectionVisibility('drivers')} /> Motoristas</label>
                      <label className="filter-row"><input type="checkbox" checked={visibleSections.employees} onChange={() => toggleSectionVisibility('employees')} /> Funcionários</label>
                      <label className="filter-row"><input type="checkbox" checked={visibleSections.fines} onChange={() => toggleSectionVisibility('fines')} /> Multas</label>
                      <label className="filter-row"><input type="checkbox" checked={visibleSections.financial} onChange={() => toggleSectionVisibility('financial')} /> Financeiro</label>
                      <div style={{display:'flex',gap:8,marginTop:8,justifyContent:'flex-end'}}>
                        <button className="btn" onClick={() => setShowFilterPanel(false)}>Fechar</button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleProfileClick}
                  className="btn btn-primary"
                >
                  <FiUser />
                  <span>Ver Perfil</span>
                </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="dashboard-main">
        <DashboardSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          availableSections={Object.keys(visibleSections).filter((k) => visibleSections[k])}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="section-wrapper"
        >
          {renderSection()}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;