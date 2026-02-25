# Estrutura Completa do Projeto Transita.IA

Esta é a estrutura completa do projeto Transita.IA, incluindo todas as pastas e arquivos na raiz e subpastas.

Estrutura Geral:

- `CLEANUP_LOG.md` — log de limpeza do projeto
- `eslint.config.js` — configuração do ESLint
- `index.html` — arquivo HTML principal
- `package.json` — dependências e scripts do projeto
- `README-SECURITY.md` — documentação de segurança
- `STRUCTURE.md` — este arquivo de estrutura
- `vite.config.js` — configuração do Vite
- `backend/` — código back-end
  - `.env` — variáveis de ambiente
  - `package.json` — dependências do back-end
  - `package-lock.json` — lockfile das dependências
  - `server.js` — ponto de entrada do servidor
  - `notificationService.js` — serviço de notificações
  - `userService.js` — serviço de usuários
  - `node_modules/` — dependências instaladas
  - `src/`
    - `authRoutes.js` — rotas de autenticação
    - `authService.js` — serviço de autenticação
- `public/` — arquivos públicos (atualmente vazio)
- `src/` — código front-end
  - `main.jsx` — ponto de entrada
  - `App.jsx` — configuração de rotas e providers
  - `index.css` — estilos globais iniciais
  - `App.css` — estilos específicos do App
  - `assets/` — imagens e mídias estáticas
  - `components/` — componentes reutilizáveis
    - `Auth/` — componentes de autenticação
    - `BackToTop/` — componente voltar ao topo
    - `Dashboard/` — componentes do dashboard
    - `Footer/` — componente rodapé
    - `GlobalLoading/` — componente de carregamento global
    - `Navbar/` — componente barra de navegação
    - `NotificationPanel/` — painel de notificações
    - `PeriodSelector/` — seletor de período
    - `Sheet/` — componentes relacionados a sheets
    - `Campaigns/` — componentes relacionados a campanhas
    - `AnimatedCounter.css`
    - `AnimatedCounter.jsx`
    - `Icon3D.jsx`
    - `PremiumBadge.css`
    - `PremiumBadge.jsx`
  - `config/` — configurações (ex.: api.js, firebase.js)
  - `constants/` — constantes do projeto (ex.: colors.js, messages.js)
  - `context/` — contexto (possivelmente duplicado com contexts/)
  - `contexts/` — React Context providers
  - `docs/` — documentação
  - `firebase/` — configurações do Firebase
  - `hooks/` — hooks customizados
  - `pages/` — páginas correspondentes a rotas
  - `services/` — integração com API
  - `styles/` — variáveis, temas e CSS global
  - `ui/` — componentes de UI
  - `utils/` — helpers utilitários
  - `vite.svg` — ícone do Vite

# Estrutura atual — frontend (Transita.Ai-Mvp/src)

Estrutura atual do código front-end, baseada nas pastas e arquivos presentes.

Estrutura:

- `src/`
  - `main.jsx` — ponto de entrada
  - `App.jsx` — configuração de rotas e providers
  - `index.css` — estilos globais iniciais
  - `App.css` — estilos específicos do App
  - `assets/` — imagens e mídias estáticas
  - `components/` — componentes reutilizáveis (subpastas por domínio: `Auth/`, `Sheet/`, `Campaigns/`)
  - `config/` — configuração (ex.: `api.js`, `firebase.js`)
  - `constants/` — constantes do projeto (ex.: `colors.js`, `messages.js`)
  - `contexts/` — React Context providers
  - `hooks/` — hooks customizados
  - `pages/` — páginas correspondentes a rotas (cada página em sua pasta com `.jsx` e `.css`)
  - `services/` — integração com API (API clients, serviços de negócio)
  - `styles/` — variáveis, temas e CSS global
  - `utils/` — helpers utilitários

Passos seguros para reorganização
1. Criar as pastas acima (já aplicadas parcialmente neste patch) com `.gitkeep` ou README para preservá-las no git.
2. Não mover arquivos imediatamente — criar `index.js`/`index.jsx` que reexporte agrupamentos quando possível.
3. Mover arquivos em lotes pequenos e atualizar imports no mesmo commit.
4. Rodar `npm run dev` ou `npm run build` e corrigir imports quebrados imediatamente.

Se quiser, eu crio automaticamente os `index.js` para os grupos mais críticos (ex.: `components/index.js`, `services/index.js`) e atualizo imports em batch.

# Estrutura atual — backend (Transita.IA/backend)

Estrutura atual do código back-end, baseada nas pastas e arquivos presentes.

Estrutura:

- `backend/`
  - `.env` — variáveis de ambiente
  - `package.json` — dependências e scripts do Node.js
  - `package-lock.json` — lockfile das dependências
  - `server.js` — ponto de entrada do servidor
  - `notificationService.js` — serviço de notificações
  - `userService.js` — serviço de usuários
  - `node_modules/` — dependências instaladas
  - `src/`
    - `authRoutes.js` — rotas de autenticação
    - `authService.js` — serviço de autenticação
