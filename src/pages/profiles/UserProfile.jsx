import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Bell, 
  History, 
  Award, 
  Camera,
  Save,
  LogOut,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Manoel Matos',
    email: 'manoelmatos818@gmail.com',
    phone: '+55 (11) 98765-4321',
    location: 'São Paulo, SP',
    role: 'Gerente de Logística',
    avatar: 'https://picsum.photos/seed/user/200/200'
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Perfil atualizado com sucesso!');
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: User },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'activity', label: 'Atividade', icon: History },
    { id: 'achievements', label: 'Conquistas', icon: Award },
  ];

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 flex flex-col items-center border-bottom border-slate-100">
                <div className="relative group">
                  <img 
                    src={userData.avatar} 
                    alt="Avatar" 
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute bottom-0 right-0 p-1.5 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors">
                    <Camera size={14} />
                  </button>
                </div>
                <h2 className="mt-4 text-lg font-bold text-slate-900">{userData.name}</h2>
                <p className="text-sm text-slate-500">{userData.role}</p>
              </div>
              
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === tab.id 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <tab.icon size={18} />
                    {tab.label}
                    {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
                  </button>
                ))}
                <div className="my-2 border-t border-slate-100"></div>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
                  <LogOut size={18} />
                  Sair da Conta
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
            >
              {activeTab === 'general' && (
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Informações Gerais</h3>
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                      >
                        Editar Perfil
                      </button>
                    ) : (
                      <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <Save size={16} />
                        Salvar Alterações
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          disabled={!isEditing}
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Localização</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={userData.location}
                          onChange={(e) => setUserData({...userData, location: e.target.value})}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-10 border-t border-slate-100">
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Estatísticas da Conta</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'Viagens', value: '124' },
                        { label: 'Eficiência', value: '98%' },
                        { label: 'Tokens', value: '2.5k' },
                        { label: 'Nível', value: '12' },
                      ].map((stat, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-2xl text-center">
                          <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-8">
                  <h3 className="text-xl font-bold text-slate-900">Segurança</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div>
                        <p className="font-bold text-slate-900">Autenticação em Duas Etapas</p>
                        <p className="text-sm text-slate-500">Adicione uma camada extra de segurança à sua conta.</p>
                      </div>
                      <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="p-6 border border-slate-200 rounded-2xl space-y-4">
                      <p className="font-bold text-slate-900">Alterar Senha</p>
                      <div className="grid grid-cols-1 gap-4">
                        <input type="password" placeholder="Senha Atual" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                        <input type="password" placeholder="Nova Senha" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                        <input type="password" placeholder="Confirmar Nova Senha" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                      </div>
                      <button className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                        Atualizar Senha
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">Preferências de Notificação</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'Alertas de Rota', desc: 'Receba avisos sobre atrasos ou mudanças nas rotas.' },
                      { title: 'Relatórios Semanais', desc: 'Resumo de desempenho e economia de combustível.' },
                      { title: 'Atualizações de Sistema', desc: 'Novas funcionalidades e melhorias na plataforma.' },
                      { title: 'Mensagens de Suporte', desc: 'Respostas aos seus tickets de atendimento.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                        <div>
                          <p className="font-bold text-slate-900">{item.title}</p>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">Histórico de Login</h3>
                  <div className="space-y-4">
                    {[
                      { device: 'Chrome / MacOS', location: 'São Paulo, Brasil', time: 'Hoje, 14:20', status: 'Atual' },
                      { device: 'App Mobile / iPhone 13', location: 'São Paulo, Brasil', time: 'Ontem, 09:15', status: 'Sucesso' },
                      { device: 'Safari / iPad', location: 'Rio de Janeiro, Brasil', time: '12 Out, 18:45', status: 'Sucesso' },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <History size={20} className="text-slate-400" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{log.device}</p>
                            <p className="text-xs text-slate-500">{log.location} • {log.time}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${log.status === 'Atual' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
                          {log.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-900">Minhas Conquistas</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {[
                      { title: 'Eco-Driver', desc: '1.000km com baixo consumo', icon: '🌱', color: 'bg-emerald-50' },
                      { title: 'Pontual', desc: '50 entregas no horário', icon: '⏱️', color: 'bg-amber-50' },
                      { title: 'Expert', desc: '1 ano de plataforma', icon: '🏆', color: 'bg-primary-50' },
                      { title: 'Seguro', desc: 'Zero infrações no mês', icon: '🛡️', color: 'bg-blue-50' },
                      { title: 'Noturno', desc: '10 viagens à noite', icon: '🌙', color: 'bg-slate-50' },
                      { title: 'Social', desc: 'Indicou 5 amigos', icon: '🤝', color: 'bg-rose-50' },
                    ].map((badge, i) => (
                      <div key={i} className={`${badge.color} p-6 rounded-3xl text-center border border-white shadow-sm hover:scale-105 transition-transform cursor-default`}>
                        <span className="text-4xl mb-3 block">{badge.icon}</span>
                        <p className="font-bold text-slate-900">{badge.title}</p>
                        <p className="text-xs text-slate-500 mt-1">{badge.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;