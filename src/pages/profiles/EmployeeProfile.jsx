import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Star, 
  TrendingUp, 
  Shield, 
  Calendar, 
  Navigation,
  CheckCircle2,
  AlertCircle,
  Play,
  Square
} from 'lucide-react';
import toast from 'react-hot-toast';

const EmployeeProfile = () => {
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [shiftTime, setShiftTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isShiftActive) {
      interval = setInterval(() => {
        setShiftTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isShiftActive]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleToggleShift = () => {
    if (!isShiftActive) {
      setIsShiftActive(true);
      toast.success('Turno iniciado!');
    } else {
      setIsShiftActive(false);
      toast.success(`Turno finalizado! Duração: ${formatTime(shiftTime)}`);
      setShiftTime(0);
    }
  };

  const stats = [
    { label: 'Eficiência', value: '94%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Segurança', value: '98/100', icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pontualidade', value: '99%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Avaliação', value: '4.9', icon: Star, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  const recentTrips = [
    { id: 'T-1024', from: 'CD São Paulo', to: 'Campinas, SP', date: 'Hoje, 08:30', status: 'Concluído', distance: '98km' },
    { id: 'T-1023', from: 'CD São Paulo', to: 'Santos, SP', date: 'Ontem, 14:20', status: 'Concluído', distance: '72km' },
    { id: 'T-1022', from: 'CD São Paulo', to: 'Guarulhos, SP', date: 'Ontem, 09:15', status: 'Concluído', distance: '25km' },
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Profile Info */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/driver/200/200" 
                alt="Driver" 
                className="w-32 h-32 rounded-3xl object-cover shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center ${isShiftActive ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">Ricardo Oliveira</h1>
                <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider">Motorista Senior</span>
              </div>
              <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mb-4">
                <Truck size={16} />
                Placa: ABC-1234 • Scania R450
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                  <MapPin size={16} className="text-red-500" />
                  Base: São Paulo, SP
                </div>
                <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                  <Calendar size={16} className="text-indigo-500" />
                  Desde: Jan 2022
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-3xl border border-slate-100 min-w-[200px]">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tempo de Turno</p>
              <p className="text-3xl font-mono font-bold text-slate-900">{formatTime(shiftTime)}</p>
              <button 
                onClick={handleToggleShift}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  isShiftActive 
                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                }`}
              >
                {isShiftActive ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                {isShiftActive ? 'Finalizar Turno' : 'Iniciar Turno'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon size={20} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Trips */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Viagens Recentes</h2>
                <button className="text-sm font-bold text-indigo-600 hover:underline">Ver todas</button>
              </div>
              <div className="space-y-4">
                {recentTrips.map((trip) => (
                  <div key={trip.id} className="group p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                          <Navigation size={20} className="text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{trip.from} → {trip.to}</p>
                          <p className="text-xs text-slate-500">{trip.date} • {trip.distance}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          <CheckCircle2 size={12} />
                          {trip.status}
                        </span>
                        <p className="text-sm font-bold text-slate-900">{trip.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Performance Card */}
            <section className="bg-slate-900 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-6">Desempenho Semanal</h3>
                <div className="space-y-6">
                  {[
                    { label: 'Economia de Combustível', value: 85 },
                    { label: 'Segurança na Direção', value: 92 },
                    { label: 'Tempo em Rota', value: 78 },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className="h-full bg-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3 text-sm text-indigo-300">
                    <AlertCircle size={18} />
                    <span>Você está no TOP 5% da frota este mês!</span>
                  </div>
                </div>
              </div>
              {/* Decorative Background */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl"></div>
            </section>

            {/* Achievements */}
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Conquistas</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: '🏆', label: 'Expert' },
                  { icon: '🌱', label: 'Eco' },
                  { icon: '⏱️', label: 'Fast' },
                  { icon: '🛡️', label: 'Safe' },
                  { icon: '🌙', label: 'Night' },
                  { icon: '🤝', label: 'Team' },
                ].map((badge, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-slate-100">
                      {badge.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{badge.label}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition-all text-sm">
                Ver Todas as Medalhas
              </button>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;