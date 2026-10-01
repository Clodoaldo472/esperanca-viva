"use strict";
(function () {
  const App = (window.App = window.App || {});
  const { projetos, ufs, grupos } = App.dados;

  const escapar = (texto) => String(texto).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Componentes reutilizáveis */
  const badge = (tipo, rotulo) => `<span class="badge badge--${tipo}">${escapar(rotulo)}</span>`;
  const cartao = (p) => `<article class="cartao"><h3>${escapar(p.titulo)}</h3><p>${badge(p.status, p.rotulo)}</p><img src="../img/${p.imagem}" alt="${escapar(p.alt)}" width="400" height="225" loading="lazy"><p>${escapar(p.texto)}</p></article>`;
  const alerta = (tipo, icone, titulo, texto) => `<div class="alerta alerta--${tipo}" role="status"><span class="alerta__icone" aria-hidden="true">${icone}</span><div><p class="alerta__titulo">${escapar(titulo)}</p><p>${escapar(texto)}</p></div></div>`;
  const campo = (c) => {
    const controle = c.tipo === "select"
      ? `<select id="${c.id}" name="${c.id}" ${c.attr} aria-describedby="erro-${c.id}"><option value="">Selecione</option>${ufs.map((u) => `<option>${u}</option>`).join("")}</select>`
      : `<input type="${c.tipo}" id="${c.id}" name="${c.id}" ${c.attr} aria-describedby="erro-${c.id}">`;
    return `<p><label for="${c.id}">${c.rotulo}</label>${controle}<span class="campo__erro" id="erro-${c.id}"></span></p>`;
  };

  /* Páginas (templates) */
  const inicio = () => `<section aria-labelledby="sobre"><h1 id="sobre">Quem somos</h1><p>O Instituto Esperança Viva é uma organização da sociedade civil, sem fins lucrativos, dedicada à educação, à segurança alimentar e à inclusão digital de famílias em situação de vulnerabilidade social.</p><figure><img src="../img/oficina-inclusao-digital.jpg" alt="Voluntária ensina três crianças a usar um notebook em uma oficina de inclusão digital" width="800" height="450" loading="lazy"><figcaption>Oficina de inclusão digital realizada em 2025.</figcaption></figure><p><a class="botao" href="#/cadastro">Quero ajudar</a></p></section>
<section aria-labelledby="missao"><h2 id="missao">Missão e impacto</h2><h3>Missão</h3><p>Promover autonomia e cidadania por meio de ações educativas e assistenciais com gestão transparente.</p><h3>Impacto</h3><ul><li>1.200 famílias atendidas por ano;</li><li>85 voluntários ativos;</li><li>12 oficinas mensais gratuitas.</li></ul></section>
<section aria-labelledby="atuacao"><h2 id="atuacao">Áreas de atuação</h2>${projetos.map(cartao).join("")}</section>`;

  const paginaProjetos = () => `<section aria-labelledby="atuais"><h1 id="atuais">Projetos Sociais</h1><h2 id="iniciativas">Nossas iniciativas</h2><p>Conheça as frentes em andamento e saiba como participar.</p>${projetos.map(cartao).join("")}</section>
<section aria-labelledby="voluntariado"><h2 id="voluntariado">Como ser voluntário</h2><ol><li>Inscrição no formulário;</li><li>Triagem e entrevista;</li><li>Treinamento;</li><li>Atuação nos projetos.</li></ol><p><a class="botao" href="#/cadastro">Quero ser voluntário</a></p></section>
<section aria-labelledby="doacao"><h2 id="doacao">Como doar</h2><ul><li>Pix;</li><li>Boleto;</li><li>Doação recorrente.</li></ul><dl><dt>R$ 30</dt><dd>Uma cesta básica.</dd><dt>R$ 80</dt><dd>Um mês de reforço escolar.</dd></dl><p><a class="botao" href="#/cadastro">Quero doar</a></p></section>
<section aria-labelledby="contas"><h2 id="contas">Transparência</h2><table><caption>Prestação de contas 2025</caption><thead><tr><th scope="col">Item</th><th scope="col">Valor</th></tr></thead><tbody><tr><th scope="row">Receitas</th><td>R$ 480.000</td></tr><tr><th scope="row">Despesas</th><td>R$ 462.000</td></tr></tbody></table></section>`;

  const cadastro = () => `<h1 id="titulo-cadastro">Seja Voluntário ou Doador</h1>
${alerta("info", "i", "Privacidade", "Os dados ficam apenas neste navegador (localStorage). O CPF não é armazenado por inteiro.")}
<form id="form-cadastro" method="post" novalidate>
${grupos.map((g) => `<fieldset><legend>${g.legenda}</legend>${g.campos.map(campo).join("")}</fieldset>`).join("")}
<fieldset><legend>Participação e consentimento</legend><fieldset><legend>Tipo de participação</legend><input type="radio" id="voluntario" name="tipo" value="Voluntário" required><label for="voluntario">Voluntário</label><input type="radio" id="doador" name="tipo" value="Doador"><label for="doador">Doador</label><span class="campo__erro" id="erro-tipo"></span></fieldset><p><input type="checkbox" id="lgpd" name="lgpd" required aria-describedby="erro-lgpd"><label for="lgpd">Autorizo o tratamento dos meus dados conforme a LGPD.</label><span class="campo__erro" id="erro-lgpd"></span></p></fieldset>
<button class="botao" type="submit">Enviar cadastro</button>
</form>
<section aria-labelledby="salvos"><h2 id="salvos">Cadastros salvos neste navegador</h2><div id="lista-cadastros"></div></section>`;

  const listaCadastros = (itens) => itens.length === 0
    ? `<p>Nenhum cadastro salvo.</p>`
    : `<table><caption>${itens.length} cadastro(s) armazenado(s) em localStorage</caption><thead><tr><th scope="col">Nome</th><th scope="col">Tipo</th><th scope="col">CPF</th><th scope="col">Data</th><th scope="col">Ação</th></tr></thead><tbody>${itens.map((i) => `<tr><th scope="row">${escapar(i.nome)}</th><td>${escapar(i.tipo)}</td><td>${escapar(i.cpfMascarado)}</td><td>${escapar(i.criadoEm)}</td><td><button class="botao botao--secundario" type="button" data-remover="${i.id}">Remover</button></td></tr>`).join("")}</tbody></table><p><button class="botao botao--secundario" type="button" data-limpar>Remover todos</button></p>`;

  const naoEncontrada = () => `<section><h1 id="nf">Página não encontrada</h1><p><a class="botao" href="#/inicio">Voltar ao início</a></p></section>`;

  App.templates = { inicio, projetos: paginaProjetos, cadastro, listaCadastros, naoEncontrada, componentes: { badge, cartao, alerta, campo } };
})();
