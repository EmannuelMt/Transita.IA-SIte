import React, { useState } from 'react';
import './Overview.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Truck, 
  TrendingUp, 
  Fuel, 
  Clock, 
  ChevronUp, 
  ChevronDown,
  Navigation,
  AlertCircle,
  Filter,
  Calendar,
  Search,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  Users
} from 'lucide-react';

const data = [
  { name: 'Seg', entregas: 40, economia: 24 },
  { name: 'Ter', entregas: 30, economia: 13 },
  { name: 'Qua', entregas: 20, economia: 98 },
  { name: 'Qui', entregas: 27, economia: 39 },
  { name: 'Sex', entregas: 18, economia: 48 },
  { name: 'Sáb', entregas: 23, economia: 38 },
  { name: 'Dom', entregas: 34, economia: 43 },
];

const pieData = [
  { name: 'Em Rota', value: 45, color: '#3b82f6' },
  { name: 'Ocioso', value: 15, color: '#94a3b8' },
  { name: 'Manutenção', value: 5, color: '#ef4444' },
  { name: 'Concluído', value: 35, color: '#10b981' },
];

const Overview = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'Hoje',
    vehicle: 'Todos',
    driver: 'Todos',
    status: 'Todos'
  });

  const stats = [
    { label: 'Veículos Ativos', value: '42', trend: '+12%', icon: Truck, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Entregas Hoje', value: '156', trend: '+8%', icon: Navigation, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Economia Total', value: 'R$ 2.4k', trend: '+24%', icon: Fuel, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Tempo Médio', value: '42min', trend: '-5%', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const dashboardStats = [
    { label: 'Financeiro (Saldo)', value: 'R$ 12.450,00', icon: DollarSign, color: 'text-emerald-600' },
    { label: 'Multas Pendentes', value: '08', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Motoristas Online', value: '15', icon: Users, color: 'text-primary-600' },
    { label: 'Alertas de Frota', value: '03', icon: AlertCircle, color: 'text-amber-600' },
  ];

  return (
    <div className="overview-root space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visão Geral do Sistema</h1>
          <p className="text-slate-500">Acompanhe o desempenho global da sua operação em tempo real.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-bold transition-all ${showFilters ? 'bg-primary-50 border-primary-200 text-primary-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            <Filter size={18} />
            Filtros
          </button>
          <button className="flex-grow md:flex-grow-0 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
            Exportar Dados
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Período</label>
                <select 
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  <option>Hoje</option>
                  <option>Últimos 7 dias</option>
                  <option>Últimos 30 dias</option>
                  <option>Este Mês</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Veículo</label>
                <select 
                  value={filters.vehicle}
                  onChange={(e) => setFilters({...filters, vehicle: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  <option>Todos</option>
                  <option>Scania R450</option>
                  <option>Volvo FH 540</option>
                  <option>Mercedes Actros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Motorista</label>
                <select 
                  value={filters.driver}
                  onChange={(e) => setFilters({...filters, driver: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  <option>Todos</option>
                  <option>Ricardo Oliveira</option>
                  <option>Ana Paula</option>
                  <option>Carlos Silva</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Status</label>
                <select 
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                >
                  <option>Todos</option>
                  <option>Em Rota</option>
                  <option>Ocioso</option>
                  <option>Manutenção</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend.startsWith('+') ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Dashboard Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded-2xl shadow-xl flex items-center gap-4">
            <div className={`w-10 h-10 bg-white/10 ${stat.color} rounded-xl flex items-center justify-center`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</p>
              <p className="text-lg font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Performance de Entregas</h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600">
              <Calendar size={14} />
              {filters.dateRange}
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEntregas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="entregas" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorEntregas)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Pie Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Status da Frota</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-2xl font-bold text-slate-900">100%</p>
              <p className="text-[10px] text-slate-500 uppercase font-bold">Operacional</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Atividade Recente</h3>
          <div className="space-y-6">
            {[
              { title: 'Entrega Concluída', desc: 'Veículo #42 finalizou rota em Campinas.', time: '10 min atrás', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { title: 'Nova Rota Criada', desc: 'IA otimizou 12 entregas para amanhã.', time: '45 min atrás', icon: Navigation, color: 'text-primary-600', bg: 'bg-primary-50' },
              { title: 'Alerta de Combustível', desc: 'Veículo #18 precisa de abastecimento.', time: '2 horas atrás', icon: Fuel, color: 'text-amber-600', bg: 'bg-amber-50' },
              { title: 'Manutenção Agendada', desc: 'Scania R450 entrará em revisão amanhã.', time: '5 horas atrás', icon: Clock, color: 'text-slate-600', bg: 'bg-slate-50' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-10 h-10 ${activity.bg} ${activity.color} rounded-xl flex items-center justify-center shrink-0`}>
                  <activity.icon size={18} />
                </div>
                <div className="flex-grow">
                  <p className="text-sm font-bold text-slate-900">{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.desc}</p>
                </div>
                <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Alertas Críticos</h3>
          <div className="space-y-4">
            {[
              { title: 'Atraso em Rota #1024', desc: 'Tráfego intenso na Rod. dos Bandeirantes.', type: 'high' },
              { title: 'Falha de Telemetria', desc: 'Veículo #07 perdeu conexão GPS.', type: 'medium' },
              { title: 'Temperatura de Carga', desc: 'Sensor detectou variação no Container #B2.', type: 'high' },
            ].map((alert, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${alert.type === 'high' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'}`}>
                <div className="flex items-center gap-3">
                  <AlertCircle className={alert.type === 'high' ? 'text-red-500' : 'text-amber-500'} size={20} />
                  <div>
                    <p className={`text-sm font-bold ${alert.type === 'high' ? 'text-red-900' : 'text-amber-900'}`}>{alert.title}</p>
                    <p className={`text-xs ${alert.type === 'high' ? 'text-red-700' : 'text-amber-700'}`}>{alert.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all text-sm">
            Ver Central de Alertas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;