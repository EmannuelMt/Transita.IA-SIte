# 🧪 Teste de Validação de CNPJ

## Opção 1: Teste com cURL

### Teste de Formato (Debug)
```bash
curl -X POST http://localhost:3002/api/auth/test-cnpj-format \
  -H "Content-Type: application/json" \
  -d '{"cnpj":"11.222.333/0001-81"}'
```

**Resposta esperada:**
```json
{
  "cnpj_original": "11.222.333/0001-81",
  "cnpj_limpo": "11222333000181",
  "comprimento": 14,
  "isValidFormat": true/false,
  "message": "Formato válido ou inválido"
}
```

### Teste Completo (Com BrasilAPI)
```bash
curl -X POST http://localhost:3002/api/auth/validate-cnpj \
  -H "Content-Type: application/json" \
  -d '{"cnpj":"11.222.333/0001-81"}'
```

**Resposta esperada (sucesso):**
```json
{
  "valid": true,
  "cnpj": "11.222.333/0001-81",
  "name": "Nome da Empresa",
  "legalName": "Razão Social",
  "city": "São Paulo",
  "state": "SP",
  "months_active": 60,
  "eligible_for_registration": true,
  "message": "CNPJ válido e empresa elegível para registro"
}
```

**Resposta esperada (erro):**
```json
{
  "valid": false,
  "error": "Mensagem de erro",
  "message": "Descrição do erro",
  "code": "ERRO_CODE"
}
```

---

## Opção 2: Teste no DevTools do Navegador

Abra o DevTools (F12) e execute:

```javascript
// Teste de formato
fetch('http://localhost:3002/api/auth/test-cnpj-format', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ cnpj: '11.222.333/0001-81' })
})
.then(r => r.json())
.then(d => console.log(d));

// Teste completo
fetch('http://localhost:3002/api/auth/validate-cnpj', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ cnpj: '11.222.333/0001-81' })
})
.then(r => r.json())
.then(d => console.log(d));
```

---

## CNPJs Válidos para Testar

> ⚠️ Necessário que o CNPJ tenha **6+ meses de existência**

### Teste com CNPJs Reais
1. Use CNPJs de empresas grandes e estabelecidas
2. Use formato com ou sem máscara:
   - Com máscara: `11.222.333/0001-81`
   - Sem máscara: `11222333000181`

### Teste Rápido com Gerador
Se precisar de um CNPJ válido para teste:
1. Acesse: https://www.4devs.com.br/gerador_cnpj
2. Gere um CNPJ válido
3. Verifique se a empresa aparece na Receita Federal
4. Teste no endpoint

---

## Esperados ao Testar

### ✅ Teste de Formato Deve Retornar:
- `cnpj_original`: O CNPJ que foi enviado
- `cnpj_limpo`: CNPJ apenas com dígitos
- `comprimento`: Sempre 14
- `isValidFormat`: true se dígitos verificadores OK
- `message`: "Formato válido" ou "Formato inválido"

### ✅ Teste Completo (BrasilAPI) Deve Mostrar:
```
[VALIDATE-CNPJ] ========================================
[VALIDATE-CNPJ] Iniciando validação de CNPJ: 11.222.333/0001-81
[VALIDATE-CNPJ] CNPJ limpo: 11222333000181
[VALIDATE-CNPJ] ✅ Formato local validado com sucesso
[VALIDATE-CNPJ] Chamando BrasilAPI...
[VALIDATE-CNPJ] ✅ BrasilAPI retornou dados
[VALIDATE-CNPJ] Empresa: Nome da Empresa
[VALIDATE-CNPJ] Fundação: 2020-01-15
[VALIDATE-CNPJ] ✅ Empresa tem 6+ meses de existência
[VALIDATE-CNPJ] ✅ Retornando dados completos
[VALIDATE-CNPJ] ========================================
```

---

## 🔍 Se der erro 400 (Bad Request)

1. **Verifique no console do backend** os logs:
   - `[VALIDATE-CNPJ] CNPJ limpo:` (deve ter 14 dígitos)
   - `[VALIDATE-CNPJ] ✅ Formato local validado` (deve passar)
   - Se falhar aqui: dígitos verificadores estão errados

2. **Verifique no DevTools do navegador**:
   - `[useValidation] Validando CNPJ:` (mostra o CNPJ)
   - `[useValidation] Status: 400` (confirma erro 400)
   - `[useValidation] Mensagem do servidor:` (mostra o erro do backend)

3. **Causas comuns de erro 400**:
   - CNPJ com menos de 14 dígitos
   - Dígitos verificadores incorretos
   - CNPJ não existe na Receita Federal
   - CNPJ com menos de 6 meses

---

## 📋 Checklist

- [ ] Backend está rodando (`npm run dev` na pasta `/backend`)
- [ ] Frontend está rodando (`npm run dev` na pasta raiz)
- [ ] Abriu DevTools (F12) para ver logs
- [ ] Console do backend mostra logs de validação
- [ ] Testou com cURL primeiro (mais simples)
- [ ] Depois testou no formulário do navegador

