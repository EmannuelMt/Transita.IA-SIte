import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';
import logoImg from '../../assets/images/Logo/logo.svg';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const TIPS = [
  { title: 'Rotas inteligentes', description: 'Otimização de rotas em tempo real para entregas mais eficientes.' },
  { title: 'Rastreamento preciso', description: 'Acompanhamento de cargas com geolocalização em tempo real.' },
  { title: 'KPIs operacionais', description: 'Métricas para monitoramento de desempenho e produtividade.' },
  { title: 'Documentação digital', description: 'Comprovantes e relatórios armazenados de forma segura e auditável.' }
];

const Login = () => {
  const [index, setIndex] = useState(0);
  // usar função direta do cliente firebase
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TIPS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const handleGoogle = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      if (res?.user) {
        toast.success('Autenticação realizada com sucesso.');
        navigate('/');
      } else {
        throw new Error(res?.error || 'Falha na autenticação via Google.');
      }
    } catch (err) {
      console.error('Google sign-in error', err);
      toast.error(err?.message || 'Falha na autenticação via Google.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 980, width: '100%', display: 'flex', gap: 40, alignItems: 'center', padding: 24 }}>
        <section className={styles.leftColumn}>
          <img src={logoImg} alt="Transita.IA" className={styles.brandLogo} />
          <h1 className={styles.title}>Acesse o Transita.IA</h1>
          <p className={styles.subtitle}>
            Autentique‑se com sua conta Google para acessar a plataforma. Em breve disponibilizaremos formulário dedicado para
            cadastro de empresas e de colaboradores, com os campos específicos para cada perfil.
          </p>

          <motion.div key={index} className={styles.tipCard} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <h3 className={styles.tipTitle}>{TIPS[index].title}</h3>
            <p className={styles.tipText}>{TIPS[index].description}</p>
          </motion.div>
        </section>

        <aside className={styles.rightColumn}>
          <div className={styles.warningCard}>
            <strong>⚠️ Aviso Importante</strong>
            <p>
              Autenticação é exclusivamente via Google OAuth 2.0. Cadastros manuais e formulários próprios estão desativados temporariamente e
              retornarão com validações e controles adicionais para segurança e conformidade.
            </p>
          </div>
          <button
            type="button"
            onClick={handleGoogle}
            disabled={loading}
            className={styles.googleBtn}
          >
            <FaGoogle />
            {loading ? (
              <span className={styles.spinner}></span>
            ) : (
              'Entrar com Conta Google'
            )}
          </button>

          <div className={styles.notice} />
        </aside>
      </div>
    </div>
  );
};

export default Login;
