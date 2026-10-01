"use strict";
const menu = document.querySelector(".menu");
const botao = menu ? menu.querySelector(".menu__botao") : null;
if (botao) {
  menu.classList.add("menu--js");
  const alternar = (abrir) => {
    menu.classList.toggle("menu--aberto", abrir);
    botao.setAttribute("aria-expanded", String(abrir));
  };
  botao.addEventListener("click", () => alternar(botao.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
      alternar(false);
      botao.focus();
    }
  });
  window.matchMedia("(min-width:768px)").addEventListener("change", (e) => {
    if (e.matches) alternar(false);
  });
}
