# Instituto Esperança Viva

Aplicação web de página única (SPA) para uma ONG fictícia, com apresentação de projetos sociais e formulário de cadastro de voluntários e doadores. Desenvolvida em HTML, CSS e JavaScript puros, sem etapa de build.

## Requisitos
- Navegador atual (Chrome, Edge, Firefox ou Safari).
- Conexão com a internet apenas para carregar a biblioteca Day.js (CDN); sem ela, a aplicação usa a API nativa de datas.

## Instalação e utilização
```bash
git clone <URL-DO-REPOSITORIO>
cd esperanca-viva
```
Abra `html/index.html` no navegador (duplo clique ou servidor estático qualquer). Rotas: `#/inicio`, `#/projetos` e `#/cadastro`.

## Estrutura
- `html/index.html`: casca da SPA; o conteúdo é gerado por templates.
- `css/`: `reset.css` e `estilo.css` (design system, Grid, Flexbox, componentes BEM).
- `js/main.js`: raiz de composição; registra rotas e liga os módulos.
- `js/modules/`: `dados`, `templates`, `roteador`, `mascaras`, `validacao`, `armazenamento`, `notificacoes`, `menu`.
- `img/`: logotipo e imagens (PNG, JPG e WebP).

## Fluxo de versionamento (GitFlow)
- `main`: somente versões de lançamento, marcadas com tag (`vX.Y.Z`).
- `develop`: integração contínua das funcionalidades.
- `feature/*` e `fix/*`: saem de `develop` e voltam por merge `--no-ff`.
- `release/*`: estabilização antes de ir para `main`.
- `hotfix/*`: correções urgentes a partir de `main`, com retorno a `develop`.

Commits seguem Conventional Commits: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`.

## Dados e privacidade
Os cadastros ficam apenas no `localStorage` do navegador. O CPF é armazenado mascarado e e-mail, telefone, endereço e data de nascimento não são persistidos (LGPD, art. 6º, III). Para apagar, use o botão "Remover todos" na página de cadastro.

## Manutenção
- Novas páginas: criar a função de template em `templates.js` e registrar a rota em `main.js`.
- Troca da persistência (por exemplo, por API): alterar somente `armazenamento.js`.
- Validação do HTML: Nu Html Checker (`vnu.jar`) sem erros.

## Licença
Projeto acadêmico, sem licença de uso comercial definida.
