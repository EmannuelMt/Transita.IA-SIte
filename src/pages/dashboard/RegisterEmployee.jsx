import React, { useState } from 'react';
import './RegisterEmployee.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserPlus, 
  Users, 
  Briefcase, 
  Building2, 
  Mail, 
  Phone, 
  Calendar, 
  Save,
  CheckCircle2,
  ShieldCheck,
  Edit2,
  Trash2,
  X,
  Eye,
  Search,
  Clock
} from 'lucide-react';
import toast from 'react-hot-toast';

const RegisterEmployee = () => {
  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      name: 'Ana Silva',
      email: 'ana.silva@transita.ai',
      phone: '(11) 99999-8888',
      role: 'Analista de Rotas',
      department: 'Operações',
      startDate: '2023-01-10',
      employeeId: 'TR-1001',
      salary: '4.500,00',
      registeredBy: 'RH Transita',
      registrationDate: '2023-01-10',
      registrationTime: '09:00'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Operador de Logística',
    department: 'Operações',
    startDate: '',
    employeeId: '',
    salary: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = (employee) => {
    if (employee) {
      setEditingEmployee(employee);
      setFormData(employee);
    } else {
      setEditingEmployee(null);
      setFormData({
        name: '', email: '', phone: '', role: 'Operador de Logística',
        department: 'Operações', startDate: '', employeeId: '', salary: ''
      });
    }
    setIsModalOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    
    if (editingEmployee) {
      setEmployees(prev => prev.map(emp => emp.id === editingEmployee.id ? { ...emp, ...formData } : emp));
      toast.success('Funcionário atualizado com sucesso!');
    } else {
      const newEmployee = {
        ...formData,
        id: `EMP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        registeredBy: 'RH Transita',
        registrationDate: now.toISOString().split('T')[0],
        registrationTime: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setEmployees(prev => [newEmployee, ...prev]);
      toast.success('Funcionário registrado com sucesso!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja remover este funcionário?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast.success('Funcionário removido com sucesso!');
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="register-employee-root space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Funcionários</h1>
          <p className="text-slate-500">Cadastre e gerencie os membros da sua equipe.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
        >
          <UserPlus size={18} />
          Novo Funcionário
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <Search className="text-slate-400 ml-2" size={20} />
          <input 
            type="text" 
            placeholder="Buscar por nome, cargo ou matrícula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent border-none focus:ring-0 text-slate-700 placeholder:text-slate-400"
          />
        </div>
        <div className="bg-primary-600 p-4 rounded-2xl shadow-lg text-white flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-primary-100 uppercase">Equipe</p>
            <p className="text-2xl font-bold">{employees.length}</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Employees List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Funcionário</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Cargo / Depto</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Registro</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Registrado por</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center font-bold">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{emp.name}</p>
                        <p className="text-xs text-slate-500">{emp.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-slate-700">{emp.role}</p>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md uppercase">{emp.department}</span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1 text-sm text-slate-700 font-medium">
                        <Calendar size={14} className="text-slate-400" />
                        {emp.registrationDate}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock size={12} />
                        {emp.registrationTime}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm text-slate-600">{emp.registeredBy}</p>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewingEmployee(emp)} className="p-2 text-slate-400 hover:text-primary-600">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(emp)} className="p-2 text-slate-400 hover:text-primary-600">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(emp.id)} className="p-2 text-slate-400 hover:text-red-600">
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
                  {editingEmployee ? 'Editar Funcionário' : 'Registrar Novo Funcionário'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Basic Info */}
                <section>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                      <Users size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Informações Básicas</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Nome Completo</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Nome do funcionário"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">E-mail Corporativo</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="email@transita.ai"
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
                          placeholder="(11) 00000-0000"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">ID do Funcionário (Matrícula)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.employeeId}
                        onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                        placeholder="Ex: TR-1234"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                      />
                    </div>
                  </div>
                </section>

                {/* Role & Department */}
                <section className="pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center">
                      <Briefcase size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Cargo e Departamento</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Cargo</label>
                      <select 
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                      >
                        <option>Operador de Logística</option>
                        <option>Analista de Rotas</option>
                        <option>Gerente de Frota</option>
                        <option>Assistente Administrativo</option>
                        <option>Supervisor de Operações</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Departamento</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select 
                          value={formData.department}
                          onChange={(e) => setFormData({...formData, department: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                        >
                          <option>Operações</option>
                          <option>Administrativo</option>
                          <option>Financeiro</option>
                          <option>Recursos Humanos</option>
                          <option>TI / Suporte</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Data de Admissão</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="date" 
                          required
                          value={formData.startDate}
                          onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Salário Base (R$)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.salary}
                        onChange={(e) => setFormData({...formData, salary: e.target.value})}
                        placeholder="0.000,00"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                      />
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
                    {editingEmployee ? 'Salvar Alterações' : 'Salvar Funcionário'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {viewingEmployee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-8 bg-primary-600 text-white flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{viewingEmployee.name}</h2>
                  <p className="text-primary-100 text-sm">{viewingEmployee.employeeId}</p>
                </div>
                <button onClick={() => setViewingEmployee(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Cargo</p>
                    <p className="text-sm font-bold text-slate-900">{viewingEmployee.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Departamento</p>
                    <p className="text-sm font-bold text-slate-900">{viewingEmployee.department}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">E-mail</p>
                    <p className="text-sm text-slate-700">{viewingEmployee.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Telefone</p>
                    <p className="text-sm text-slate-700">{viewingEmployee.phone}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Admissão</p>
                    <p className="text-sm text-slate-700">{viewingEmployee.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Salário</p>
                    <p className="text-sm font-bold text-slate-900">R$ {viewingEmployee.salary}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Registro</p>
                    <p className="text-sm text-slate-700">
                      Registrado por <span className="font-bold">{viewingEmployee.registeredBy}</span> em {viewingEmployee.registrationDate} às {viewingEmployee.registrationTime}
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex gap-4">
                  <button 
                    onClick={() => {
                      handleOpenModal(viewingEmployee);
                      setViewingEmployee(null);
                    }}
                    className="flex-grow py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => {
                      handleDelete(viewingEmployee.id);
                      setViewingEmployee(null);
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

export default RegisterEmployee;