import React, { useState } from 'react';
import './Financial.css';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Filter,
  CreditCard,
  Wallet,
  Receipt,
  PieChart as PieChartIcon,
  Plus,
  Edit2,
  Trash2,
  X,
  Eye,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

const chartData = [
  { name: 'Jan', receita: 45000, despesa: 32000 },
  { name: 'Fev', receita: 52000, despesa: 34000 },
  { name: 'Mar', receita: 48000, despesa: 31000 },
  { name: 'Abr', receita: 61000, despesa: 38000 },
  { name: 'Mai', receita: 55000, despesa: 36000 },
  { name: 'Jun', receita: 67000, despesa: 41000 },
];

const expenseData = [
  { name: 'Combustível', value: 45, color: '#3b82f6' },
  { name: 'Manutenção', value: 25, color: '#10b981' },
  { name: 'Salários', value: 20, color: '#f59e0b' },
  { name: 'Outros', value: 10, color: '#94a3b8' },
];

const Financial = () => {
  const [transactions, setTransactions] = useState([
    { id: 'TX-001', desc: 'Abastecimento - Veículo #42', cat: 'Combustível', date: '2023-10-15', amount: '1240.00', status: 'Concluído', type: 'expense' },
    { id: 'TX-002', desc: 'Faturamento Mensal - Cliente ABC', cat: 'Serviços', date: '2023-10-14', amount: '12500.00', status: 'Concluído', type: 'income' },
    { id: 'TX-003', desc: 'Manutenção Corretiva - V-007', cat: 'Manutenção', date: '2023-10-12', amount: '3450.00', status: 'Pendente', type: 'expense' },
    { id: 'TX-004', desc: 'Pagamento Salários - Operacional', cat: 'RH', date: '2023-10-10', amount: '22000.00', status: 'Concluído', type: 'expense' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  const [viewingTx, setViewingTx] = useState(null);

  const [formData, setFormData] = useState({
    desc: '',
    cat: 'Combustível',
    date: '',
    amount: '',
    status: 'Concluído',
    type: 'expense'
  });

  const handleOpenModal = (tx) => {
    if (tx) {
      setEditingTx(tx);
      setFormData(tx);
    } else {
      setEditingTx(null);
      setFormData({
        desc: '',
        cat: 'Combustível',
        date: new Date().toISOString().split('T')[0],
        amount: '',
        status: 'Concluído',
        type: 'expense'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveTx = (e) => {
    e.preventDefault();
    if (editingTx) {
      setTransactions(prev => prev.map(t => t.id === editingTx.id ? { ...t, ...formData } : t));
      toast.success('Transação atualizada com sucesso!');
    } else {
      const newTx = {
        ...formData,
        id: `TX-${Math.floor(Math.random() * 1000)}`,
      };
      setTransactions(prev => [newTx, ...prev]);
      toast.success('Transação registrada com sucesso!');
    }
    setIsModalOpen(false);
  };

  const handleDeleteTx = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
      toast.success('Transação excluída com sucesso!');
    }
  };

  return (
    <div className="financial-root space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financeiro</h1>
          <p className="text-slate-500">Controle de fluxo de caixa, despesas e faturamento.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
          >
            <Plus size={18} />
            Nova Transação
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={18} />
            Exportar
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Saldo Atual', value: 'R$ 124.500', trend: '+12%', positive: true, icon: Wallet, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'Receita (Mês)', value: 'R$ 67.000', trend: '+8%', positive: true, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Despesas (Mês)', value: 'R$ 41.000', trend: '+5%', positive: false, icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Lucro Líquido', value: 'R$ 26.000', trend: '+15%', positive: true, icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cash Flow Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Fluxo de Caixa</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                <span className="text-xs font-medium text-slate-500">Receita</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-xs font-medium text-slate-500">Despesa</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="receita" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="despesa" fill="#f87171" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Distribuição de Gastos</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <PieChartIcon size={24} className="text-slate-300 mb-1" />
              <p className="text-[10px] text-slate-500 uppercase font-bold">Despesas</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {expenseData.map((item, i) => (
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

      {/* Recent Transactions */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Transações Recentes</h3>
          <button className="text-sm font-bold text-primary-600 hover:underline">Ver Extrato Completo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Descrição</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Categoria</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Data</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Valor</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                        {tx.type === 'income' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{tx.desc}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{tx.cat}</span>
                  </td>
                  <td className="px-8 py-4 text-sm text-slate-500">{tx.date}</td>
                  <td className={`px-8 py-4 text-sm font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.type === 'income' ? '+' : '-'} R$ {parseFloat(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-8 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${tx.status === 'Concluído' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setViewingTx(tx)} className="p-2 text-slate-400 hover:text-primary-600">
                        <Eye size={16} />
                      </button>
                      <button onClick={() => handleOpenModal(tx)} className="p-2 text-slate-400 hover:text-primary-600">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDeleteTx(tx.id)} className="p-2 text-slate-400 hover:text-red-600">
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
                  {editingTx ? 'Editar Transação' : 'Nova Transação'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSaveTx} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Descrição</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Abastecimento Veículo #42"
                      value={formData.desc}
                      onChange={(e) => setFormData({...formData, desc: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Tipo</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    >
                      <option value="income">Receita (+)</option>
                      <option value="expense">Despesa (-)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Categoria</label>
                    <select 
                      value={formData.cat}
                      onChange={(e) => setFormData({...formData, cat: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    >
                      <option>Combustível</option>
                      <option>Manutenção</option>
                      <option>Salários</option>
                      <option>Serviços</option>
                      <option>RH</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Data</label>
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
                    <label className="text-sm font-bold text-slate-700">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all"
                    >
                      <option>Concluído</option>
                      <option>Pendente</option>
                      <option>Cancelado</option>
                    </select>
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
                    {editingTx ? 'Salvar Alterações' : 'Registrar Transação'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Details Modal */}
      <AnimatePresence>
        {viewingTx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className={`p-8 ${viewingTx.type === 'income' ? 'bg-emerald-600' : 'bg-red-500'} text-white flex justify-between items-start`}>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Detalhes da Transação</h2>
                  <p className="text-white/80 text-sm">{viewingTx.id}</p>
                </div>
                <button onClick={() => setViewingTx(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Descrição</p>
                    <p className="text-lg font-bold text-slate-900">{viewingTx.desc}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${viewingTx.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {viewingTx.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Categoria</p>
                    <p className="text-slate-700 font-bold">{viewingTx.cat}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Data</p>
                    <p className="text-slate-700 font-medium">{viewingTx.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Valor</p>
                    <p className={`text-xl font-bold ${viewingTx.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {viewingTx.type === 'income' ? '+' : '-'} R$ {parseFloat(viewingTx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex gap-4">
                  <button 
                    onClick={() => {
                      handleOpenModal(viewingTx);
                      setViewingTx(null);
                    }}
                    className="flex-grow py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => {
                      handleDeleteTx(viewingTx.id);
                      setViewingTx(null);
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

export default Financial;