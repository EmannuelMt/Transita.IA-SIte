
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GlobalLoading.css';

const LoadingScreen = ({ onComplete }) => {
  const [statusIndex, setStatusIndex] = useState(0);
  const statusMessages = [
    "Iniciando Transita.IA...",
    "Sincronizando dados da frota...",
    "Otimizando rotas inteligentes...",
    "Carregando painel de analytics...",
    "Quase pronto..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 800);

    // Completar loading após 4 segundos
    const completeTimer = setTimeout(() => {
      onComplete && onComplete();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-green-50 rounded-full blur-[120px] opacity-60"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-blue-50 rounded-full blur-[100px] opacity-40"
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 0px rgba(22, 163, 74, 0)",
                "0 0 40px rgba(22, 163, 74, 0.3)",
                "0 0 0px rgba(22, 163, 74, 0)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 bg-green-600 rounded-[2rem] flex items-center justify-center text-white text-5xl font-black shadow-2xl"
          >
            T
          </motion.div>
          
          {/* Pulsing ring */}
          <motion.div 
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-green-600 rounded-[2rem] -z-10"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Transita.IA</h1>
          <p className="text-[10px] text-green-600 font-bold uppercase tracking-[0.3em] mt-1">Inteligência em Movimento</p>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden relative mb-4">
          <motion.div
            animate={{ 
              x: ["-100%", "100%"]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-green-600 to-transparent"
          />
        </div>

        {/* Status Messages */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xs font-medium text-gray-400"
            >
              {statusMessages[statusIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 text-center"
      >
        <p className="text-[9px] text-gray-300 font-semibold uppercase tracking-widest">Transita.IA</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
