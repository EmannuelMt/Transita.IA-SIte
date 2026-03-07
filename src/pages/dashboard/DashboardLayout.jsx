import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Truck, 
  Navigation, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  Menu, 
  X,
  ChevronRight,
  LogOut,
  User,
  AlertTriangle,
  UserPlus,
  Users,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Visão Geral', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Frota', path: '/dashboard/fleet', icon: Truck },
    { name: 'Rotas', path: '/dashboard/routes', icon: Navigation },
    { name: 'Multas', path: '/dashboard/fines', icon: AlertTriangle },
    { name: 'Financeiro', path: '/dashboard/financial', icon: DollarSign },
    { name: 'Motoristas', path: '/dashboard/register-driver', icon: UserPlus },
    { name: 'Funcionários', path: '/dashboard/register-employee', icon: Users },
    { name: 'Relatórios', path: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Avisos', path: '/dashboard/announcements', icon: Bell },
  ];

  return (
    <div className="dashboard-layout flex h-screen bg-slate-50 overflow-hidden">
      
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="dashboard-sidebar bg-slate-900 text-slate-400 flex flex-col z-50 relative"
      >
        <div className="sidebar-header flex items-center gap-3 px-4 py-5">
          <div className="logo-icon bg-primary-600 text-white rounded-lg p-2">
            <LayoutDashboard size={20} />
          </div>
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="logo-text text-white font-bold text-xl tracking-tight whitespace-nowrap"
              >
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav flex-grow px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                location.pathname === item.path 
                  ? 'active bg-primary-600 text-white shadow-lg shadow-primary-600/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className="nav-icon shrink-0" />
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="nav-text text-sm font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {isSidebarOpen && location.pathname === item.path && (
                <ChevronRight size={14} className="nav-chevron ml-auto" />
              )}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="sidebar-user p-4 border-t border-slate-800">
          <div className={`user-card flex items-center gap-3 p-2 rounded-xl bg-slate-800/50 ${!isSidebarOpen ? 'collapsed justify-center' : ''}`}>
            <img 
              src={user?.photoURL || 'https://picsum.photos/seed/user/100/100'} 
              alt="Avatar" 
              className="user-avatar w-8 h-8 rounded-lg object-cover border border-slate-700"
              referrerPolicy="no-referrer"
            />
            {isSidebarOpen && (
              <div className="user-info flex-grow min-w-0">
                <p className="user-name text-xs font-bold text-white truncate">{user?.displayName || 'Manoel Matos'}</p>
                <p className="user-role text-[10px] text-slate-500 truncate">Gerente</p>
              </div>
            )}
            {isSidebarOpen && (
              <button onClick={logout} className="btn-logout p-1.5 text-slate-500 hover:text-red-400 transition-colors">
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-20 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors z-50"
        >
          {isSidebarOpen ? <X size={12} /> : <Menu size={12} />}
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-grow max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar veículos, rotas ou motoristas..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <Link to="/profile" className="flex items-center gap-2 p-1 hover:bg-slate-50 rounded-xl transition-all">
              <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                <User size={18} />
              </div>
              <span className="text-sm font-bold text-slate-700 hidden sm:block">Minha Conta</span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-grow overflow-y-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;