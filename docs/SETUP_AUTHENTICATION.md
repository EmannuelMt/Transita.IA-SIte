# Setup do Sistema de Autenticação - Transita.IA

## 📋 Requisitos

- Node.js >= 16
- npm ou yarn
- Firebase Project configurado

---

## 🚀 Instalação Backend

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente
Criar arquivo `.env` na pasta `backend`:

```env
# Ambiente
NODE_ENV=development
PORT=3002

# Firebase
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"transitaai-b4d4f",...}
FIREBASE_DATABASE_URL=https://transitaai-b4d4f-default-rtdb.firebaseio.com

# JWT
JWT_SECRET=sua-chave-secreta-muito-segura
JWT_EXPIRES_IN=24h

# Logs
LOG_LEVEL=debug
```

**Para obter FIREBASE_SERVICE_ACCOUNT:**
1. Ir para Firebase Console
2. Ir para Configurações do Projeto
3. Abrir aba "Contas de Serviço"
4. Clicar "Gerar Nova Chave Privada"
5. Copiar o JSON gerado

### 3. Instalar pacotes axios (se não instalado)
```bash
npm install axios
```

### 4. Iniciar servidor
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor estará disponível em: `http://localhost:3002/api`

---

## 🎨 Instalação Frontend

### 1. Instalar dependências
```bash
cd ..
npm install
```

### 2. Configurar variáveis de ambiente
Criar arquivo `.env.local` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3002/api
VITE_FIREBASE_API_KEY=AIzaSyA8CCv943Q_rpi47LBv6-S-woYnolFbcLM
VITE_FIREBASE_AUTH_DOMAIN=transitaai-b4d4f.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://transitaai-b4d4f-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=transitaai-b4d4f
```

### 3. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

---

## ✅ Testes de Funcionamento

### 1. Testar Login
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### 2. Testar Validação de CNPJ
```bash
curl -X POST http://localhost:3002/api/auth/validate-cnpj \
  -H "Content-Type: application/json" \
  -d '{
    "cnpj": "11.222.333/0001-81"
  }'
```

### 3. Testar Validação de CEP
```bash
curl -X POST http://localhost:3002/api/auth/validate-cep \
  -H "Content-Type: application/json" \
  -d '{
    "cep": "01310-100"
  }'
```

---

## 📁 Estrutura de Diretórios

```
Transita.IA/
├── backend/
│   ├── src/
│   │   ├── authService.js          # Lógica de autenticação
│   │   ├── authRoutes.js            # Rotas de API
│   │   ├── validationService.js     # Validação CNPJ/CEP
│   │   ├── inviteTokenService.js    # Gerenciamento de tokens
│   ├── userService.js               # Banco de dados em memória
│   ├── server.js                    # Servidor Express
│   ├── package.json
│   └── .env
├── src/
│   ├── components/
│   │   └── Auth/
│   │       ├── Login.jsx             # Componente de login atualizado
│   │       └── Login.css
│   ├── hooks/
│   │   ├── useAuth.js               # Hook para autenticação
│   │   └── useValidation.js         # Hook para validações
│   ├── services/
│   │   └── api.js                   # Cliente HTTP configurado
│   └── ...
└── .env.local
```

---

## 🔐 Segurança

### Boas Práticas Implementadas

1. **Senhas com Hash**
   - Usando bcrypt com salt 12
   - Nunca armazenar senhas em texto plano

2. **JWT com Expiração**
   - Tokens expiram em 24h
   - Implementar refresh token em produção

3. **Validação de Token**
   - Todos endpoints autenticados verificam JWT
   - Rejeita tokens inválidos ou expirados

4. **Validação de Dados**
   - Email com regex
   - CNPJ via API da Receita Federal
   - CEP via BrasilAPI
   - Força de senha verificada

5. **CORS Habilitado**
   - Restrito ao frontend (http://localhost:5173)
   - Adicionar domínios de produção no `.env`

6. **Rate Limiting**
   - Configurado para 100 requisições a cada 15 minutos
   - Ajustar conforme necessário

---

## 🐛 Troubleshooting

### Erro: "EADDRINUSE: address already in use"
```bash
# Matar processo na porta 3002
lsof -ti:3002 | xargs kill -9

# Ou mudar porta no .env
PORT=3003
```

### Erro: "Firebase initialization failed"
- Verificar se FIREBASE_SERVICE_ACCOUNT está válido no .env
- Verificar se a chave privada foi gerada corretamente

### Erro: "CNPJ validation failed"
- BrasilAPI pode estar indisponível
- Implementar retry com backoff exponencial em produção

### Erro: "Token inválido" após fazer login
- Verificar se JWT_SECRET é o mesmo no backend
- Limpar localStorage e tentar novamente

---

## 📱 Endpoints Disponíveis

**Públicos (sem autenticação):**
- `POST /auth/login`
- `POST /auth/register/company`
- `POST /auth/register/employee`
- `GET /auth/validate-email/:email`
- `POST /auth/validate-cnpj`
- `POST /auth/validate-cep`
- `POST /auth/validate-password`

**Autenticados (requer Bearer token):**
- `GET /auth/profile`
- `PUT /auth/profile`
- `PUT /auth/change-password`
- `POST /auth/invite-token`
- `GET /auth/invite-tokens`

---

## 🚀 Deploy em Produção

### Backend (Node.js)
```bash
# Usar pm2 para manter processo rodando
npm install -g pm2
pm2 start server.js --name "transita-backend"
pm2 save
pm2 startup

# Ou usar Docker
docker build -t transita-backend .
docker run -p 3002:3002 transita-backend
```

### Frontend (Vite)
```bash
# Build
npm run build

# Servir com servidor estático
npm install -g serve
serve -s dist

# Ou usar Vercel/Netlify
vercel deploy
```

---

## 📊 Monitoramento

### Logs do Backend
```bash
# Ver logs em tempo real
npm run dev

# Ou com pm2
pm2 logs transita-backend
```

### Monitorar Erros
- Implementar Sentry ou similar
- Monitorar rate limiting
- Verificar falhas de autenticação

---

## 📝 Próximas Implementações

- [ ] Refresh tokens para sessões mais longas
- [ ] Two-factor authentication (2FA)
- [ ] OAuth com Google/Microsoft
- [ ] Email verification
- [ ] Password reset via email
- [ ] Auditoria de login
- [ ] Rate limiting mais granular
- [ ] Sincronização com banco de dados real (PostgreSQL/MongoDB)

---

## 📚 Documentação Adicional

- [API Documentation](./API_DOCUMENTATION.md)
- [BrasilAPI Docs](https://brasilapi.com.br)
- [Firebase Docs](https://firebase.google.com/docs)
- [Express Docs](https://expressjs.com)
- [React Docs](https://react.dev)

---

**Última atualização:** 8 de janeiro de 2026  
**Versão:** 1.0.0
