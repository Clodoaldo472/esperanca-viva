"use strict";
(function () {
  const App = (window.App = window.App || {});
  const rotas = {};
  const titulo = "Instituto Esperança Viva";

  function registrar(caminho, definicao) { rotas[caminho] = definicao; }

  function resolver() {
    const partes = (location.hash.replace(/^#\/?/, "") || "inicio").split("/");
    const caminho = partes[0];
    const ancora = partes[1] || "";
    const app = document.getElementById("app");
    const rota = Object.hasOwn(rotas, caminho) ? rotas[caminho] : rotas.naoEncontrada;
    app.innerHTML = rota.render();
    document.title = (rota.titulo || "Página não encontrada") + " | " + titulo;
    document.querySelectorAll("[data-rota]").forEach((link) => {
      if (link.dataset.rota === caminho) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (rota.aoRenderizar) rota.aoRenderizar(app);
    const alvo = ancora ? document.getElementById(ancora) : null;
    if (alvo) alvo.scrollIntoView();
    else { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
  }

  function iniciar() {
    window.addEventListener("hashchange", resolver);
    resolver();
  }

  App.roteador = { registrar, iniciar, resolver };
})();
