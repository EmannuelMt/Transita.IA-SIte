import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github, Chrome, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('[Login] submit start', { email });
    try {
      const resp = await loginWithEmail(email, password);
      console.log('[Login] submit success', resp);
      toast.success(resp?.message || 'Bem-vindo de volta!');
      navigate('/dashboard');
    } catch (err) {
      console.error('[Login] submit error', err);
      toast.error(err?.response?.data?.error || err?.message || 'Falha no login');
    } finally {
      setIsLoading(false);
      console.log('[Login] submit end');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    console.log('[Login] google start');
    try {
      const resp = await loginWithGoogle();
      console.log('[Login] google success', resp);
      toast.success(resp?.message || 'Autenticado com Google!');
      navigate('/dashboard');
    } catch (err) {
      console.error('[Login] google error', err);
      toast.error(err?.response?.data?.error || err?.message || 'Falha no login com Google');
    } finally {
      setIsLoading(false);
      console.log('[Login] google end');
    }
  };

  return (
    <div className="login-page login-container">
      <div className="login-card-wrapper">
        {/* Header */}
        <div className="login-header">
          <Link to="/" className="logo-link">
            <div className="logo-icon">
              <span>T</span>
            </div>
            <span className="logo-text">
              Transita<span>.AI</span>
            </span>
          </Link>
          <h2 className="login-title">Acesse sua conta</h2>
          <p className="login-subtitle">Entre para gerenciar sua logística com IA.</p>
          <div className="login-warning" role="alert" aria-live="polite">
            <strong>⚠️ Aviso Importante</strong>
            <p>Autenticação é exclusivamente via Google OAuth 2.0. Cadastros manuais e formulários próprios estão desativados temporariamente e retornarão com validações e controles adicionais para segurança e conformidade.</p>
          </div>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="login-card"
        >
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="input-field"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Senha</label>
                <a href="#" className="forgot-password">Esqueceu a senha?</a>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? 'Entrando...' : 'Entrar na Conta'}
              {!isLoading && <ArrowRight size={20} className="button-icon" />}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line">
              <span></span>
            </div>
            <div className="divider-text">
              <span>Ou continue com</span>
            </div>
          </div>

          <div className="social-buttons">
            <button onClick={handleGoogleLogin} disabled={isLoading} className="social-button">
              <Chrome size={18} />
              Google
            </button>
            <button className="social-button">
              <Github size={18} />
              GitHub
            </button>
          </div>
        </motion.div>

        <div className="login-footer">
          <p className="login-footer-text">
            Não tem uma conta?{' '}
            <Link to="/planos" className="signup-link">Comece agora gratuitamente</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;