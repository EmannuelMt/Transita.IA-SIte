import React, { useState } from 'react';
import './Fines.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  MapPin, 
  CreditCard,
  ChevronRight,
  ShieldAlert,
  CheckCircle2,
  Info,
  Plus,
  Edit2,
  Trash2,
  X,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const Fines = () => {
  const [plate, setPlate] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  
  const [fines, setFines] = useState([
    { id: 'F-9921', plate: 'ABC-1234', type: 'Excesso de Velocidade', date: '2023-10-12', location: 'Rod. dos Bandeirantes, km 42', amount: '195.23', points: 4, status: 'Pendente' },
    { id: 'F-9845', plate: 'XYZ-9876', type: 'Estacionamento Irregular', date: '2023-10-05', location: 'Av. Paulista, 1000', amount: '130.16', points: 3, status: 'Em Recurso' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFine, setEditingFine] = useState(null);
  const [viewingFine, setViewingFine] = useState(null);

  const [formData, setFormData] = useState({
    plate: '',
    type: 'Excesso de Velocidade',
    date: '',
    location: '',
    amount: '',
    points: 0,
    status: 'Pendente'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!plate) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      const vehicleFines = fines.filter(f => f.plate === plate.toUpperCase());
      if (plate.toUpperCase() === 'ABC-1234' || vehicleFines.length > 0) {
        setSearchResult({
          plate: plate.toUpperCase(),
          model: 'Scania R450',
          owner: 'Transita Logística LTDA',
          fines: vehicleFines,
          status: vehicleFines.length > 0 ? 'Débitos Pendentes' : 'Regular'
        });
      } else {
        setSearchResult({
          plate: plate.toUpperCase(),
          model: 'Veículo não identificado',
          owner: 'N/A',
          fines: [],
          status: 'Nenhum débito encontrado'
        });
      }
      toast.success('Consulta realizada com sucesso!');
    }, 1500);
  };

  const handleOpenModal = (fine) => {
    if (fine) {
      setEditingFine(fine);
      setFormData(fine);
    } else {
      setEditingFine(null);
      setFormData({
        plate: '',
        type: 'Excesso de Velocidade',
        date: new Date().toISOString().split('T')[0],
        location: '',
        amount: '',
        points: 0,
        status: 'Pendente'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveFine = (e) => {
    e.preventDefault();
    if (editingFine) {
      setFines(prev => prev.map(f => f.id === editingFine.id ? { ...f, ...formData } : f));
      toast.success('Multa atualizada com sucesso!');
    } else {
      const newFine = {
        ...formData,
        id: `F-${Math.floor(Math.random() * 10000)}`,
      };
      setFines(prev => [newFine, ...prev]);
      toast.success('Multa registrada com sucesso!');
    }
    setIsModalOpen(false);
  };

  const handleDeleteFine = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta multa?')) {
      setFines(prev => prev.filter(f => f.id !== id));
      toast.success('Multa excluída com sucesso!');
      if (searchResult) {
        setSearchResult((prev) => ({
          ...prev,
          fines: prev.fines.filter((f) => f.id !== id)
        }));
      }
    }
  };

  return (
    <div className="fines-root space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Multas e Consulta de Placas</h1>
          <p className="text-slate-500">Consulte débitos, infrações e situação cadastral da frota.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
        >
          <Plus size={18} />
          Registrar Multa
        </button>
      </div>

      {/* Search Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSearch} className="max-w-2xl">
          <label className="block text-sm font-bold text-slate-700 mb-2">Consultar Placa</label>
          <div className="flex gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Ex: ABC-1234"
                value={plate}
                onChange={(e) => setPlate(e.target.value.toUpperCase())}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-lg tracking-widest"
              />
            </div>
            <button 
              type="submit"
              disabled={isSearching}
              className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50"
            >
              {isSearching ? 'Consultando...' : 'Consultar'}
            </button>
          </div>
        </form>
      </div>

      {/* Search Result */}
      {searchResult && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-bold text-slate-900">Informações do Veículo</h3>
              <button onClick={() => setSearchResult(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Placa</p>
                <p className="text-xl font-mono font-bold text-slate-900">{searchResult.plate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Modelo</p>
                <p className="text-sm font-bold text-slate-700">{searchResult.model}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Proprietário</p>
                <p className="text-sm font-bold text-slate-700">{searchResult.owner}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold ${searchResult.fines.length > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {searchResult.fines.length > 0 ? <ShieldAlert size={18} /> : <CheckCircle2 size={18} />}
                  {searchResult.status}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Infrações Encontradas ({searchResult.fines.length})</h3>
            {searchResult.fines.length > 0 ? (
              <div className="space-y-4">
                {searchResult.fines.map((fine) => (
                  <div key={fine.id} className="p-6 rounded-2xl border border-red-100 bg-red-50/30">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{fine.type}</p>
                          <p className="text-xs text-slate-500">{fine.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold rounded-full uppercase ${fine.status === 'Pendente' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {fine.status}
                        </span>
                        <button onClick={() => handleOpenModal(fine)} className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeleteFine(fine.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Data</p>
                        <p className="font-medium text-slate-700">{fine.date}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Valor</p>
                        <p className="font-bold text-slate-900">R$ {fine.amount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Pontos</p>
                        <p className="font-bold text-red-600">{fine.points} pts</p>
                      </div>
                      <div className="flex items-end">
                        <button 
                          onClick={() => setViewingFine(fine)}
                          className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1"
                        >
                          Ver Detalhes <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <p className="font-bold text-slate-900">Nenhuma infração pendente</p>
                <p className="text-sm text-slate-500">Este veículo está em conformidade com as leis de trânsito.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Recent Fines Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Últimas Multas da Frota</h3>
          <button className="text-sm font-bold text-primary-600 hover:underline">Ver Histórico Completo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Veículo</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Infração</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Data</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Valor</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {fines.map((fine) => (
                <tr key={fine.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-4">
                    <p className="text-sm font-bold text-slate-900">{fine.plate}</p>
                  </td>
                  <td className="px-8 py-4">
                    <p className="text-sm text-slate-700">{fine.type}</p>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500">{fine.date}</td>
                  <td className="px-8 py-4 text-sm font-bold text-slate-900">R$ {fine.amount}</td>
                  <td className="px-8 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${fine.status === 'Pendente' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                      {fine.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewingFine(fine)} className="p-2 text-slate-400 hover:text-primary-600">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(fine)} className="p-2 text-slate-400 hover:text-primary-600">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteFine(fine.id)} className="p-2 text-slate-400 hover:text-red-600">
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
              className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingFine ? 'Editar Multa' : 'Registrar Nova Multa'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveFine} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Placa do Veículo</label>
                    <input 
                      type="text" 
                      required
                      placeholder="ABC-1234"
                      value={formData.plate}
                      onChange={(e) => setFormData({...formData, plate: e.target.value.toUpperCase()})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Tipo de Infração</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    >
                      <option>Excesso de Velocidade</option>
                      <option>Estacionamento Irregular</option>
                      <option>Avanço de Sinal Vermelho</option>
                      <option>Uso de Celular ao Volante</option>
                      <option>Falta de Cinto de Segurança</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Data da Infração</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Valor (R$)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      required
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Pontos na CNH</label>
                    <input 
                      type="number" 
                      required
                      value={formData.points}
                      onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    >
                      <option>Pendente</option>
                      <option>Pago</option>
                      <option>Em Recurso</option>
                      <option>Vencido</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Localização</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Av. Paulista, 1000"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                </div>
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
                    {editingFine ? 'Salvar Alterações' : 'Registrar Multa'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {viewingFine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-8 bg-primary-600 text-white flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Detalhes da Multa</h2>
                  <p className="text-primary-100 text-sm">{viewingFine.id}</p>
                </div>
                <button onClick={() => setViewingFine(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Veículo</p>
                    <p className="text-lg font-mono font-bold text-slate-900">{viewingFine.plate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${viewingFine.status === 'Pendente' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {viewingFine.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Infração</p>
                    <p className="text-slate-900 font-bold">{viewingFine.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Data</p>
                    <p className="text-slate-700 font-medium">{viewingFine.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Valor</p>
                    <p className="text-slate-900 font-bold">R$ {viewingFine.amount}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Localização</p>
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin size={16} className="text-slate-400" />
                      <span className="text-sm">{viewingFine.location}</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex gap-4">
                  <button 
                    onClick={() => {
                      handleOpenModal(viewingFine);
                      setViewingFine(null);
                    }}
                    className="flex-grow py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => {
                      handleDeleteFine(viewingFine.id);
                      setViewingFine(null);
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

export default Fines;