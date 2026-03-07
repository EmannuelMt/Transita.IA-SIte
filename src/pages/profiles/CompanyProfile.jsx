import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Users, 
  Save,
  Upload,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const CompanyProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: user?.displayName || 'Transita Logística LTDA',
    cnpj: '12.345.678/0001-90',
    email: user?.email || 'contato@transita.ai',
    phone: '(11) 4002-8922',
    website: 'https://transita.ai',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    fleetSize: '42',
    employeeCount: '156',
    industry: 'Logística e Transportes'
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ displayName: formData.companyName, email: formData.email });
    setIsEditing(false);
    toast.success('Perfil da empresa atualizado com sucesso!');
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <img 
                src={user?.photoURL || 'https://ui-avatars.com/api/?name=Company&background=4f46e5&color=fff'} 
                alt="Company Logo" 
                className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-xl"
                referrerPolicy="no-referrer"
              />
              <button className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center">
                <Upload size={20} />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-bold text-slate-900">{formData.companyName}</h1>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Conta Corporativa
                </span>
              </div>
              <p className="text-slate-500 flex items-center gap-2">
                <Building2 size={16} />
                {formData.industry}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              isEditing 
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'
            }`}
          >
            {isEditing ? 'Cancelar' : 'Editar Perfil'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={handleSave} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-8 space-y-8">
                {/* Corporate Data */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                      <FileText size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Dados Cadastrais</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Razão Social</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">CNPJ</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={formData.cnpj}
                        onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-60"
                      />
                    </div>
                  </div>
                </section>

                {/* Contact Info */}
                <section className="pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                      <Mail size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Contato e Localização</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">E-mail Corporativo</label>
                      <input 
                        type="email" 
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-60"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Telefone</label>
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-60"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-slate-700">Endereço Sede</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          disabled={!isEditing}
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {isEditing && (
                  <div className="pt-8 border-t border-slate-100 flex justify-end">
                    <button 
                      type="submit"
                      className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      <Save size={18} />
                      Salvar Alterações
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Security & Compliance */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Segurança e Conformidade</h3>
                </div>
                <button className="text-sm font-bold text-indigo-600 hover:underline">Gerenciar Certificados</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Autenticação de 2 Fatores', status: 'Ativado', color: 'text-emerald-600' },
                  { label: 'Criptografia de Dados', status: 'AES-256 Ativo', color: 'text-emerald-600' },
                  { label: 'Logs de Auditoria', status: 'Sincronizado', color: 'text-emerald-600' },
                  { label: 'Conformidade LGPD', status: 'Verificado', color: 'text-emerald-600' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-sm font-medium text-slate-600">{item.label}</span>
                    <span className={`text-[10px] font-bold uppercase ${item.color}`}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            {/* Operational Stats */}
            <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-indigo-200">
              <h3 className="text-lg font-bold mb-6">Resumo Operacional</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Truck size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{formData.fleetSize}</p>
                    <p className="text-xs text-indigo-100 font-medium uppercase tracking-wider">Veículos na Frota</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{formData.employeeCount}</p>
                    <p className="text-xs text-indigo-100 font-medium uppercase tracking-wider">Colaboradores</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-indigo-50 transition-all text-sm">
                    Ver Dashboard Completo
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all text-left group">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Faturamento</p>
                    <p className="text-[10px] text-slate-500">Gerenciar pagamentos</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all text-left group">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Vagas Abertas</p>
                    <p className="text-[10px] text-slate-500">Contratar motoristas</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all text-left group">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Globe size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">API Keys</p>
                    <p className="text-[10px] text-slate-500">Integrações externas</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;