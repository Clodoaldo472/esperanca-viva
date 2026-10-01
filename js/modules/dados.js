"use strict";
(function () {
  const App = (window.App = window.App || {});
  App.dados = {
    projetos: [
      { titulo: "Reforço escolar", imagem: "projeto-educacao.jpg", alt: "Crianças estudando em mesa com livros e cadernos", texto: "240 alunos atendidos em 2025, com aulas de apoio três vezes por semana.", status: "info", rotulo: "Em andamento" },
      { titulo: "Cestas básicas", imagem: "projeto-alimentar.jpg", alt: "Voluntários organizam cestas básicas em caixas", texto: "1.200 famílias recebem cestas mensais e participam de hortas comunitárias.", status: "sucesso", rotulo: "Vagas abertas" },
      { titulo: "Cidadania digital", imagem: "projeto-digital.jpg", alt: "Jovens participam de oficina de informática", texto: "Oficinas gratuitas de informática e uso seguro da internet.", status: "aviso", rotulo: "Vagas limitadas" }
    ],
    ufs: ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"],
    grupos: [
      { legenda: "Dados pessoais", campos: [
        { id: "nome", rotulo: "Nome completo", tipo: "text", attr: 'autocomplete="name" required maxlength="100"' },
        { id: "cpf", rotulo: "CPF", tipo: "text", attr: 'inputmode="numeric" autocomplete="off" required maxlength="14" placeholder="000.000.000-00" pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" title="Informe o CPF no formato 000.000.000-00"' },
        { id: "nascimento", rotulo: "Data de nascimento", tipo: "date", attr: 'autocomplete="bday" required min="1900-01-01"' }
      ] },
      { legenda: "Contato e endereço", campos: [
        { id: "email", rotulo: "E-mail", tipo: "email", attr: 'autocomplete="email" required maxlength="120"' },
        { id: "telefone", rotulo: "Telefone", tipo: "tel", attr: 'inputmode="tel" autocomplete="tel" required maxlength="15" placeholder="(81) 99999-9999" pattern="\\(\\d{2}\\) \\d{4,5}-\\d{4}" title="Informe DDD e número: (81) 99999-9999"' },
        { id: "cep", rotulo: "CEP", tipo: "text", attr: 'inputmode="numeric" autocomplete="postal-code" required maxlength="9" placeholder="00000-000" pattern="\\d{5}-\\d{3}" title="Informe o CEP no formato 00000-000"' },
        { id: "endereco", rotulo: "Endereço", tipo: "text", attr: 'autocomplete="address-line1" required maxlength="120"' },
        { id: "cidade", rotulo: "Cidade", tipo: "text", attr: 'autocomplete="address-level2" required maxlength="60"' },
        { id: "uf", rotulo: "Estado", tipo: "select", attr: 'autocomplete="address-level1" required' }
      ] }
    ]
  };
})();
