import React from 'react';
import { FiUsers, FiTruck, FiAlertCircle, FiDollarSign, FiHome } from 'react-icons/fi';
import './DashboardSidebar.css';

const DashboardSidebar = ({ activeSection, setActiveSection, availableSections }) => {
  const menuItems = [
    {
      id: 'overview',
      label: 'Visão Geral',
      icon: FiHome,
      color: '#667eea'
    },
    {
      id: 'drivers',
      label: 'Motoristas',
      icon: FiTruck,
      color: '#f59e0b'
    },
    {
      id: 'employees',
      label: 'Funcionários',
      icon: FiUsers,
      color: '#10b981'
    },
    {
      id: 'fines',
      label: 'Multas',
      icon: FiAlertCircle,
      color: '#ef4444'
    },
    {
      id: 'financial',
      label: 'Financeiro',
      icon: FiDollarSign,
      color: '#3b82f6'
    }
  ];
  const visible = availableSections && availableSections.length > 0
    ? menuItems.filter((m) => availableSections.includes(m.id))
    : menuItems;

  return (
    <div className="dashboard-sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      
      <nav className="sidebar-nav">
        {visible.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              style={{
                '--accent-color': item.color
              }}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {activeSection === item.id && (
                <div className="active-indicator" style={{ backgroundColor: item.color }} />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default DashboardSidebar;
