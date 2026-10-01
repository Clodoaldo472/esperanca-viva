"use strict";
(function () {
  const App = (window.App = window.App || {});
  function toast(mensagem, tipo = "sucesso", duracao = 6000) {
    const area = document.getElementById("toast-area");
    if (!area) return;
    const el = document.createElement("div");
    el.className = "toast toast--" + tipo;
    const texto = document.createElement("p");
    texto.textContent = mensagem;
    const fechar = document.createElement("button");
    fechar.type = "button";
    fechar.className = "toast__fechar";
    fechar.setAttribute("aria-label", "Fechar notificação");
    fechar.textContent = "×";
    const remover = () => el.remove();
    let tempo = setTimeout(remover, duracao);
    el.addEventListener("mouseenter", () => clearTimeout(tempo));
    el.addEventListener("mouseleave", () => { tempo = setTimeout(remover, duracao); });
    fechar.addEventListener("click", remover);
    el.append(texto, fechar);
    area.append(el);
  }
  App.notificacoes = { toast };
})();
