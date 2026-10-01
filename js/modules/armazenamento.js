"use strict";
(function () {
  const App = (window.App = window.App || {});
  const CHAVE = "esperancaViva.cadastros";
  function listar() {
    try {
      const lista = JSON.parse(localStorage.getItem(CHAVE) || "[]");
      return Array.isArray(lista) ? lista.filter((i) => i && typeof i === "object" && i.id != null && typeof i.nome === "string") : [];
    } catch (erro) {
      return [];
    }
  }
  function gravar(lista) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(lista));
      return true;
    } catch (erro) {
      return false;
    }
  }
  function salvar(registro) {
    const lista = listar();
    let id = Date.now();
    while (lista.some((i) => String(i.id) === String(id))) id++;
    lista.push({ id, ...registro });
    return gravar(lista);
  }
  function remover(id) {
    return gravar(listar().filter((i) => String(i.id) !== String(id)));
  }
  function limpar() {
    try { localStorage.removeItem(CHAVE); return true; } catch (erro) { return false; }
  }
  App.armazenamento = { listar, salvar, remover, limpar };
})();
