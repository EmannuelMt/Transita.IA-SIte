import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import './GlobalChatWidget.scss';

// Ícones customizados (evitando dependências externas para produção)
const Icons = {
  MessageSquare: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 10H16M8 14H12M21 12C21 16.9706 16.9706 21 12 21C10.5 21 9.1 20.7 7.8 20.1L3 21L4.9 16.2C4.3 14.9 4 13.5 4 12C4 7.02944 7.02944 4 12 4C16.9706 4 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  X: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Minus: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M18 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Send: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Cpu: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M9 3V6M15 3V6M9 18V21M15 18V21M3 9H6M3 15H6M18 9H21M18 15H21M6 6H18V18H6V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  User: ({ size = 24, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  Check: ({ size = 20, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
};

// Constantes
const WIDGET_CONSTANTS = {
  MAX_MESSAGE_LENGTH: 2000,
  ANIMATION_DURATION: 0.3,
  WIDGET_WIDTH: 380,
  WIDGET_HEIGHT: 520,
  INITIAL_MESSAGE: 'Olá! Sou o assistente virtual da Transita.IA. Como posso ajudar você a navegar em nossa plataforma hoje?',
  ERROR_MESSAGE: 'Estou com dificuldades de conexão no momento. Tente novamente em instantes.',
  TYPING_INDICATOR_DELAY: 500
};

// Tipos
const MessageRole = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
};

// Componente de Avatar
const Avatar = ({ role, size = 'md', className = '' }) => {
  const getAvatarContent = () => {
    switch (role) {
      case MessageRole.USER:
        return <Icons.User size={size === 'sm' ? 14 : 18} />;
      case MessageRole.ASSISTANT:
        return <Icons.Cpu size={size === 'sm' ? 14 : 18} />;
      default:
        return <Icons.Cpu size={size === 'sm' ? 14 : 18} />;
    }
  };

  const avatarClass = `chat-avatar chat-avatar--${role} chat-avatar--${size} ${className}`;

  return (
    <div className={avatarClass} aria-hidden="true">
      {getAvatarContent()}
    </div>
  );
};

Avatar.propTypes = {
  role: PropTypes.oneOf([MessageRole.USER, MessageRole.ASSISTANT, MessageRole.SYSTEM]).isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};

// Componente de Indicador de Digitação
const TypingIndicator = () => (
  <div className="typing-indicator" aria-label="Assistente está digitando">
    <div className="typing-indicator__dots">
      <span className="typing-indicator__dot" />
      <span className="typing-indicator__dot" />
      <span className="typing-indicator__dot" />
    </div>
  </div>
);

// Componente de Mensagem
const MessageBubble = ({ message, isLast }) => {
  const formatTime = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const bubbleClass = `message-bubble message-bubble--${message.role} ${
    message.status === 'error' ? 'message-bubble--error' : ''
  } ${isLast ? 'message-bubble--last' : ''}`;

  return (
    <div className={`message-wrapper message-wrapper--${message.role}`}>
      <div className="message-wrapper__avatar">
        <Avatar role={message.role} size="sm" />
      </div>

      <div className="message-wrapper__content">
        <div className={bubbleClass}>
          <div className="message-bubble__text">
            {message.content}
          </div>
          
          <div className="message-bubble__footer">
            <span className="message-bubble__time">
              {formatTime(message.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

MessageBubble.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.oneOf([MessageRole.USER, MessageRole.ASSISTANT, MessageRole.SYSTEM]).isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.instanceOf(Date).isRequired,
    status: PropTypes.oneOf(['sending', 'sent', 'error'])
  }).isRequired,
  isLast: PropTypes.bool
};

// Componente de Input
const ChatInput = ({ onSend, isLoading, disabled }) => {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    if (value.length <= WIDGET_CONSTANTS.MAX_MESSAGE_LENGTH) {
      setInput(value);
    }
  }, []);

  const handleSend = useCallback(() => {
    if (input.trim() && !isLoading && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  }, [input, isLoading, disabled, onSend]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  return (
    <div className={`chat-input ${isFocused ? 'chat-input--focused' : ''}`}>
      <div className="chat-input__container">
        <input
          ref={inputRef}
          type="text"
          className="chat-input__field"
          placeholder="Como posso ajudar?"
          value={input}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading || disabled}
          aria-label="Mensagem para o assistente"
        />

        <button
          className={`chat-input__send ${(!input.trim() || isLoading || disabled) ? 'chat-input__send--disabled' : ''}`}
          onClick={handleSend}
          disabled={!input.trim() || isLoading || disabled}
          aria-label="Enviar mensagem"
        >
          {isLoading ? (
            <span className="chat-input__spinner" />
          ) : (
            <Icons.Send size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool
};

// Componente de Cabeçalho
const ChatHeader = ({ title, status, onClose }) => {
  return (
    <div className="chat-header">
      <div className="chat-header__info">
        <div className="chat-header__avatar">
          <Avatar role={MessageRole.ASSISTANT} size="md" />
        </div>
        
        <div className="chat-header__details">
          <h3 className="chat-header__title">{title}</h3>
          <div className="chat-header__status">
            <span className="chat-header__status-indicator" />
            <span className="chat-header__status-text">{status}</span>
          </div>
        </div>
      </div>

      <button 
        className="chat-header__close"
        onClick={onClose}
        aria-label="Fechar chat"
        title="Fechar chat"
      >
        <Icons.Minus size={18} />
      </button>
    </div>
  );
};

ChatHeader.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

// Componente de Botão Flutuante
const FloatingButton = ({ isOpen, onClick, unreadCount }) => {
  return (
    <motion.button
      className={`floating-button ${isOpen ? 'floating-button--open' : 'floating-button--closed'}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      title={isOpen ? 'Fechar chat' : 'Abrir chat'}
    >
      {isOpen ? <Icons.X size={24} /> : <Icons.MessageSquare size={24} />}
      
      {!isOpen && unreadCount > 0 && (
        <span className="floating-button__badge">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </motion.button>
  );
};

FloatingButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  unreadCount: PropTypes.number
};

// Componente Principal
const GlobalChatWidget = ({
  title = 'Concierge Transita',
  status = 'Online',
  initialMessage = WIDGET_CONSTANTS.INITIAL_MESSAGE,
  onSendMessage,
  onError,
  position = 'bottom-left',
  autoOpen = false,
  openDelay = 3000
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: MessageRole.ASSISTANT,
      content: initialMessage,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const widgetRef = useRef(null);

  const generateMessageId = useCallback(() => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen, scrollToBottom]);

  useEffect(() => {
    if (autoOpen && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, openDelay);

      return () => clearTimeout(timer);
    }
  }, [autoOpen, isOpen, openDelay]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSend = useCallback(async (content) => {
    const userMessage = {
      id: generateMessageId(),
      role: MessageRole.USER,
      content,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Atualizar status da mensagem do usuário
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );

      // Chamar API ou callback
      let response;
      if (onSendMessage) {
        response = await onSendMessage(content);
      } else {
        // Fallback para serviço mock
        const { generateResponse } = await import('../../services/aiClient');
        response = await generateResponse(content);
      }

      const assistantMessage = {
        id: generateMessageId(),
        role: MessageRole.ASSISTANT,
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Global Chat Error:', error);
      
      // Marcar mensagem do usuário como erro
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'error' }
            : msg
        )
      );

      // Adicionar mensagem de erro do assistente
      const errorMessage = {
        id: generateMessageId(),
        role: MessageRole.ASSISTANT,
        content: WIDGET_CONSTANTS.ERROR_MESSAGE,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [generateMessageId, isOpen, onSendMessage, onError]);

  const handleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const widgetClasses = [
    'global-chat-widget',
    `global-chat-widget--${position}`,
    isOpen && 'global-chat-widget--open'
  ].filter(Boolean).join(' ');

  return (
    <div ref={widgetRef} className={widgetClasses}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="global-chat-widget__window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: WIDGET_CONSTANTS.ANIMATION_DURATION }}
          >
            <ChatHeader
              title={title}
              status={status}
              onClose={() => setIsOpen(false)}
            />

            <div className="global-chat-widget__messages">
              <div className="global-chat-widget__messages-container">
                <AnimatePresence initial={false}>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MessageBubble
                        message={message}
                        isLast={index === messages.length - 1}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="message-wrapper message-wrapper--assistant">
                      <div className="message-wrapper__avatar">
                        <Avatar role={MessageRole.ASSISTANT} size="sm" />
                      </div>
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} className="global-chat-widget__scroll-anchor" />
              </div>
            </div>

            <div className="global-chat-widget__footer">
              <ChatInput
                onSend={handleSend}
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <FloatingButton
        isOpen={isOpen}
        onClick={handleOpen}
        unreadCount={unreadCount}
      />
    </div>
  );
};

GlobalChatWidget.propTypes = {
  title: PropTypes.string,
  status: PropTypes.string,
  initialMessage: PropTypes.string,
  onSendMessage: PropTypes.func,
  onError: PropTypes.func,
  position: PropTypes.oneOf(['bottom-right', 'bottom-left', 'top-right', 'top-left']),
  autoOpen: PropTypes.bool,
  openDelay: PropTypes.number
};

export default GlobalChatWidget;