# API de Autenticação - Transita.IA

## Base URL
```
http://localhost:3002/api
```

## Endpoints de Autenticação

### 1. Login
**POST** `/auth/login`

Autentica um usuário (Empresa ou Funcionário).

**Request Body:**
```json
{
  "email": "usuario@empresa.com",
  "password": "senha_segura_123"
}
```

**Success Response (200):**
```json
{
  "user": {
    "id": "user_uuid",
    "email": "usuario@empresa.com",
    "role": "COMPANY",
    "companyId": "comp_uuid"
  },
  "token": "eyJhbGc...",
  "expiresIn": "24h",
  "company": {
    "id": "comp_uuid",
    "name": "Empresa ABC",
    "cnpj": "12.345.678/0001-90",
    "city": "São Paulo",
    "state": "SP"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Email ou senha incorretos",
  "code": "AUTH_LOGIN_FAILED"
}
```

---

### 2. Registrar Empresa
**POST** `/auth/register/company`

Registra uma nova empresa com validação de CNPJ via BrasilAPI.

**Request Body:**
```json
{
  "name": "Minha Empresa",
  "email": "admin@empresa.com",
  "password": "SenhaForte123!",
  "cnpj": "12.345.678/0001-90",
  "cep": "01310-100",
  "phone": "11987654321"
}
```

**Validações Realizadas:**
- ✅ Email já não deve estar cadastrado
- ✅ Senha deve ter mínimo 8 caracteres com maiúsculas, minúsculas e números
- ✅ CNPJ deve ser válido na Receita Federal
- ✅ Empresa deve ter mais de 6 meses de existência
- ✅ CEP é validado e preenche automaticamente endereço

**Success Response (201):**
```json
{
  "user": {
    "id": "user_uuid",
    "email": "admin@empresa.com",
    "role": "COMPANY",
    "companyId": "comp_uuid"
  },
  "company": {
    "id": "comp_uuid",
    "name": "Minha Empresa",
    "cnpj": "12.345.678/0001-90",
    "city": "São Paulo",
    "state": "SP"
  },
  "token": "eyJhbGc...",
  "expiresIn": "24h",
  "message": "Empresa registrada com sucesso"
}
```

**Error Response (400):**
```json
{
  "error": "Empresas com menos de 6 meses de existência não são aceitas",
  "code": "COMPANY_REGISTRATION_FAILED"
}
```

---

### 3. Registrar Funcionário
**POST** `/auth/register/employee`

Registra um novo funcionário usando um token de convite válido.

**Request Body:**
```json
{
  "name": "João Silva",
  "email": "joao@empresa.com",
  "password": "SenhaForte123!",
  "phone": "11987654321",
  "position": "Motorista",
  "inviteToken": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Validações Realizadas:**
- ✅ Token de convite deve ser válido e não utilizado
- ✅ Token não deve estar expirado
- ✅ Email não deve estar cadastrado
- ✅ Senha deve atender critérios de força

**Success Response (201):**
```json
{
  "user": {
    "id": "user_uuid",
    "email": "joao@empresa.com",
    "role": "EMPLOYEE",
    "companyId": "comp_uuid"
  },
  "employee": {
    "id": "emp_uuid",
    "name": "João Silva",
    "position": "Motorista",
    "companyId": "comp_uuid"
  },
  "company": {
    "id": "comp_uuid",
    "name": "Minha Empresa"
  },
  "token": "eyJhbGc...",
  "expiresIn": "24h",
  "message": "Funcionário registrado com sucesso"
}
```

**Error Response (400):**
```json
{
  "error": "Este token já foi utilizado e não pode ser reutilizado",
  "code": "EMPLOYEE_REGISTRATION_FAILED"
}
```

---

## Endpoints Autenticados

> ⚠️ Todos os endpoints abaixo requerem **Bearer Token** no header `Authorization`

```
Authorization: Bearer <seu_token_aqui>
```

---

### 4. Obter Perfil
**GET** `/auth/profile`

Recupera dados do perfil do usuário autenticado.

**Success Response (200):**
```json
{
  "id": "user_uuid",
  "email": "usuario@empresa.com",
  "role": "COMPANY",
  "companyId": "comp_uuid",
  "isActive": true,
  "company": {
    "id": "comp_uuid",
    "name": "Empresa ABC",
    "cnpj": "12.345.678/0001-90",
    "city": "São Paulo",
    "state": "SP",
    ...
  }
}
```

---

### 5. Atualizar Perfil
**PUT** `/auth/profile`

Atualiza dados do perfil do usuário.

**Request Body:**
```json
{
  "name": "Novo Nome",
  "phone": "11987654321",
  "position": "Gerente"
}
```

**Success Response (200):** Retorna perfil atualizado (igual ao endpoint de GET perfil)

---

### 6. Alterar Senha
**PUT** `/auth/change-password`

Altera a senha do usuário autenticado.

**Request Body:**
```json
{
  "currentPassword": "senhaAtual123",
  "newPassword": "novaSenhaForte123!"
}
```

**Validações:**
- ✅ Senha atual deve estar correta
- ✅ Nova senha deve atender critérios de força

**Success Response (200):**
```json
{
  "message": "Senha alterada com sucesso"
}
```

---

### 7. Gerar Token de Convite
**POST** `/auth/invite-token`

Gera um novo token de convite para funcionários (apenas admins de empresa).

**Request Body:**
```json
{
  "expiresInDays": 30
}
```

**Success Response (201):**
```json
{
  "token": "550e8400-e29b-41d4-a716-446655440000",
  "expiresAt": "2024-02-10T15:30:00.000Z",
  "companyId": "comp_uuid"
}
```

**Error Response (403):**
```json
{
  "error": "Apenas administradores da empresa podem gerar tokens",
  "code": "INVITE_TOKEN_GENERATION_FAILED"
}
```

---

### 8. Listar Tokens de Convite
**GET** `/auth/invite-tokens`

Lista todos os tokens de convite da empresa (apenas admin).

**Success Response (200):**
```json
[
  {
    "id": "token_id",
    "token": "550e8400...",
    "createdAt": "2024-01-10T15:30:00.000Z",
    "expiresAt": "2024-02-10T15:30:00.000Z",
    "usedAt": "2024-01-15T10:00:00.000Z",
    "usedBy": "joao@empresa.com",
    "isActive": true,
    "isUsed": true,
    "isExpired": false
  }
]
```

---

## Endpoints de Validação (Públicos)

### 9. Validar Email
**GET** `/auth/validate-email/:email`

Valida o formato de um email.

**Response (200):**
```json
{
  "email": "user@example.com",
  "isValid": true,
  "message": "Email válido"
}
```

---

### 10. Validar CNPJ
**POST** `/auth/validate-cnpj`

Valida CNPJ via BrasilAPI e retorna dados da empresa.

**Request Body:**
```json
{
  "cnpj": "12.345.678/0001-90"
}
```

**Success Response (200):**
```json
{
  "cnpj": "12.345.678/0001-90",
  "name": "Nome Fantasia",
  "legalName": "Razão Social Completa",
  "city": "São Paulo",
  "state": "SP",
  "valid": true
}
```

---

### 11. Validar CEP
**POST** `/auth/validate-cep`

Valida CEP via BrasilAPI e retorna dados de endereço.

**Request Body:**
```json
{
  "cep": "01310-100"
}
```

**Success Response (200):**
```json
{
  "cep": "01310-100",
  "street": "Avenida Paulista",
  "neighborhood": "Bela Vista",
  "city": "São Paulo",
  "state": "SP",
  "valid": true
}
```

---

### 12. Validar Senha
**POST** `/auth/validate-password`

Valida força da senha.

**Request Body:**
```json
{
  "password": "SenhaForte123!"
}
```

**Success Response (200):**
```json
{
  "isValid": true,
  "strength": "forte",
  "message": "Senha válida"
}
```

**Força possível:** `fraca`, `media`, `forte`

---

## Códigos de Erro

| Código | Status | Descrição |
|--------|--------|-----------|
| `AUTH_LOGIN_FAILED` | 401 | Email ou senha incorretos |
| `COMPANY_REGISTRATION_FAILED` | 400 | Falha ao registrar empresa |
| `EMPLOYEE_REGISTRATION_FAILED` | 400 | Falha ao registrar funcionário |
| `PROFILE_NOT_FOUND` | 404 | Perfil não encontrado |
| `PROFILE_UPDATE_FAILED` | 400 | Falha ao atualizar perfil |
| `PASSWORD_CHANGE_FAILED` | 400 | Falha ao alterar senha |
| `INVITE_TOKEN_GENERATION_FAILED` | 403 | Falha ao gerar token |
| `INVITE_TOKENS_LIST_FAILED` | 403 | Falha ao listar tokens |
| `EMAIL_VALIDATION_FAILED` | 400 | Falha na validação de email |
| `CNPJ_VALIDATION_FAILED` | 400 | Falha na validação de CNPJ |
| `CEP_VALIDATION_FAILED` | 400 | Falha na validação de CEP |
| `PASSWORD_VALIDATION_FAILED` | 400 | Falha na validação de senha |

---

## Headers Requeridos

```
Content-Type: application/json
Authorization: Bearer <token> (para endpoints autenticados)
```

---

## Exemplos de Uso com cURL

### Login
```bash
curl -X POST http://localhost:3002/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@empresa.com",
    "password": "senha123"
  }'
```

### Registrar Empresa
```bash
curl -X POST http://localhost:3002/api/auth/register/company \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Empresa ABC",
    "email": "admin@empresa.com",
    "password": "SenhaForte123!",
    "cnpj": "12.345.678/0001-90"
  }'
```

### Obter Perfil (com token)
```bash
curl -X GET http://localhost:3002/api/auth/profile \
  -H "Authorization: Bearer seu_token_aqui"
```

### Validar CNPJ
```bash
curl -X POST http://localhost:3002/api/auth/validate-cnpj \
  -H "Content-Type: application/json" \
  -d '{
    "cnpj": "12.345.678/0001-90"
  }'
```

---

## Fluxo de Autenticação

### Empresa
1. POST `/auth/register/company` com CNPJ
2. Sistema valida CNPJ na BrasilAPI
3. Admin recebe token JWT
4. Admin usa token para gerar tokens de convite
5. Funcionários usam tokens para registrar (POST `/auth/register/employee`)

### Funcionário
1. Recebe token de convite do admin
2. POST `/auth/register/employee` com token
3. Sistema valida se token é válido e não foi usado
4. Funcionário recebe token JWT
5. Pode acessar sistema com seu token

---

## Variáveis de Ambiente

```env
# Backend
NODE_ENV=development
PORT=3002
JWT_SECRET=sua-chave-secreta
JWT_EXPIRES_IN=24h
FIREBASE_SERVICE_ACCOUNT={"..."}
FIREBASE_DATABASE_URL=https://...

# Frontend
VITE_API_URL=http://localhost:3002/api
```

---

**Última atualização:** 8 de janeiro de 2026  
**Versão:** 1.0.0
