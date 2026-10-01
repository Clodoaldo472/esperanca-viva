"use strict";
(function () {
  const App = (window.App = window.App || {});
  const apenasDigitos = (v) => v.replace(/\D/g, "");
  const formatar = {
    cpf: (v) => apenasDigitos(v).slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2"),
    telefone: (v) => {
      const d = apenasDigitos(v).slice(0, 11);
      if (d.length > 10) return d.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
      return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").replace(/-$/, "");
    },
    cep: (v) => apenasDigitos(v).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2")
  };
  function aplicar(form) {
    Object.keys(formatar).forEach((id) => {
      const campo = form.querySelector("#" + id);
      if (campo) campo.addEventListener("input", () => { campo.value = formatar[id](campo.value); });
    });
  }
  App.mascaras = { formatar, aplicar };
})();
