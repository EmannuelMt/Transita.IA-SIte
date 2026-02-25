import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import notificationAPI from '../services/notificationAPI';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Calcular notificações não lidas
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Carregar notificações do backend
  const loadNotifications = useCallback(async () => {
    try {
      // Verificar se há token (usuário autenticado)
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Usuário não autenticado. Pulando carregamento de notificações.');
        setNotifications([]);
        return;
      }

      setLoading(true);
      setError(null);
      const data = await notificationAPI.getNotifications();
      setNotifications(data.notifications || []);
    } catch (err) {
      if (err.message.includes('Não autorizado')) {
        console.log('Token inválido ou expirado');
        setNotifications([]);
      } else {
        setError('Erro ao carregar notificações');
      }
      console.error('Erro ao carregar notificações:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar contagem de notificações não lidas
  const loadUnreadCount = useCallback(async () => {
    try {
      const count = await notificationAPI.getUnreadCount();
      // Atualizar apenas a contagem, sem recarregar todas as notificações
    } catch (err) {
      console.error('Erro ao carregar contagem:', err);
    }
  }, []);

  // Inicializar WebSocket
  useEffect(() => {
    const socketConnection = io('http://localhost:3002', {
      transports: ['websocket', 'polling']
    });

    socketConnection.on('connect', () => {
      console.log('Conectado ao servidor de notificações');
      // Join user room (em produção, usar ID real do usuário)
      socketConnection.emit('join', 'user1');
    });

    socketConnection.on('newNotification', (notification) => {
      console.log('Nova notificação recebida:', notification);
      setNotifications(prev => [notification, ...prev]);
    });

    socketConnection.on('notificationUpdated', (updatedNotification) => {
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === updatedNotification.id
            ? updatedNotification
            : notification
        )
      );
    });

    socketConnection.on('notificationDeleted', (data) => {
      setNotifications(prev =>
        prev.filter(notification => notification.id !== data.id)
      );
    });

    socketConnection.on('allNotificationsRead', () => {
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    });

    socketConnection.on('allNotificationsCleared', () => {
      setNotifications([]);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  // Carregar notificações na inicialização
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.log('[NotificationContext] Sem token, pulando carregamento de notificações');
      setNotifications([]);
      setLoading(false);
      return;
    }

    // Aguardar um pouco para garantir que o localStorage está pronto
    const timer = setTimeout(() => {
      loadNotifications();
    }, 500);

    return () => clearTimeout(timer);
  }, [loadNotifications]);

  // Marcar notificação como lida
  const markAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error('Erro ao marcar como lida:', err);
      setError('Erro ao marcar notificação como lida');
    }
  };

  // Marcar todas como lidas
  const markAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, read: true }))
      );
    } catch (err) {
      console.error('Erro ao marcar todas como lidas:', err);
      setError('Erro ao marcar todas as notificações como lidas');
    }
  };

  // Excluir notificação
  const deleteNotification = async (id) => {
    try {
      await notificationAPI.deleteNotification(id);
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    } catch (err) {
      console.error('Erro ao excluir notificação:', err);
      setError('Erro ao excluir notificação');
    }
  };

  // Limpar todas as notificações
  const clearAllNotifications = async () => {
    try {
      await notificationAPI.clearAllNotifications();
      setNotifications([]);
    } catch (err) {
      console.error('Erro ao limpar notificações:', err);
      setError('Erro ao limpar todas as notificações');
    }
  };

  // Adicionar nova notificação (para testes ou sistema)
  const addNotification = async (notificationData) => {
    try {
      const newNotification = await notificationAPI.createNotification(notificationData);
      setNotifications(prev => [newNotification, ...prev]);
      return newNotification;
    } catch (err) {
      console.error('Erro ao criar notificação:', err);
      setError('Erro ao criar notificação');
      throw err;
    }
  };

  // Recarregar notificações
  const refreshNotifications = () => {
    loadNotifications();
  };

  const value = {
    notifications,
    unreadCount,
    isPanelOpen,
    setIsPanelOpen,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addNotification,
    refreshNotifications,
    loadUnreadCount
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};