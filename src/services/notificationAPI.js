const API_BASE_URL = 'http://localhost:3002/api';

class NotificationAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Headers padrão com autenticação
  getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  // Buscar notificações do usuário
  async getNotifications(page = 1, limit = 50) {
    try {
      const response = await fetch(`${this.baseURL}/notifications?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Não autorizado. Faça login para ver notificações');
        }
        throw new Error('Erro ao buscar notificações');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      throw error;
    }
  }

  // Buscar contagem de notificações não lidas
  async getUnreadCount() {
    try {
      const response = await fetch(`${this.baseURL}/notifications/unread-count`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 401) {
          return 0; // Retornar 0 se não autenticado
        }
        throw new Error('Erro ao buscar contagem de notificações');
      }

      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Erro ao buscar contagem:', error);
      return 0; // Retornar 0 em caso de erro
    }
  }

  // Criar nova notificação
  async createNotification(notificationData) {
    try {
      const response = await fetch(`${this.baseURL}/notifications`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(notificationData)
      });

      if (!response.ok) {
        throw new Error('Erro ao criar notificação');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao criar notificação:', error);
      throw error;
    }
  }

  // Marcar notificação como lida
  async markAsRead(notificationId) {
    try {
      const response = await fetch(`${this.baseURL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao marcar notificação como lida');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao marcar como lida:', error);
      throw error;
    }
  }

  // Marcar todas as notificações como lidas
  async markAllAsRead() {
    try {
      const response = await fetch(`${this.baseURL}/notifications/mark-all-read`, {
        method: 'PUT',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao marcar todas como lidas');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
      throw error;
    }
  }

  // Excluir notificação
  async deleteNotification(notificationId) {
    try {
      const response = await fetch(`${this.baseURL}/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir notificação');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao excluir notificação:', error);
      throw error;
    }
  }

  // Limpar todas as notificações
  async clearAllNotifications() {
    try {
      const response = await fetch(`${this.baseURL}/notifications`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao limpar notificações');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao limpar notificações:', error);
      throw error;
    }
  }

  // Buscar estatísticas das notificações
  async getNotificationStats() {
    try {
      const response = await fetch(`${this.baseURL}/notifications/stats`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar estatísticas');
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }
}

export default new NotificationAPI();