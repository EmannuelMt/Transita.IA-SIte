# Sistema de Segurança Transita.IA

Este é um sistema completo de gestão de segurança implementado com base no documento de especificações de segurança. O sistema inclui autenticação robusta, autorização baseada em roles (RBAC), validação de dados, rate limiting, auditoria completa e proteção contra as principais vulnerabilidades OWASP Top 10.

## 🏗️ Arquitetura

### Backend (Node.js + Express + Firebase)
- **Autenticação**: JWT com RS256 + Refresh Tokens rotativos
- **Autorização**: RBAC (Role-Based Access Control)
- **Banco de Dados**: Firebase Firestore + Redis para cache/sessões
- **Validação**: Zod schemas + validação CNPJ/CEP real
- **Segurança**: OWASP Top 10 protection, rate limiting, CSP, HSTS
- **Auditoria**: Logs estruturados + trilha de auditoria completa

### Frontend (React + Vite)
- **Autenticação**: Firebase Auth + JWT
- **Interface Segura**: Componentes com validação client-side
- **Proteção**: CSRF protection, input sanitization
- **UX**: Feedback visual para estados de segurança

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+
- Redis (para cache e sessões)
- Firebase Project configurado
- Conta no Google Cloud (para Secret Manager)

### 1. Backend Setup

```bash
cd backend
npm install
```

#### Configuração das Variáveis de Ambiente

Crie o arquivo `.env`:

```env
# Firebase
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com

# JWT Secrets (use valores fortes em produção)
JWT_ACCESS_SECRET=your-super-secure-access-secret-here
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-here

# Redis
REDIS_URL=redis://localhost:6379

# Encryption
ENCRYPTION_KEY=your-32-character-encryption-key

# API
NODE_ENV=development
API_URL=http://localhost:3001/api
FRONTEND_URL=http://localhost:5173

# Security
ENABLE_VIRUS_SCAN=false
BLOCKED_COUNTRIES=CU,KP,IR
```

#### Inicializar Redis

```bash
# Usando Docker
docker run -d -p 6379:6379 redis:alpine

# Ou instalar localmente
# Windows: https://redis.io/download
# macOS: brew install redis
# Linux: apt install redis-server
```

#### Executar Backend

```bash
npm run dev  # Desenvolvimento com nodemon
npm start    # Produção
```

### 2. Frontend Setup

```bash
cd ../  # Raiz do projeto
npm install
```

#### Configuração Firebase (src/firebase/config.js)

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

#### Executar Frontend

```bash
npm run dev  # Desenvolvimento
npm run build  # Build para produção
```

## 🔐 Funcionalidades de Segurança Implementadas

### 1. Autenticação JWT com RS256
- Tokens de acesso curtos (15min)
- Refresh tokens rotativos com detecção de roubo
- Blacklist de tokens revogados
- Fingerprinting de dispositivo

### 2. Sistema RBAC Completo
- Roles: Super Admin, Company Admin, Manager, Employee, Viewer
- Permissões granulares por recurso
- Verificação de ownership
- Prevenção de IDOR (Insecure Direct Object References)

### 3. Validação de Dados
- Schemas Zod para todas as entradas
- Validação CNPJ real com APIs oficiais
- Validação CEP real com BrasilAPI/ViaCEP
- Sanitização automática de XSS

### 4. Rate Limiting e Bloqueio
- Rate limiting por IP/email/dispositivo
- Bloqueio progressivo por tentativas falhidas
- Bloqueio geográfico opcional
- Detecção de atividade suspeita

### 5. Proteções OWASP Top 10
- **A01:2021-Broken Access Control**: RBAC + verificação de ownership
- **A02:2021-Cryptographic Failures**: JWT RS256 + encryption
- **A03:2021-Injection**: Sanitização + prepared statements
- **A04:2021-Insecure Design**: Secure by design patterns
- **A05:2021-Security Misconfiguration**: Headers seguros + CSP
- **A06:2021-Vulnerable Components**: Dependências atualizadas
- **A07:2021-Identification/Authentication**: MFA ready + secure auth
- **A08:2021-Software Integrity**: Code signing + integrity checks
- **A09:2021-Logging/Monitoring**: Auditoria completa
- **A10:2021-SSRF**: Validação de URLs + allowlists

### 6. Auditoria e Monitoramento
- Logs estruturados em JSON
- Trilhas de auditoria imutáveis
- Alertas de segurança automáticos
- Métricas de performance

### 7. Upload Seguro
- Validação por magic bytes (não extensão)
- Scan de vírus opcional
- Metadados removidos de imagens
- URLs assinadas temporárias

## 📊 Endpoints da API

### Autenticação
```
POST /api/auth/login          # Login com JWT
POST /api/auth/refresh        # Refresh token
POST /api/auth/verify-session # Verificar sessão
GET  /api/auth/permissions    # Obter permissões do usuário
```

### Empresas
```
GET    /api/companies         # Listar empresas (admin)
POST   /api/companies         # Criar empresa
GET    /api/companies/:id     # Obter empresa
PUT    /api/companies/:id     # Atualizar empresa
DELETE /api/companies/:id     # Deletar empresa
```

### Funcionários
```
GET    /api/companies/:id/employees    # Listar funcionários
POST   /api/companies/:id/employees    # Convidar funcionário
PUT    /api/employees/:id              # Atualizar funcionário
DELETE /api/employees/:id              # Remover funcionário
```

### Convites
```
GET    /api/invites           # Listar convites
POST   /api/invites           # Criar convite
DELETE /api/invites/:id       # Revogar convite
POST   /api/invites/accept    # Aceitar convite
```

### Upload de Arquivos
```
POST   /api/upload            # Upload seguro
GET    /api/files/:id         # Download com URL assinada
DELETE /api/files/:id         # Deletar arquivo
```

### Auditoria
```
GET    /api/audit             # Logs de auditoria
GET    /api/security/events   # Eventos de segurança
```

## 🧪 Testes de Segurança

### Executar Testes Automatizados

```bash
# Backend
cd backend
npm test

# Testes específicos de segurança
npm run test:security

# Cobertura de testes
npm run test:coverage
```

### Checklist de Segurança Manual

Antes do deploy em produção, execute:

```bash
# Verificar checklist de segurança
node scripts/security-checklist.js

# Executar deploy seguro
node scripts/secure-deploy.js
```

## 🚀 Deploy em Produção

### 1. Configuração de Produção

```bash
# Usar Google Cloud Secret Manager
export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Configurar variáveis de produção
NODE_ENV=production
API_URL=https://api.transita.ai
FRONTEND_URL=https://app.transita.ai
```

### 2. Deploy Seguro

```bash
# Executar checklist e deploy
npm run secure-deploy
```

### 3. Monitoramento

- Logs no Google Cloud Logging
- Métricas no Cloud Monitoring
- Alertas no PagerDuty/Slack
- Auditoria em tempo real

## 🔧 Desenvolvimento

### Estrutura do Projeto

```
backend/
├── src/
│   ├── config/           # Configurações (Firebase, Redis, etc.)
│   ├── middleware/       # Middlewares de segurança
│   ├── models/          # Modelos de dados e roles
│   ├── services/        # Serviços de negócio
│   ├── validation/      # Validações e sanitização
│   ├── routes/          # Rotas da API
│   ├── utils/           # Utilitários (logger, etc.)
│   └── controllers/     # Controladores
├── scripts/             # Scripts de deploy e manutenção
└── tests/              # Testes automatizados

frontend/
├── src/
│   ├── components/      # Componentes React
│   ├── contexts/        # Contextos (Auth, etc.)
│   ├── services/        # Serviços API
│   ├── hooks/          # Hooks customizados
│   └── utils/          # Utilitários
```

### Adicionar Novos Recursos

1. **Backend**: Criar serviço em `src/services/`
2. **Frontend**: Criar componente em `src/components/`
3. **Segurança**: Adicionar permissões em `src/models/role.js`
4. **Testes**: Criar testes em `tests/`

## 📈 Monitoramento e Alertas

### Métricas Principais
- Taxa de sucesso de autenticação
- Tentativas de acesso não autorizado
- Performance de resposta da API
- Uso de recursos (CPU, memória)

### Alertas de Segurança
- Múltiplas falhas de login
- Acesso de IPs suspeitos
- Tentativas de injeção
- Violação de rate limits

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Código
- ESLint configurado
- Prettier para formatação
- Testes obrigatórios para novas features
- Revisão de segurança em PRs

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para detalhes.

## 🆘 Suporte

- **Documentação**: [docs.transita.ai](https://docs.transita.ai)
- **Issues**: [GitHub Issues](https://github.com/transita/transita-ia/issues)
- **Email**: security@transita.ai
- **Chat**: Discord/Telegram (convidado apenas)

## 🔒 Política de Segurança

Se você encontrou uma vulnerabilidade, por favor:

1. **NÃO** divulgue publicamente
2. Envie email para security@transita.ai
3. Inclua detalhes reprodutíveis
4. Aguarde confirmação antes de qualquer divulgação

Agradecemos sua ajuda para manter nossa plataforma segura!