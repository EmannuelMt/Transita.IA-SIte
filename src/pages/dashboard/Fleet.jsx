import React, { useState } from 'react';
import './Fleet.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Truck, 
  Search, 
  Filter, 
  MoreVertical, 
  MapPin, 
  Fuel, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Plus,
  X,
  Edit2,
  Trash2,
  Eye,
  Calendar,
  Settings
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const Fleet = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
    year: '',
    driver: '',
    status: 'Ocioso',
    type: 'Caminhão'
  });

  const [vehicles, setVehicles] = useState([
    { id: 'V-001', plate: 'ABC-1234', model: 'Scania R450', year: '2022', driver: 'Ricardo Oliveira', status: 'Em Rota', location: 'Campinas, SP', fuel: '65%', efficiency: '94%', lastMaintenance: '15/01/2024', type: 'Caminhão' },
    { id: 'V-002', plate: 'DEF-5678', model: 'Volvo FH 540', year: '2023', driver: 'Ana Paula', status: 'Ocioso', location: 'São Paulo, SP', fuel: '82%', efficiency: '91%', lastMaintenance: '10/02/2024', type: 'Caminhão' },
    { id: 'V-003', plate: 'GHI-9012', model: 'Mercedes Actros', year: '2021', driver: 'Carlos Silva', status: 'Manutenção', location: 'Oficina Central', fuel: '15%', efficiency: '88%', lastMaintenance: '20/02/2024', type: 'Caminhão' },
    { id: 'V-004', plate: 'JKL-3456', model: 'Scania R450', year: '2022', driver: 'Juliana Lima', status: 'Em Rota', location: 'Santos, SP', fuel: '42%', efficiency: '96%', lastMaintenance: '05/01/2024', type: 'Caminhão' },
    { id: 'V-005', plate: 'MNO-7890', model: 'Volvo FH 540', year: '2023', driver: 'Marcos Souza', status: 'Em Rota', location: 'Rio de Janeiro, RJ', fuel: '58%', efficiency: '93%', lastMaintenance: '12/02/2024', type: 'Caminhão' },
    { id: 'V-006', plate: 'PQR-1234', model: 'Mercedes Actros', year: '2021', driver: 'Fernanda Costa', status: 'Ocioso', location: 'Curitiba, PR', fuel: '90%', efficiency: '90%', lastMaintenance: '18/01/2024', type: 'Caminhão' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Em Rota': return 'bg-emerald-100 text-emerald-700';
      case 'Ocioso': return 'bg-slate-100 text-slate-600';
      case 'Manutenção': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const handleOpenModal = (vehicle) => {
    if (vehicle) {
      setSelectedVehicle(vehicle);
      setFormData(vehicle);
    } else {
      setSelectedVehicle(null);
      setFormData({
        plate: '',
        model: '',
        year: '',
        driver: '',
        status: 'Ocioso',
        type: 'Caminhão'
      });
    }
    setIsModalOpen(true);
  };

  const handleViewVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setIsViewModalOpen(true);
  };

  const handleDeleteVehicle = (id) => {
    if (confirm('Tem certeza que deseja excluir este veículo?')) {
      setVehicles(vehicles.filter(v => v.id !== id));
      toast.success('Veículo excluído com sucesso!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVehicle) {
      setVehicles(vehicles.map(v => v.id === selectedVehicle.id ? { ...v, ...formData } : v));
      toast.success('Veículo atualizado com sucesso!');
    } else {
      const newVehicle = {
        ...formData,
        id: `V-00${vehicles.length + 1}`,
        location: 'Base Central',
        fuel: '100%',
        efficiency: '100%',
        lastMaintenance: new Date().toLocaleDateString('pt-BR')
      };
      setVehicles([...vehicles, newVehicle]);
      toast.success('Veículo cadastrado com sucesso!');
    }
    setIsModalOpen(false);
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.plate.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         v.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && v.status === 'Em Rota';
    if (filter === 'idle') return matchesSearch && v.status === 'Ocioso';
    if (filter === 'maintenance') return matchesSearch && v.status === 'Manutenção';
    return matchesSearch;
  });

  return (
    <div className="fleet-root space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Frota</h1>
          <p className="text-slate-500">Monitore e gerencie todos os veículos da sua operação.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
        >
          <Plus size={18} />
          Adicionar Veículo
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por placa, modelo ou motorista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {['all', 'active', 'idle', 'maintenance'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                  filter === f ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'active' ? 'Em Rota' : f === 'idle' ? 'Ociosos' : 'Manutenção'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle, i) => (
          <motion.div
            key={vehicle.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                    <Truck size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{vehicle.plate}</h3>
                    <p className="text-xs text-slate-500">{vehicle.model} ({vehicle.year})</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <MapPin size={16} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Localização Atual</p>
                    <p className="text-slate-700 font-medium">{vehicle.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <Truck size={16} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Motorista</p>
                    <p className="text-slate-700 font-medium">{vehicle.driver}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>Combustível</span>
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${parseInt(vehicle.fuel) < 30 ? 'bg-red-500' : 'bg-amber-500'}`} 
                      style={{ width: vehicle.fuel }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                    <span>Eficiência</span>
                    <span>{vehicle.efficiency}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: vehicle.efficiency }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex border-t border-slate-50">
              <button 
                onClick={() => handleViewVehicle(vehicle)}
                className="flex-grow py-4 bg-slate-50 text-slate-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary-50 hover:text-primary-600 transition-all"
              >
                <Eye size={16} />
                Ver
              </button>
              <button 
                onClick={() => handleOpenModal(vehicle)}
                className="flex-grow py-4 bg-slate-50 text-slate-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-amber-50 hover:text-amber-600 transition-all border-x border-slate-100"
              >
                <Edit2 size={16} />
                Editar
              </button>
              <button 
                onClick={() => handleDeleteVehicle(vehicle.id)}
                className="flex-grow py-4 bg-slate-50 text-slate-600 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all"
              >
                <Trash2 size={16} />
                Excluir
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedVehicle ? 'Editar Veículo' : 'Novo Veículo'}</h2>
                  <p className="text-slate-500 text-sm">Preencha as informações do veículo abaixo.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Placa</label>
                    <input 
                      required
                      type="text"
                      value={formData.plate}
                      onChange={(e) => setFormData({...formData, plate: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="ABC-1234"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Modelo</label>
                    <input 
                      required
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="Ex: Scania R450"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Ano</label>
                    <input 
                      required
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="Ex: 2022"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Motorista Responsável</label>
                    <input 
                      required
                      type="text"
                      value={formData.driver}
                      onChange={(e) => setFormData({...formData, driver: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      placeholder="Nome do motorista"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                      <option value="Ocioso">Ocioso</option>
                      <option value="Em Rota">Em Rota</option>
                      <option value="Manutenção">Manutenção</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase">Tipo de Veículo</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                      <option value="Caminhão">Caminhão</option>
                      <option value="Van">Van</option>
                      <option value="Carreta">Carreta</option>
                      <option value="Utilitário">Utilitário</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-grow py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                  >
                    {selectedVehicle ? 'Salvar Alterações' : 'Cadastrar Veículo'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {isViewModalOpen && selectedVehicle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className="p-8 bg-primary-600 text-white relative">
                <button onClick={() => setIsViewModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                    <Truck size={32} />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{selectedVehicle.plate}</h2>
                    <p className="text-primary-100">{selectedVehicle.model}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    {selectedVehicle.type}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                    selectedVehicle.status === 'Em Rota' ? 'bg-emerald-400 text-emerald-900' : 
                    selectedVehicle.status === 'Manutenção' ? 'bg-red-400 text-red-900' : 'bg-slate-400 text-slate-900'
                  }`}>
                    {selectedVehicle.status}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Motorista</p>
                    <p className="text-slate-900 font-bold">{selectedVehicle.driver}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ano</p>
                    <p className="text-slate-900 font-bold">{selectedVehicle.year}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Localização</p>
                    <p className="text-slate-900 font-bold">{selectedVehicle.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Última Manutenção</p>
                    <p className="text-slate-900 font-bold">{selectedVehicle.lastMaintenance}</p>
                  </div>
                </div>
                
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">Combustível</span>
                      <span className="text-slate-900">{selectedVehicle.fuel}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: selectedVehicle.fuel }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400 uppercase">Eficiência</span>
                      <span className="text-slate-900">{selectedVehicle.efficiency}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: selectedVehicle.efficiency }}></div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsViewModalOpen(false)}
                  className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all mt-4"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Fleet;