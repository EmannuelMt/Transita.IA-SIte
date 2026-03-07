import React from 'react';
import './Announcements.css';
import { motion } from 'motion/react';
import { 
  Bell, 
  Zap, 
  Star, 
  Info, 
  AlertCircle, 
  ChevronRight, 
  Calendar,
  Sparkles,
  Rocket,
  ShieldCheck,
  Wrench
} from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: 'Lançamento do Sistema de Relatórios Inteligentes',
    description: 'Agora você pode gerar relatórios completos em PDF, Excel e CSV com apenas um clique. O sistema utiliza IA para destacar os pontos mais importantes da sua operação.',
    date: '27 de Fevereiro, 2026',
    category: 'Novidade',
    icon: Sparkles,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    tag: 'Novo'
  },
  {
    id: 2,
    title: 'Atualização na Gestão de Frota',
    description: 'Implementamos o sistema completo de CRUD para veículos. Agora é possível cadastrar, editar e excluir veículos diretamente do dashboard, com acompanhamento de manutenção e eficiência.',
    date: '26 de Fevereiro, 2026',
    category: 'Atualização',
    icon: Rocket,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    tag: 'v2.4.0'
  },
  {
    id: 3,
    title: 'Melhorias na Segurança de Dados',
    description: 'Reforçamos nossos protocolos de criptografia e autenticação para garantir que as informações da sua empresa e funcionários estejam sempre protegidas.',
    date: '20 de Fevereiro, 2026',
    category: 'Segurança',
    icon: ShieldCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    tag: 'Segurança'
  },
  {
    id: 4,
    title: 'Manutenção Programada: 01 de Março',
    description: 'Realizaremos uma manutenção preventiva em nossos servidores no dia 01/03 entre 02:00 e 04:00 da manhã. O sistema poderá apresentar instabilidades momentâneas.',
    date: '15 de Fevereiro, 2026',
    category: 'Aviso',
    icon: Wrench,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    tag: 'Manutenção'
  },
  {
    id: 5,
    title: 'Novo Widget de Chat Global',
    description: 'Adicionamos um widget de chat acessível em todas as páginas para facilitar o suporte e a comunicação interna.',
    date: '10 de Fevereiro, 2026',
    category: 'Novidade',
    icon: Zap,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    tag: 'Interface'
  }
];

const Announcements = () => {
  return (
    <div className="announcements-root max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold"
        >
          <Bell size={16} />
          Central de Avisos
        </motion.div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">O que há de novo no Transita.AI?</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Fique por dentro das últimas atualizações, melhorias e novidades que preparamos para otimizar sua gestão logística.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
        {announcements.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
          >
            {/* Icon Dot */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
              <item.icon size={18} className={item.color} />
            </div>

            {/* Content Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 ${item.bg} ${item.color} rounded-lg text-[10px] font-bold uppercase tracking-wider`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar size={12} />
                  {item.date}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
              <button className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 hover:gap-2 transition-all">
                Saiba mais <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter / Subscription Placeholder */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-slate-900 rounded-[2.5rem] p-10 text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white">Quer receber as novidades por e-mail?</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Inscreva-se em nossa newsletter e seja o primeiro a saber sobre novas funcionalidades e dicas de otimização.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="seu@email.com"
              className="flex-grow px-6 py-3 bg-white/10 border border-white/10 rounded-xl text-white text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20">
              Inscrever
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Announcements;