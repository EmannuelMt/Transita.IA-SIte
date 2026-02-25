const { v4: uuidv4 } = require('uuid');

// Simulação de banco de dados em memória (em produção, use um banco real)
let notifications = [
  {
    id: uuidv4(),
    userId: 'user1', // ID do usuário (em produção, seria o ID real)
    type: 'info',
    title: 'Bem-vindo ao Transita.AI!',
    message: 'Explore todas as funcionalidades disponíveis na plataforma.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    actionUrl: '/dashboard'
  },
  {
    id: uuidv4(),
    userId: 'user1',
    type: 'warning',
    title: 'Manutenção Programada',
    message: 'Sistema ficará indisponível amanhã das 02:00 às 04:00.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    actionUrl: null
  },
  {
    id: uuidv4(),
    userId: 'user1',
    type: 'success',
    title: 'Relatório Gerado',
    message: 'Seu relatório mensal de frota foi gerado com sucesso.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    read: false,
    actionUrl: '/relatorios'
  }
];

class NotificationService {
  // Obter notificações de um usuário
  getUserNotifications(userId, page = 1, limit = 50) {
    const userNotifications = notifications
      .filter(notification => notification.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      notifications: userNotifications.slice(startIndex, endIndex),
      total: userNotifications.length,
      page,
      limit,
      totalPages: Math.ceil(userNotifications.length / limit)
    };
  }

  // Obter contagem de notificações não lidas
  getUnreadCount(userId) {
    return notifications.filter(
      notification => notification.userId === userId && !notification.read
    ).length;
  }

  // Criar nova notificação
  createNotification(userId, notificationData) {
    const notification = {
      id: uuidv4(),
      userId,
      timestamp: new Date(),
      read: false,
      ...notificationData
    };

    notifications.push(notification);
    return notification;
  }

  // Marcar notificação como lida
  markAsRead(userId, notificationId) {
    const notification = notifications.find(
      n => n.id === notificationId && n.userId === userId
    );

    if (notification) {
      notification.read = true;
      return notification;
    }

    return null;
  }

  // Marcar todas as notificações como lidas
  markAllAsRead(userId) {
    const userNotifications = notifications.filter(n => n.userId === userId);
    userNotifications.forEach(notification => {
      notification.read = true;
    });

    return userNotifications.length;
  }

  // Excluir notificação
  deleteNotification(userId, notificationId) {
    const index = notifications.findIndex(
      n => n.id === notificationId && n.userId === userId
    );

    if (index !== -1) {
      notifications.splice(index, 1);
      return true;
    }

    return false;
  }

  // Limpar todas as notificações de um usuário
  clearAllNotifications(userId) {
    const initialLength = notifications.length;
    notifications = notifications.filter(n => n.userId !== userId);
    return initialLength - notifications.length;
  }

  // Criar notificação automática (sistema)
  createSystemNotification(userId, type, title, message, actionUrl = null) {
    return this.createNotification(userId, {
      type,
      title,
      message,
      actionUrl
    });
  }

  // Simular notificações automáticas do sistema
  simulateSystemNotifications(userId) {
    const systemNotifications = [
      {
        type: 'info',
        title: 'Atualização do Sistema',
        message: 'Nova versão disponível. Atualize para aproveitar as melhorias.',
        actionUrl: '/atualizacoes'
      },
      {
        type: 'warning',
        title: 'Alerta de Frota',
        message: 'Veículo ABC-1234 apresenta anomalia no motor.',
        actionUrl: '/frota/ABC-1234'
      },
      {
        type: 'success',
        title: 'Pagamento Confirmado',
        message: 'Pagamento mensal processado com sucesso.',
        actionUrl: '/financeiro'
      },
      {
        type: 'error',
        title: 'Falha na Sincronização',
        message: 'Erro ao sincronizar dados com o servidor.',
        actionUrl: '/configuracoes'
      }
    ];

    // 20% de chance de criar uma notificação do sistema
    if (Math.random() < 0.2) {
      const randomNotification = systemNotifications[Math.floor(Math.random() * systemNotifications.length)];
      return this.createSystemNotification(userId, randomNotification.type, randomNotification.title, randomNotification.message, randomNotification.actionUrl);
    }

    return null;
  }

  // Obter estatísticas das notificações
  getNotificationStats(userId) {
    const userNotifications = notifications.filter(n => n.userId === userId);

    return {
      total: userNotifications.length,
      unread: userNotifications.filter(n => !n.read).length,
      read: userNotifications.filter(n => n.read).length,
      byType: {
        info: userNotifications.filter(n => n.type === 'info').length,
        warning: userNotifications.filter(n => n.type === 'warning').length,
        success: userNotifications.filter(n => n.type === 'success').length,
        error: userNotifications.filter(n => n.type === 'error').length
      }
    };
  }
}

module.exports = new NotificationService();