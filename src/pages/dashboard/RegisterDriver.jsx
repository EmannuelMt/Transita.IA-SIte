import React, { useState } from 'react';
import './RegisterDriver.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  User, 
  CreditCard, 
  FileText, 
  Phone, 
  Mail, 
  Calendar, 
  ShieldCheck, 
  Upload,
  Save,
  Truck,
  Briefcase,
  Edit2,
  Trash2,
  X,
  Eye,
  Clock,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterDriver = () => {
  const [drivers, setDrivers] = useState([
    {
      id: 'DRV-001',
      name: 'Ricardo Oliveira',
      email: 'ricardo@email.com',
      phone: '(11) 98765-4321',
      cnh: '12345678901',
      cnhCategory: 'E',
      experience: '10',
      birthDate: '1985-05-15',
      address: 'Rua das Flores, 123',
      vehicleType: 'Caminhão Pesado',
      registeredBy: 'Admin Transita',
      registrationDate: '2023-10-15',
      registrationTime: '14:30',
      registrationYear: '2023'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnh: '',
    cnhCategory: 'E',
    experience: '',
    birthDate: '',
    address: '',
    vehicleType: 'Caminhão Pesado'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [viewingDriver, setViewingDriver] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (driver) => {
    if (driver) {
      setEditingDriver(driver);
      setFormData(driver);
    } else {
      setEditingDriver(null);
      setFormData({
        name: '', email: '', phone: '', cnh: '', cnhCategory: 'E',
        experience: '', birthDate: '', address: '', vehicleType: 'Caminhão Pesado'
      });
    }
    setIsModalOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    
    if (editingDriver) {
      setDrivers(prev => prev.map(d => d.id === editingDriver.id ? { ...d, ...formData } : d));
      toast.success('Motorista atualizado com sucesso!');
    } else {
      const newDriver = {
        ...formData,
        id: `DRV-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        registeredBy: 'Admin Transita',
        registrationDate: now.toISOString().split('T')[0],
        registrationTime: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        registrationYear: now.getFullYear().toString()
      };
      setDrivers(prev => [newDriver, ...prev]);
      toast.success('Motorista registrado com sucesso!');
    }
    setIsModalOpen(false);
  };
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja remover este motorista?')) {
      setDrivers(prev => prev.filter(d => d.id !== id));
      toast.success('Motorista removido com sucesso!');
    }
  };

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.cnh.includes(searchTerm)
  );

  return (
    <div className="register-driver-root space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Motoristas</h1>
          <p className="text-slate-500">Gerencie os condutores da sua frota operacional.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
        >
          <UserPlus size={18} />
          Novo Motorista
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <Search className="text-slate-400 ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome, CNH ou placa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <div className="bg-primary-600 p-4 rounded-2xl shadow-lg text-white flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-primary-100 uppercase">Total</p>
            <p className="text-2xl font-bold">{drivers.length}</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Truck size={20} />
          </div>
        </div>
      </div>

      {/* Drivers List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Motorista</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">CNH / Categoria</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Registro</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Registrado por</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center font-bold">
                        {driver.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{driver.name}</p>
                        <p className="text-xs text-slate-500">{driver.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-slate-700">{driver.cnh}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md uppercase">Cat. {driver.cnhCategory}</span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-sm text-slate-700 font-medium">
                        <Calendar size={14} className="text-slate-400" />
                        {driver.registrationDate}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock size={12} />
                        {driver.registrationTime} ({driver.registrationYear})
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm text-slate-600">{driver.registeredBy}</p>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewingDriver(driver)} className="p-2 text-slate-400 hover:text-primary-600">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(driver)} className="p-2 text-slate-400 hover:text-primary-600">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(driver.id)} className="p-2 text-slate-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] w-full max-w-4xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingDriver ? 'Editar Motorista' : 'Registrar Novo Motorista'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Personal Info */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                      <User size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Dados Pessoais</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Ex: Ricardo Oliveira"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">E-mail</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="ricardo@email.com"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="(11) 98765-4321"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Data de Nascimento</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="date" 
                          required
                          value={formData.birthDate}
                          onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Professional Info */}
                <section className="pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                      <Briefcase size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Dados Profissionais</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Nº da CNH</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="text" 
                          required
                          value={formData.cnh}
                          onChange={(e) => setFormData({...formData, cnh: e.target.value})}
                          placeholder="00000000000"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Categoria CNH</label>
                      <select 
                        value={formData.cnhCategory}
                        onChange={(e) => setFormData({...formData, cnhCategory: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                      >
                        <option value="B">B (Carro)</option>
                        <option value="C">C (Caminhão Pequeno)</option>
                        <option value="D">D (Ônibus)</option>
                        <option value="E">E (Caminhão Pesado/Articulado)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Anos de Experiência</label>
                      <input 
                        type="number" 
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        placeholder="Ex: 5"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Tipo de Veículo Preferencial</label>
                      <div className="relative">
                        <Truck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select 
                          value={formData.vehicleType}
                          onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                        >
                          <option>Caminhão Pesado</option>
                          <option>VUC</option>
                          <option>Carreta</option>
                          <option>Van</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="pt-6 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 text-slate-600 font-bold hover:text-slate-900"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                  >
                    {editingDriver ? 'Salvar Alterações' : 'Registrar Motorista'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {viewingDriver && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-8 bg-primary-600 text-white flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{viewingDriver.name}</h2>
                  <p className="text-primary-100 text-sm">{viewingDriver.id}</p>
                </div>
                <button onClick={() => setViewingDriver(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">CNH</p>
                    <p className="text-sm font-bold text-slate-900">{viewingDriver.cnh} (Cat. {viewingDriver.cnhCategory})</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Experiência</p>
                    <p className="text-sm font-bold text-slate-900">{viewingDriver.experience} anos</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">E-mail</p>
                    <p className="text-sm text-slate-700">{viewingDriver.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Telefone</p>
                    <p className="text-sm text-slate-700">{viewingDriver.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Registro</p>
                    <p className="text-sm text-slate-700">
                      Registrado por <span className="font-bold">{viewingDriver.registeredBy}</span> em {viewingDriver.registrationDate} às {viewingDriver.registrationTime}
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex gap-4">
                  <button 
                    onClick={() => {
                      handleOpenModal(viewingDriver);
                      setViewingDriver(null);
                    }}
                    className="flex-grow py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => {
                      handleDelete(viewingDriver.id);
                      setViewingDriver(null);
                    }}
                    className="flex-grow py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterDriver;