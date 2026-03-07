import React, { useState } from 'react';
import './Routes.css';
import { motion } from 'motion/react';
import { 
  Navigation, 
  Map as MapIcon, 
  Plus, 
  Search, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  Maximize2,
  Layers,
  Zap
} from 'lucide-react';

const Routes = () => {
  const [activeTab, setActiveTab] = useState('active');

  const routes = [
    { id: 'R-2045', driver: 'Ricardo Oliveira', vehicle: 'V-001', stops: 12, status: 'Em Progresso', progress: 65, eta: '14:30', efficiency: '+18%' },
    { id: 'R-2046', driver: 'Juliana Lima', vehicle: 'V-004', stops: 8, status: 'Otimizada', progress: 0, eta: 'Amanhã, 08:00', efficiency: '+22%' },
    { id: 'R-2047', driver: 'Marcos Souza', vehicle: 'V-005', stops: 15, status: 'Em Progresso', progress: 30, eta: '16:45', efficiency: '+15%' },
    { id: 'R-2048', driver: 'Ana Paula', vehicle: 'V-002', stops: 6, status: 'Pendente', progress: 0, eta: 'Aguardando', efficiency: '+12%' },
  ];

  return (
    <div className="routes-root h-full flex flex-col space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Otimização de Rotas</h1>
          <p className="text-slate-500">Planeje e monitore suas rotas com inteligência artificial.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
          <Zap size={18} />
          Otimizar Novas Rotas
        </button>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        
        {/* Left Column: Route List */}
        <div className="lg:col-span-1 flex flex-col space-y-6 min-h-0">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col min-h-0">
            <div className="p-6 border-b border-slate-50">
              <div className="flex bg-slate-50 p-1 rounded-xl mb-6">
                {['active', 'planned', 'history'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-grow py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      activeTab === tab ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {tab === 'active' ? 'Ativas' : tab === 'planned' ? 'Planejadas' : 'Histórico'}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Buscar rota..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {routes.map((route) => (
                <div key={route.id} className="p-4 rounded-2xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900">{route.id}</h3>
                      <p className="text-xs text-slate-500">{route.driver} • {route.vehicle}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                      route.status === 'Em Progresso' ? 'bg-blue-100 text-blue-700' : 
                      route.status === 'Otimizada' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {route.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase mb-3">
                    <span className="flex items-center gap-1"><MapIcon size={12} /> {route.stops} Paradas</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> ETA: {route.eta}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Progresso</span>
                      <span className="text-primary-600">{route.progress}%</span>
                    </div>
                    <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${route.progress}%` }}
                        className="h-full bg-primary-600 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full w-fit">
                    <Zap size={10} fill="currentColor" />
                    Economia IA: {route.efficiency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Map View */}
        <div className="lg:col-span-2 flex flex-col space-y-6 min-h-0">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex-grow relative overflow-hidden group">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 bg-slate-100">
              <img 
                src="https://picsum.photos/seed/map/1200/800?grayscale" 
                alt="Map" 
                className="w-full h-full object-cover opacity-30"
                referrerPolicy="no-referrer"
              />
              {/* Simulated Route Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.path 
                  d="M100,200 L300,150 L500,300 L700,200 L900,400" 
                  stroke="#3b82f6" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeDasharray="10,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                />
                <circle cx="100" cy="200" r="6" fill="#3b82f6" />
                <circle cx="300" cy="150" r="6" fill="#3b82f6" />
                <circle cx="500" cy="300" r="6" fill="#3b82f6" />
                <circle cx="700" cy="200" r="6" fill="#3b82f6" />
                <circle cx="900" cy="400" r="6" fill="#ef4444" />
              </svg>
            </div>

            {/* Map Controls */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <button className="p-3 bg-white rounded-xl shadow-lg hover:bg-slate-50 transition-all text-slate-600">
                <Maximize2 size={20} />
              </button>
              <button className="p-3 bg-white rounded-xl shadow-lg hover:bg-slate-50 transition-all text-slate-600">
                <Layers size={20} />
              </button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button className="p-3 bg-white rounded-xl shadow-lg hover:bg-slate-50 transition-all text-slate-600 font-bold text-lg">
                +
              </button>
              <button className="p-3 bg-white rounded-xl shadow-lg hover:bg-slate-50 transition-all text-slate-600 font-bold text-lg">
                -
              </button>
            </div>

            {/* Floating Info Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center">
                    <Truck size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">Veículo Selecionado</p>
                    <p className="text-sm font-bold text-slate-900">Scania R450 (V-001)</p>
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-200"></div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Próxima Parada</p>
                  <p className="text-sm font-bold text-slate-900">Rua das Flores, 123 - Campinas</p>
                </div>
              </div>
              <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all text-sm">
                Ver Rota Completa
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Routes;