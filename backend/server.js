const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const cron = require('node-cron');
require('dotenv').config();

const notificationService = require('./notificationService');
const authRoutes = require('./src/authRoutes');
const authService = require('./src/authService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3002;

// Configuração de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-device-fingerprint', 'x-csrf-token', 'x-request-id'],
  credentials: false, // JWT no header, não precisa credentials
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
// Increase JSON body size to allow DataURL uploads for avatars
app.use(express.json({ limit: '8mb' }));

// Auth Routes
app.use('/api/auth', authRoutes);

// WebSocket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join user room for targeted notifications
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined room`);
  });

  // Handle real-time notification actions
  socket.on('markAsRead', (data) => {
    const { userId, notificationId } = data;
    const notification = notificationService.markAsRead(userId, notificationId);
    if (notification) {
      io.to(userId).emit('notificationUpdated', notification);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Transita.IA Backend API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Notification Routes
app.get('/api/notifications', authService.authenticateToken, (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const result = notificationService.getUserNotifications(
      req.user.userId,
      parseInt(page),
      parseInt(limit)
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar notificações' });
  }
});

app.get('/api/notifications/unread-count', authService.authenticateToken, (req, res) => {
  try {
    const count = notificationService.getUnreadCount(req.user.userId);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar contagem de notificações' });
  }
});

app.post('/api/notifications', authService.authenticateToken, (req, res) => {
  try {
    const { type, title, message, actionUrl } = req.body;

    if (!type || !title || !message) {
      return res.status(400).json({ error: 'Tipo, título e mensagem são obrigatórios' });
    }

    const notification = notificationService.createNotification(req.user.userId, {
      type,
      title,
      message,
      actionUrl
    });

    // Emitir notificação em tempo real
    io.to(req.user.userId).emit('newNotification', notification);

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar notificação' });
  }
});

app.put('/api/notifications/:id/read', authService.authenticateToken, (req, res) => {
  try {
    const notification = notificationService.markAsRead(req.user.userId, req.params.id);

    if (!notification) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }

    // Emitir atualização em tempo real
    io.to(req.user.userId).emit('notificationUpdated', notification);

    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao marcar notificação como lida' });
  }
});

app.put('/api/notifications/mark-all-read', authService.authenticateToken, (req, res) => {
  try {
    const count = notificationService.markAllAsRead(req.user.userId);

    // Emitir atualização em tempo real
    io.to(req.user.userId).emit('allNotificationsRead', { count });

    res.json({ message: `${count} notificações marcadas como lidas` });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao marcar notificações como lidas' });
  }
});

app.delete('/api/notifications/:id', authService.authenticateToken, (req, res) => {
  try {
    const deleted = notificationService.deleteNotification(req.user.userId, req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }

    // Emitir exclusão em tempo real
    io.to(req.user.userId).emit('notificationDeleted', { id: req.params.id });

    res.json({ message: 'Notificação excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir notificação' });
  }
});

app.delete('/api/notifications', authService.authenticateToken, (req, res) => {
  try {
    const count = notificationService.clearAllNotifications(req.user.userId);

    // Emitir limpeza em tempo real
    io.to(req.user.userId).emit('allNotificationsCleared', { count });

    res.json({ message: `${count} notificações excluídas` });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao limpar notificações' });
  }
});

app.get('/api/notifications/stats', authService.authenticateToken, (req, res) => {
  try {
    const stats = notificationService.getNotificationStats(req.user.userId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

// Placeholder routes for removed features
app.get('/api/users/status', (req, res) => {
  res.json({ message: 'User status endpoint - placeholder' });
});

app.post('/api/auth/refresh', (req, res) => {
  res.json({ message: 'Token refresh endpoint - placeholder' });
});

app.get('/api/users/me/export', (req, res) => {
  res.json({ message: 'Data export endpoint - placeholder' });
});

// Simular notificações automáticas a cada 30 segundos
cron.schedule('*/30 * * * * *', () => {
  // Simular para usuário 'user1'
  const notification = notificationService.simulateSystemNotifications('user1');
  if (notification) {
    io.to('user1').emit('newNotification', notification);
    console.log('Notificação automática criada:', notification.title);
  }
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready for real-time notifications`);
});