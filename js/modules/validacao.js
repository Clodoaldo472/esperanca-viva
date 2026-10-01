"use strict";
(function () {
  const App = (window.App = window.App || {});

  function cpfValido(cpf) {
    const d = cpf.replace(/\D/g, "");
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
    const digito = (base) => {
      let soma = 0;
      for (let i = 0; i < base; i++) soma += Number(d[i]) * (base + 1 - i);
      const resto = (soma * 10) % 11;
      return resto === 10 ? 0 : resto;
    };
    return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
  }

  function mensagem(campo) {
    const v = campo.validity;
    if (campo.type === "radio") {
      const grupo = campo.form.querySelectorAll(`input[name="${campo.name}"]`);
      return Array.from(grupo).some((r) => r.checked) ? "" : "Selecione uma opção.";
    }
    if (campo.type === "checkbox") return campo.checked ? "" : "É necessário autorizar o tratamento de dados.";
    if (v.valueMissing || (campo.type === "text" && campo.required && campo.value.trim() === "")) return "Preencha este campo.";
    if (v.typeMismatch) return "Informe um e-mail válido, como nome@dominio.com.br.";
    if (v.patternMismatch || v.tooShort) return campo.title || "Formato inválido.";
    if (campo.id === "cpf" && !cpfValido(campo.value)) return "CPF inválido: confira os dígitos verificadores.";
    if (campo.id === "nascimento") {
      const h = new Date();
      const hoje = h.getFullYear() + "-" + String(h.getMonth() + 1).padStart(2, "0") + "-" + String(h.getDate()).padStart(2, "0");
      if (campo.value > hoje) return "A data de nascimento não pode ser futura.";
      if (v.rangeUnderflow) return "Informe uma data a partir de 1900.";
    }
    return "";
  }

  function mostrar(campo, texto) {
    const destino = document.getElementById("erro-" + (campo.type === "radio" ? campo.name : campo.id));
    if (destino) destino.textContent = texto;
    const alvos = campo.type === "radio" ? campo.form.querySelectorAll(`input[name="${campo.name}"]`) : [campo];
    alvos.forEach((a) => a.setAttribute("aria-invalid", texto ? "true" : "false"));
  }

  function validarCampo(campo) {
    const texto = mensagem(campo);
    mostrar(campo, texto);
    return texto === "";
  }

  function validarFormulario(form) {
    let primeiroInvalido = null;
    const vistos = new Set();
    form.querySelectorAll("input, select").forEach((campo) => {
      const chave = campo.type === "radio" ? "r:" + campo.name : campo.id;
      if (vistos.has(chave)) return;
      vistos.add(chave);
      if (!validarCampo(campo) && !primeiroInvalido) primeiroInvalido = campo;
    });
    if (primeiroInvalido) primeiroInvalido.focus();
    return primeiroInvalido === null;
  }

  function iniciar(form, aoValido) {
    form.addEventListener("focusout", (e) => { if (e.target.matches("input, select")) validarCampo(e.target); });
    form.addEventListener("change", (e) => { if (e.target.matches("input[type=radio], input[type=checkbox], select")) validarCampo(e.target); });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validarFormulario(form)) aoValido(new FormData(form));
      else App.notificacoes.toast("Corrija os campos destacados antes de enviar.", "erro");
    });
  }

  App.validacao = { cpfValido, validarCampo, validarFormulario, iniciar };
})();
