import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import './DashboardSupportChat.scss';

const Icons = {
  Message: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 10H16M8 14H12M21 12C21 16.9706 16.9706 21 12 21C10.5 21 9.1 20.7 7.8 20.1L3 21L4.9 16.2C4.3 14.9 4 13.5 4 12C4 7.02944 7.02944 4 12 4C16.9706 4 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  X: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Minimize: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Send: ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

const DEFAULT_SUGGESTIONS = [
  'Como gerar um relatório?',
  'Adicionar veículo à frota',
  'Entender multas pendentes',
  'Alterar plano de assinatura',
  'Configurar alertas',
  'Suporte técnico'
];

const MessageRole = { USER: 'user', ASSISTANT: 'assistant' };

const Avatar = ({ role, size = 'md' }) => {
  const cls = `chat-avatar chat-avatar--${role} chat-avatar--${size}`;
  return (
    <div className={cls} aria-hidden="true">
      {role === MessageRole.USER ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 21V19C20 16.79 18.21 15 16 15H8C5.79 15 4 16.79 4 19V21M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 3V6M15 3V6M9 18V21M15 18V21M3 9H6M3 15H6M18 9H21M18 15H21M6 6H18V18H6V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      )}
    </div>
  );
};

const DashboardSupportChat = ({
  position = 'bottom-right',
  autoOpen = false,
  openDelay = 3500,
  onSendMessage,
  onError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: MessageRole.ASSISTANT,
      content: '👋 Olá! Sou o suporte da Dashboard Transita.IA. Posso ajudar com relatórios, frotas, multas, planos e configurações. Como posso ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const widgetRef = useRef(null);

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => { if (isOpen && !isMinimized) scrollToBottom(); }, [messages, isOpen, isMinimized, scrollToBottom]);

  // abertura automática desativada por padrão; o chat abre via evento global

  useEffect(() => {
    const onClickOutside = (e) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target) && isOpen && !isMinimized) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen, isMinimized]);

  // Escuta evento global para abrir o chat (útil para botão no menu)
  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setIsMinimized(false);
    };
    window.addEventListener('dashboard:openSupportChat', handleOpenEvent);
    return () => window.removeEventListener('dashboard:openSupportChat', handleOpenEvent);
  }, []);

  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2,9)}`;

  const sendMessage = async (text) => {
    if (!text) return;
    const userMsg = { id: generateId(), role: MessageRole.USER, content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      let response;
      if (onSendMessage) response = await onSendMessage(text);
      else {
        const { generateResponse } = await import('../../services/aiClient');
        response = await generateResponse(text);
      }

      const assistantMsg = { id: generateId(), role: MessageRole.ASSISTANT, content: response, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);

      // sem indicador de badge (widget abre via botão de suporte)
    } catch (err) {
      console.error('Chat error', err);
      const errMsg = { id: generateId(), role: MessageRole.ASSISTANT, content: 'Ops! Não consegui responder agora. Envie um email para suporte@transita.ia se o problema persistir.', timestamp: new Date() };
      setMessages(prev => [...prev, errMsg]);
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendFromInput = () => {
    const v = inputRef.current?.value?.trim();
    if (!v) return;
    inputRef.current.value = '';
    sendMessage(v);
  };

  const handleSuggestion = (s) => { sendMessage(s); };

  const toggleOpen = () => { setIsOpen(o => !o); setIsMinimized(false); };
  const toggleMinimize = () => setIsMinimized(m => !m);

  return (
    <div ref={widgetRef} className={`dashboard-support-chat dashboard-support-chat--${position}`} aria-live="polite">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div className="dashboard-support-chat__window" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} transition={{ duration: 0.22 }}>
            <div className="chat-header" role="toolbar" aria-label="Cabeçalho do suporte">
              <div className="chat-header__info">
                <div className="chat-header__avatar"><Avatar role={MessageRole.ASSISTANT} size="lg" /></div>
                <div className="chat-header__details">
                  <h3 className="chat-header__title">Suporte Transita.IA</h3>
                  <div className="chat-header__status"><span className="chat-header__status-indicator" aria-hidden="true"/><span className="chat-header__status-text">Online</span></div>
                </div>
              </div>
              <div className="chat-header__actions">
                <button className="chat-header__action" onClick={toggleMinimize} aria-label="Minimizar chat"><Icons.Minimize /></button>
                <button className="chat-header__action" onClick={() => { setIsOpen(false); }} aria-label="Fechar chat"><Icons.X /></button>
              </div>
            </div>

            <div className="dashboard-support-chat__messages" role="log" aria-live="polite">
              <div className="dashboard-support-chat__messages-container">
                {messages.map(msg => (
                  <div key={msg.id} className={`message-wrapper message-wrapper--${msg.role}`}>
                    <div className="message-wrapper__avatar"><Avatar role={msg.role} size="md" /></div>
                    <div className="message-wrapper__content">
                      <div className={`message-bubble message-bubble--${msg.role}`}>
                        <div className="message-bubble__text">{msg.content}</div>
                        <div className="message-bubble__footer"><span className="message-bubble__time">{new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit'}).format(msg.timestamp)}</span></div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="message-wrapper message-wrapper--assistant"><div className="message-wrapper__avatar"><Avatar role={MessageRole.ASSISTANT} size="md"/></div><div className="typing-indicator"><div className="typing-indicator__dots"><span className="typing-indicator__dot"/><span className="typing-indicator__dot"/><span className="typing-indicator__dot"/></div></div></div>
                )}

                <div ref={messagesEndRef} className="dashboard-support-chat__scroll-anchor" />
              </div>
            </div>

            <div className="dashboard-support-chat__footer">
              <div className="quick-suggestions">
                {DEFAULT_SUGGESTIONS.map((s, i) => (
                  <button key={i} className="quick-suggestions__item" onClick={() => handleSuggestion(s)}>{s}</button>
                ))}
              </div>

              <div className="chat-input__container">
                <input ref={inputRef} className="chat-input__field" type="text" placeholder="Digite sua dúvida sobre a dashboard..." aria-label="Mensagem para o suporte" onKeyDown={(e) => { if (e.key === 'Enter') handleSendFromInput(); }} />
                <button className="chat-input__send" onClick={handleSendFromInput} aria-label="Enviar mensagem"><Icons.Send /></button>
              </div>
              <div className="dashboard-support-chat__footer-note"><span>Suporte dedicado — Transita.IA</span></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="floating-button" aria-label={isOpen && !isMinimized ? 'Fechar chat' : 'Abrir chat'} onClick={toggleOpen}>
        <Icons.Message />
        {!isOpen && unreadCount > 0 && <span className="floating-button__badge" aria-hidden>{unreadCount > 9 ? '9+' : unreadCount}</span>}
      </button>
    </div>
  );
};

DashboardSupportChat.propTypes = {
  position: PropTypes.oneOf(['bottom-left','bottom-right','top-left','top-right']),
  autoOpen: PropTypes.bool,
  openDelay: PropTypes.number,
  onSendMessage: PropTypes.func,
  onError: PropTypes.func
};

export default DashboardSupportChat;
