import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  FileText, 
  UserCheck, 
  Download, 
  Trash2,
  Info,
  ChevronRight
} from 'lucide-react';

const Privacy = () => {
  const sections = [
    {
      title: 'Segurança de Dados',
      icon: Lock,
      content: 'Utilizamos criptografia AES-256 para todos os dados em repouso e TLS 1.3 para dados em trânsito. Seus dados logísticos são protegidos pelos mais altos padrões da indústria.',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Transparência de IA',
      icon: Eye,
      content: 'Nossa IA processa dados de rotas, tráfego e consumo para otimizar sua operação. Não compartilhamos dados identificáveis com terceiros para treinamento de modelos externos.',
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      title: 'Conformidade LGPD',
      icon: UserCheck,
      content: 'Estamos em total conformidade com a Lei Geral de Proteção de Dados (LGPD). Você tem controle total sobre seus dados e como eles são utilizados.',
      color: 'bg-emerald-50 text-emerald-600'
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm mb-6">
            <ShieldCheck size={32} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Privacidade e Transparência</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Na Transita.AI, levamos a segurança dos seus dados a sério. 
            Entenda como protegemos suas informações e seus direitos como usuário.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
            >
              <div className={`w-10 h-10 ${section.color} rounded-xl flex items-center justify-center mb-4`}>
                <section.icon size={20} />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{section.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed Sections */}
        <div className="space-y-6">
          
          {/* AI Transparency */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Database size={24} className="text-slate-400" />
                <h2 className="text-xl font-bold text-slate-900">Como usamos seus dados</h2>
              </div>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  Para fornecer as melhores otimizações de rota, coletamos e processamos:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Geolocalização em tempo real:</strong> Para monitoramento e ajuste dinâmico de rotas.</li>
                  <li><strong>Histórico de viagens:</strong> Para treinar nossa IA em padrões de tráfego específicos da sua região.</li>
                  <li><strong>Dados de telemetria:</strong> Para análise de eficiência de combustível e comportamento do motorista.</li>
                </ul>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-3 mt-6">
                  <Info size={20} className="text-amber-600 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    <strong>Importante:</strong> Todos os dados usados para treinamento de modelos globais são anonimizados e agregados, impossibilitando a identificação de empresas ou indivíduos específicos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Rights */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="flex items-center gap-3 mb-8">
              <FileText size={24} className="text-slate-400" />
              <h2 className="text-xl font-bold text-slate-900">Seus Direitos</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Acesso aos seus dados pessoais',
                'Correção de dados incompletos ou inexatos',
                'Anonimização ou bloqueio de dados desnecessários',
                'Portabilidade dos dados a outro fornecedor',
                'Eliminação dos dados pessoais tratados com consentimento',
                'Informação sobre compartilhamento com terceiros'
              ].map((right, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <ChevronRight size={16} className="text-indigo-600" />
                  <span className="text-sm text-slate-700">{right}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Data Management Actions */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Gerenciar Meus Dados</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-grow flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">
                <Download size={20} />
                Exportar Meus Dados (JSON/CSV)
              </button>
              <button className="flex-grow flex items-center justify-center gap-2 px-6 py-4 border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all">
                <Trash2 size={20} />
                Solicitar Exclusão de Conta
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center italic">
              * A exclusão de dados pode levar até 30 dias para ser processada em todos os nossos sistemas de backup.
            </p>
          </section>

        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>Última atualização: 15 de Outubro de 2023</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-indigo-600 underline">Termos de Uso</a>
            <a href="#" className="hover:text-indigo-600 underline">Política de Cookies</a>
            <a href="#" className="hover:text-indigo-600 underline">Contato DPO</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Privacy;