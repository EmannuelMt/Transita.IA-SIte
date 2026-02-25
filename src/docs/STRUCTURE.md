```markdown
# Estrutura proposta — frontend (Transita.Ai-Mvp/src)

Proposta de organização para o código front-end, pronta para ser aplicada incrementalmente.

Estrutura recomendada:

- `src/`
  - `main.jsx` — ponto de entrada
  - `App.jsx` — configuração de rotas e providers
  - `config/` — configuração (ex.: `api.js`, `firebase.js`)
  - `pages/` — páginas correspondentes a rotas (cada página em sua pasta com `.jsx` e `.css`)
  - `components/` — componentes reutilizáveis (subpastas por domínio: `Auth/`, `Sheet/`, `Campaigns/`)
  - `layouts/` — wrappers de layout (Header/Footer, Grid)
  - `services/` — integração com API (API clients, serviços de negócio)
  - `contexts/` — React Context providers
  - `hooks/` — hooks customizados
  - `styles/` — variáveis, temas e CSS global
  - `assets/` — imagens e mídias estáticas
  - `utils/` — helpers utilitários

Passos seguros para reorganização
1. Criar as pastas acima (já aplicadas parcialmente neste patch) com `.gitkeep` ou README para preservá-las no git.
2. Não mover arquivos imediatamente — criar `index.js`/`index.jsx` que reexporte agrupamentos quando possível.
3. Mover arquivos em lotes pequenos e atualizar imports no mesmo commit.
4. Rodar `npm run dev` ou `npm run build` e corrigir imports quebrados imediatamente.

Se quiser, eu crio automaticamente os `index.js` para os grupos mais críticos (ex.: `components/index.js`, `services/index.js`) e atualizo imports em batch.


```
