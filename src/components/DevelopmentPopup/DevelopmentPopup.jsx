
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTool, FiX, FiClock, FiTerminal } from 'react-icons/fi';

const DevelopmentPopup = ({ isOpen, onClose, featureName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay de fundo com blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />

          {/* Card do Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden border border-gray-100"
          >
            {/* Faixa Superior de Atenção */}
            <div className="bg-orange-400 h-2 w-full"></div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center text-orange-500 shadow-inner">
                  <FiTool size={32} />
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                  <FiTerminal size={12} className="text-orange-400" /> Transita Labs
                </div>
                
                <h2 className="text-2xl font-extrabold text-gray-900 leading-tight">
                  {featureName ? `Módulo ${featureName}` : 'Funcionalidade'} em Construção
                </h2>
                
                <p className="text-gray-500 text-sm leading-relaxed">
                  Nossa IA está trabalhando pesado para polir este recurso. Em breve você terá acesso completo a esta ferramenta de gestão inteligente.
                </p>

                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-gray-100">
                  <FiClock className="text-orange-500 shrink-0" size={20} />
                  <div>
                    <p className="text-xs font-bold text-gray-900">Previsão de Lançamento</p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase">Próximo Update (V2.4.0)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button 
                  onClick={onClose}
                  className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-all shadow-xl shadow-gray-900/10 active:scale-95"
                >
                  Entendido
                </button>
                <button className="w-full py-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  Deseja sugerir uma melhoria?
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DevelopmentPopup;
