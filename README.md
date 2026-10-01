# Instituto Esperança Viva

Aplicação web de página única (SPA) para uma ONG fictícia, com apresentação de projetos sociais e formulário de cadastro de voluntários e doadores. Desenvolvida em HTML, CSS e JavaScript puros.

Aplicação publicada: https://clodoaldo472.github.io/esperanca-viva/

## Requisitos
- Navegador atual (Chrome, Edge, Firefox ou Safari).
- Internet apenas para carregar a biblioteca Day.js (CDN com SRI); sem ela, a aplicação usa a API nativa de datas.
- Para gerar o build: Node.js 20 ou superior.

## Instalação e utilização
```bash
git clone https://github.com/Clodoaldo472/esperanca-viva.git
cd esperanca-viva
```
Desenvolvimento: abra `html/index.html` no navegador (duplo clique ou qualquer servidor estático).
Produção: abra `docs/index.html` ou acesse a URL publicada. Rotas: `#/inicio`, `#/projetos` e `#/cadastro`.

## Build de produção
```bash
npm install
npm run build
```
O script `scripts/build.mjs` (esbuild) junta e minifica os 2 CSS em 1 e os 9 JS em 1, ajusta os caminhos e copia somente as imagens usadas para `docs/`. Os arquivos de `html/`, `css/` e `js/` continuam sendo o código-fonte. Nunca edite `docs/` à mão: refaça o build.

Medição da versão 1.1.0 (rotas início e projetos, sem a CDN): requisições de 17 para 8; 92.580 para 54.170 bytes (-41,5%); imagens de 57.638 para 25.425 bytes (-55,9%).

## Deploy
GitHub Pages, a partir da branch `main`, pasta `/docs`. Para atualizar: gerar o build, abrir PR, mesclar na `develop`, publicar release na `main`. O Pages republica sozinho.

## Estrutura
- `html/index.html`: casca da SPA; o conteúdo é gerado por templates.
- `css/`: `reset.css` e `estilo.css` (design system, Grid, Flexbox, componentes BEM).
- `js/main.js`: raiz de composição; registra rotas e liga os módulos.
- `js/modules/`: `dados`, `templates`, `roteador`, `mascaras`, `validacao`, `armazenamento`, `notificacoes`, `menu`.
- `img/`: logotipo e imagens (já otimizadas).
- `scripts/build.mjs` e `docs/`: build e saída de produção.

## Acessibilidade (WCAG 2.1 AA)
Verificada com axe-core (0 violações em 4 rotas, em 1280 px e 360 px) e testes manuais de teclado: link para pular ao conteúdo, foco visível com contraste mínimo de 3:1, mensagens de erro associadas aos campos (aria-describedby, aria-invalid) e toasts anunciados. Não foi testada com leitor de tela real (NVDA, VoiceOver).

### Modo escuro e alto contraste
Os temas seguem a preferência do sistema, sem JavaScript: `prefers-color-scheme: dark` ativa o modo escuro e `prefers-contrast: more` ativa o alto contraste (preto sobre branco, ou branco sobre preto combinados com o modo escuro). As cores são variáveis CSS no `:root` de `css/estilo.css`, sobrescritas em três blocos `@media`. Todo texto tem razão de contraste mínima de 4,5:1 nos quatro modos (axe-core: 0 violações em 3 rotas e no estado de erro, em 1280 px e 360 px). Não há botão para alternar o tema manualmente.

## Fluxo de versionamento (GitFlow)
- `main`: somente versões de lançamento, com tag (`vX.Y.Z`).
- `develop`: integração das funcionalidades.
- `feature/*` e `fix/*`: saem de `develop` e voltam por pull request com merge commit.
- `release/*`: estabilização antes de ir para `main`.
- `hotfix/*`: correções urgentes a partir de `main`, com retorno a `develop`.

Commits seguem Conventional Commits: `feat`, `fix`, `docs`, `chore`, `perf`, `build`. Versionamento semântico: `feat` gera MINOR, `fix` e `hotfix` geram PATCH, e mudança incompatível gera MAJOR.

## Dados e privacidade
Os cadastros ficam apenas no `localStorage` do navegador. O CPF é armazenado mascarado e e-mail, telefone, endereço e data de nascimento não são persistidos (LGPD, art. 6º, III). Para apagar, use o botão "Remover todos" na página de cadastro.

## Manutenção
- Nova página: criar a função de template em `templates.js` e registrar a rota em `main.js`.
- Troca da persistência (por exemplo, por API): alterar somente `armazenamento.js`.
- Após qualquer mudança em `html/`, `css/`, `js/` ou `img/`: `npm run build` e commitar `docs/`.

## Licença
Projeto acadêmico, sem licença de uso comercial definida.
