import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Search, 
  ChevronDown, 
  Send, 
  LifeBuoy,
  FileText,
  Video,
  ExternalLink
} from 'lucide-react';
import toast from 'react-hot-toast';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'Como a IA otimiza minhas rotas?',
      a: 'Nossa IA analisa em tempo real dados de tráfego, condições climáticas, restrições de veículos e janelas de entrega para calcular o caminho mais eficiente, reduzindo o tempo de viagem e o consumo de combustível em até 25%.'
    },
    {
      q: 'Posso integrar com meu ERP atual?',
      a: 'Sim! Oferecemos APIs robustas e integrações nativas com os principais ERPs do mercado (SAP, TOTVS, Oracle). Consulte nossa documentação técnica para mais detalhes.'
    },
    {
      q: 'Como funciona o sistema de tokens?',
      a: 'Cada otimização complexa ou previsão de IA consome uma quantidade específica de tokens. Planos pagos incluem uma cota mensal, e você pode adquirir pacotes adicionais sempre que necessário.'
    },
    {
      q: 'O aplicativo funciona offline?',
      a: 'O aplicativo do motorista permite visualizar rotas já carregadas e registrar eventos offline. Os dados são sincronizados automaticamente assim que uma conexão de internet é restabelecida.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Mensagem enviada! Retornaremos em breve.');
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Como podemos ajudar?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Pesquise por ajuda, tutoriais ou guias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { title: 'Base de Conhecimento', desc: 'Guias detalhados e documentação.', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
            { title: 'Tutoriais em Vídeo', desc: 'Aprenda a usar a plataforma visualmente.', icon: Video, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { title: 'Comunidade', desc: 'Troque experiências com outros usuários.', icon: MessageCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          ].map((item, i) => (
            <button key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left group">
              <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{item.desc}</p>
              <span className="text-sm font-bold text-indigo-600 flex items-center gap-1">
                Acessar agora
                <ExternalLink size={14} />
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900">{faq.q}</span>
                    <ChevronDown size={20} className={`text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            <button className="mt-8 text-indigo-600 font-bold hover:underline flex items-center gap-2">
              Ver todas as perguntas
              <ChevronDown size={18} className="-rotate-90" />
            </button>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center">
                <LifeBuoy size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Ainda precisa de ajuda?</h2>
                <p className="text-slate-500 text-sm">Envie uma mensagem e responderemos em até 24h.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nome</label>
                  <input type="text" required placeholder="Seu nome" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">E-mail</label>
                  <input type="email" required placeholder="seu@email.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Assunto</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all">
                  <option>Dúvida Técnica</option>
                  <option>Faturamento</option>
                  <option>Sugestão de Funcionalidade</option>
                  <option>Outros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Mensagem</label>
                <textarea rows={4} required placeholder="Como podemos ajudar?" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                <Send size={18} />
                Enviar Mensagem
              </button>
            </form>

            <div className="mt-10 pt-10 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">E-mail</p>
                  <p className="text-sm font-bold text-slate-900">suporte@transita.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Telefone</p>
                  <p className="text-sm font-bold text-slate-900">0800 123 4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;