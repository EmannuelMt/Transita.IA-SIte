import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Legend,
  ComposedChart,
  Scatter
} from 'recharts';
import { 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  FileText,
  Table as TableIcon,
  X,
  CheckCircle2,
  FileJson,
  FileSpreadsheet,
  FileBarChart
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import './Analytics.css';

const data = [
  { month: 'Jan', custo: 4000, economia: 2400, eficiencia: 85 },
  { month: 'Fev', custo: 3000, economia: 1398, eficiencia: 88 },
  { month: 'Mar', custo: 2000, economia: 9800, eficiencia: 92 },
  { month: 'Abr', custo: 2780, economia: 3908, eficiencia: 90 },
  { month: 'Mai', custo: 1890, economia: 4800, eficiencia: 94 },
  { month: 'Jun', custo: 2390, economia: 3800, eficiencia: 96 },
];

const Analytics = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [reportConfig, setReportConfig] = useState({
    type: 'Geral',
    format: 'PDF',
    period: 'Últimos 30 dias'
  });

  const handleGenerateReport = () => {
    setIsGenerating(true);
    toast.loading('Gerando relatório...', { id: 'report-gen' });
    
    setTimeout(() => {
      setIsGenerating(false);
      setShowModal(false);
      toast.success(`Relatório ${reportConfig.type} (${reportConfig.format}) gerado com sucesso!`, { id: 'report-gen' });
    }, 2000);
  };

  return (
    <div className="analytics-root">
      {/* Header */}
      <div className="analytics-header">
        <div>
          <h1 className="analytics-title">Relatórios e Analytics</h1>
          <p className="analytics-subtitle">Análise profunda de custos, eficiência e performance da frota.</p>
        </div>
        <div className="analytics-header-actions">
          <button className="btn btn-outline">
            <Calendar size={18} />
            Últimos 6 Meses
          </button>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <FileBarChart size={18} />
            Gerar Relatório Completo
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="analytics-cards">
        {[
          { label: 'Custo Total Operacional', value: 'R$ 142.500', trend: '-12%', positive: true, icon: TrendingDown },
          { label: 'Economia com IA', value: 'R$ 38.200', trend: '+24%', positive: true, icon: TrendingUp },
          { label: 'Eficiência da Frota', value: '96.4%', trend: '+2.1%', positive: true, icon: ArrowUpRight },
        ].map((card, i) => (
          <div key={i} className="card">
            <div className="card-head">
              <p className="card-label">{card.label}</p>
              <div className={`card-icon ${card.positive ? 'positive' : 'negative'}`}>
                <card.icon size={20} />
              </div>
            </div>
            <div className="card-body">
              <p className="card-value">{card.value}</p>
              <span className={`card-trend ${card.positive ? 'positive' : 'negative'}`}>
                {card.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="analytics-charts">
        {/* Cost vs Savings */}
        <div className="chart-card">
          <div className="chart-head">
            <h3 className="chart-title">Custo vs Economia</h3>
            <div className="chart-legend">
              <div className="legend-item"><span className="legend-dot cost"></span><span>Custo</span></div>
              <div className="legend-item"><span className="legend-dot saving"></span><span>Economia</span></div>
            </div>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="custo" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="economia" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Efficiency Trend */}
        <div className="chart-card">
          <div className="chart-head">
            <h3 className="chart-title">Tendência de Eficiência</h3>
            <button className="icon-btn"><Filter size={18} /></button>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="eficiencia" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Reports Table Placeholder */}
      <div className="reports card">
        <div className="reports-head">
          <h3 className="reports-title">Relatórios Gerados</h3>
          <button className="link-btn"><TableIcon size={18} /> Ver Todos</button>
        </div>
        <div className="reports-table-wrapper">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Nome do Relatório</th>
                <th>Data</th>
                <th>Tamanho</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Performance Trimestral Q3', date: '12 Out, 2023', size: '2.4 MB' },
                { name: 'Análise de Combustível Setembro', date: '01 Out, 2023', size: '1.1 MB' },
                { name: 'Relatório de Manutenção Frota A', date: '28 Set, 2023', size: '850 KB' },
              ].map((report, i) => (
                <tr key={i} className="report-row">
                  <td className="report-name">
                    <div className="report-name-inner">
                      <div className="report-icon"><FileText size={16} /></div>
                      <span className="report-label">{report.name}</span>
                    </div>
                  </td>
                  <td className="report-meta">{report.date}</td>
                  <td className="report-meta">{report.size}</td>
                  <td className="report-action">
                    <button className="link-download">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Generation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="modal-content"
            >
              <div className="modal-head">
                <div>
                  <h2 className="modal-title">Gerar Relatório</h2>
                  <p className="modal-sub">Configure o seu relatório personalizado.</p>
                </div>
                <button onClick={() => setShowModal(false)} className="modal-close">
                  <X size={24} className="modal-close-icon" />
                </button>
              </div>
              <div className="modal-body">
                {/* Report Type */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tipo de Relatório</label>
                  <div className="report-types">
                    {[
                      { id: 'Geral', icon: FileText, desc: 'Visão completa' },
                      { id: 'Financeiro', icon: TrendingUp, desc: 'Custos e lucros' },
                      { id: 'Frota', icon: TableIcon, desc: 'Status dos veículos' },
                      { id: 'Multas', icon: Calendar, desc: 'Histórico de infrações' },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setReportConfig({...reportConfig, type: type.id})}
                        className={`report-type ${reportConfig.type === type.id ? 'active' : ''}`}
                      >
                        <type.icon size={20} className={reportConfig.type === type.id ? 'icon-active' : 'icon-inactive'} />
                        <p className={`report-type-title ${reportConfig.type === type.id ? 'active' : ''}`}>{type.id}</p>
                        <p className="report-type-desc">{type.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Selection */}
                <div className="space-y-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Formato do Documento</label>
                  <div className="format-options">
                    {[
                      { id: 'PDF', icon: FileText, color: 'red' },
                      { id: 'Excel', icon: FileSpreadsheet, color: 'green' },
                      { id: 'CSV', icon: FileJson, color: 'blue' },
                    ].map((format) => (
                      <button
                        key={format.id}
                        onClick={() => setReportConfig({...reportConfig, format: format.id})}
                        className={`format-choice ${reportConfig.format === format.id ? 'active' : ''}`}
                      >
                        <format.icon size={24} className={format.color} />
                        <span className="format-label">{format.id}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Period Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Período</label>
                  <select 
                    value={reportConfig.period}
                    onChange={(e) => setReportConfig({...reportConfig, period: e.target.value})}
                    className="select-period"
                  >
                    <option>Hoje</option>
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Últimos 6 meses</option>
                    <option>Personalizado</option>
                  </select>
                </div>

                <div className="modal-actions">
                  <button onClick={() => setShowModal(false)} className="btn-cancel">Cancelar</button>
                  <button onClick={handleGenerateReport} disabled={isGenerating} className="btn-primary large">
                    {isGenerating ? (
                      <>
                        <div className="spinner"></div>
                        Gerando...
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        Gerar e Baixar
                      </>
                    )}
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

export default Analytics;