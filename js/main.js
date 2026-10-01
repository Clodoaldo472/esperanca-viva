"use strict";
(function () {
  const App = window.App;
  const { templates, armazenamento, validacao, mascaras, notificacoes, roteador } = App;

  const mascararCpf = (cpf) => "***.***." + cpf.replace(/\D/g, "").slice(6, 9) + "-" + cpf.replace(/\D/g, "").slice(9, 11);

  function formatarData() {
    // Day.js (CDN) formata data e hora; sem a biblioteca, usa a API nativa.
    if (typeof window.dayjs === "function") return window.dayjs().format("DD/MM/YYYY HH:mm");
    return new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  }

  function atualizarLista() {
    const destino = document.getElementById("lista-cadastros");
    if (destino) destino.innerHTML = templates.listaCadastros(armazenamento.listar());
  }

  function iniciarCadastro(app) {
    const form = app.querySelector("#form-cadastro");
    mascaras.aplicar(form);
    atualizarLista();
    validacao.iniciar(form, (dados) => {
      const salvo = armazenamento.salvar({
        nome: dados.get("nome").trim(),
        tipo: dados.get("tipo"),
        cpfMascarado: mascararCpf(dados.get("cpf")),
        criadoEm: formatarData()
      });
      if (salvo) {
        notificacoes.toast("Cadastro salvo neste navegador. Obrigado por participar!");
        form.reset();
        atualizarLista();
      } else {
        notificacoes.toast("Não foi possível salvar: armazenamento indisponível.", "erro");
      }
    });
    app.querySelector("#lista-cadastros").addEventListener("click", (e) => {
      if (e.target.matches("[data-remover]")) { armazenamento.remover(e.target.dataset.remover); atualizarLista(); notificacoes.toast("Cadastro removido."); }
      if (e.target.matches("[data-limpar]")) { armazenamento.limpar(); atualizarLista(); notificacoes.toast("Todos os cadastros foram removidos."); }
    });
  }

  roteador.registrar("inicio", { titulo: "Início", render: templates.inicio });
  roteador.registrar("projetos", { titulo: "Projetos Sociais", render: templates.projetos });
  roteador.registrar("cadastro", { titulo: "Seja Voluntário ou Doador", render: templates.cadastro, aoRenderizar: iniciarCadastro });
  roteador.registrar("naoEncontrada", { titulo: "Página não encontrada", render: templates.naoEncontrada });
  roteador.iniciar();
})();
