// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (usuario, senha) => {
  cy.visit("http://localhost:9000/");
  cy.get("[name='email']").click({ force: true }).clear().type(usuario);
  cy.get("[name='password']").click({ force: true }).clear().type(senha);
  cy.get("[class='btn btn-primary btn-block btn-flat']").click();
  cy.contains("li", "MENU");

  // Estava criando as datas fakes para abertura de edital e preencher o formulario
});

Cypress.Commands.add(
  "newEdital",
  ({
    titulo,
    numero,
    instituicaoNumber,
    tipoEdital,
    chamada,
    aviso,
    arquivo,
    inicioInscricao,
    fimInscricao,
    inicioRecurso,
    fimRecurso,
    inicioExecucao,
    fimExecucao,
    duracaoMes,
    publicoInterno,
    publicoExterno,
  }) => {
    cy.wait(1000);
    cy.get(".sidebar-menu > :nth-child(6) > a").click({ force: true }); // Clica no botão de editais
    cy.get(".box-header > .pull-right > .btn").click({ force: true }); // Clica em novo edital
    cy.wait(1000);
    cy.get("#titulo").click({ force: true }).type(titulo);
    cy.get("#identificacao").click({ force: true }).type(numero);
    cy.get("#fk_instituicao").select(instituicaoNumber);
    cy.get("#financiamento").select(tipoEdital);
    cy.contains("strong", "Recursos Contínuos").then(($element) => {
      if ($element.is(":visible")) {
        cy.get("#recurso_continuo").should("be.visible").click({ force: true }).type("100000");
        cy.get("#recurso_esporadico").should("be.visible").click({ force: true }).type("1000");
      }
    });

    cy.get("#chamada").click({ force: true }).type(chamada);
    cy.get("#aviso").click({ force: true }).type(aviso);
    cy.get("#arquivo").selectFile(arquivo);

    cy.get("#sem_onus_abertura").then((element) => {
      if (element.is(":visible")) {
        // O elemento está visível, execute as ações desejadas
        cy.wrap(element).click().type(inicioInscricao);
      } else {
        // O elemento não está visível, pule as ações ou execute ações alternativas
        cy.log("Elemento #sem_onus_abertura não está visível, pulando interação.");
      }
    });
    cy.get("#sem_onus_encerramento").then((element) => {
      if (element.is(":visible")) {
        // O elemento está visível, execute as ações desejadas
        cy.wrap(element).click().type(fimInscricao);
      } else {
        // O elemento não está visível, pule as ações ou execute ações alternativas
        cy.log("Elemento #sem_onus_encerramento não está visível, pulando interação.");
      }
    });
    cy.get("#com_onus_abertura").then((element) => {
      if (element.is(":visible")) {
        // O elemento está visível, execute as ações desejadas
        cy.wrap(element).click().type(inicioInscricao);
      } else {
        // O elemento não está visível, pule as ações ou execute ações alternativas
        cy.log("Elemento #sem_onus_encerramento não está visível, pulando interação.");
      }
    });
    cy.get("#com_onus_encerramento").then((element) => {
      if (element.is(":visible")) {
        // O elemento está visível, execute as ações desejadas
        cy.wrap(element).click().type(fimInscricao);
      } else {
        // O elemento não está visível, pule as ações ou execute ações alternativas
        cy.log("Elemento #sem_onus_encerramento não está visível, pulando interação.");
      }
    });
    cy.get("#recurso_inicio").type(inicioRecurso);
    cy.get("#recurso_termino").type(fimRecurso);
    cy.get("#execucao_inicio").type(inicioExecucao);
    cy.get("#execucao_termino").type(fimExecucao);
    cy.get("#duracao").type(duracaoMes);
    cy.get("#publico_interno").type(publicoInterno);
    cy.get("#publico_externo").click().type(publicoExterno);
    cy.get(".btn-action").click();
  }
);

Cypress.Commands.add("informarDespesasEdital", () => {
  cy.get(".btnDespesa").click();
  // cy.get("#fk_atividade_despesa").select(2); verificar necessidade de selecionar mais de uma modalidade
  cy.get("#ref").select("tab-material-de-consumo");
  cy.get(
    "#formDespesa > .box-body > fieldset > .form-group > .row > .col-md-2 > .pull-right > .btn"
  ).click();
  cy.get(
    "#criar_editar_despesa-modal > .modal-dialog > .modal-content > .modal-header > .close"
  ).click();
});

Cypress.Commands.add(
  "informarModalidadeEdital",
  ({ titulo, numeroAtividade, numeroBarema, numeroRelatorioExecucao }) => {
    cy.wait(1000);
    cy.get("#table_filter > label > input").click({ force: true }).type(titulo);
    cy.wait(1000);
    cy.get(".btnFaixa").click();
    cy.get("#fk_atividade").select(numeroAtividade);
    cy.get("#fk_barema").select(numeroBarema);
    cy.get("#fk_relatorio_execucao").select(numeroRelatorioExecucao);
    cy.get("#valor_maximo").then((element) => {
      if (!element.is(":disabled")) {
        // O elemento está visível, execute as ações desejadas
        cy.wrap(element).click().type(10000);
      } else {
        // O elemento não está visível, pule as ações ou execute ações alternativas
        cy.log("Elemento #sem_onus_encerramento não está visível, pulando interação.");
      }
    });
    cy.get(":nth-child(4) > .pull-right > .btn").click();
    cy.get(
      "#criar_editar_faixa-modal > .modal-dialog > .modal-content > .modal-header > .close"
    ).click();
    // Informar despesas
  }
);

Cypress.Commands.add("cadastrarModalidade", ({ titulo, tipo }) => {
  cy.wait(1000);
  cy.get('.treeview > [href="#"]').click();
  cy.get(".treeview-menu > :nth-child(1) > a").click();
  cy.get(".box-header > .pull-right > .btn").click();
  cy.get("#titulo").click().type(titulo);
  cy.get("#tipo").select(tipo);
  cy.get(
    "#criar_editar_atividade-modal > .modal-dialog > .modal-content > .modal-footer > .btn-action"
  ).click();
});

Cypress.Commands.add("cadastrarRelatorioExecucao", ({ titulo, tipo }) => {
  cy.wait(1000);
  cy.get('.treeview > [href="#"]').click();
  cy.get(".treeview-menu > :nth-child(3) > a").click();
  cy.get(".box-header > .pull-right > .btn").click();
  cy.wait(1000);
  cy.get("#titulo").click().type(titulo);
  cy.get(".formbuilder-icon-checkbox-group").click();
  cy.get(".formbuilder-icon-date").click();
  cy.get("#btn_adicionar_editar").click();
});

Cypress.Commands.add("submeterProposta", () => {
  cy.log("Funcionou!");
});

Cypress.Commands.add(
  "cadastrarUsuario",
  ({
    nome,
    email,
    dataNascimento,
    genero,
    cpf,
    rg,
    endereco,
    telefone,
    titulacao,
    vinculoInstitucional,
    areaFormacao,
    intituicao,
    senha,
  }) => {
    cy.get(".sidebar-menu > :nth-child(3) > a").click();
    cy.get(".pull-right > .btn-primary").click();
    cy.get("#name").click({ force: true }).type(nome);
    cy.get("#email").click({ force: true }).type(email);
    cy.get("#data_nascimento").click({ force: true }).type(dataNascimento);
    cy.get("#sexo").select(genero);
    cy.get("#cpf").click({ force: true }).type(cpf);
    cy.get("#rg").click({ force: true }).type(rg);
    cy.get("#endereco_completo").click({ force: true }).type(endereco);
    cy.get("#telefone").click({ force: true }).type(telefone);
    cy.get("#titulacao").select(titulacao);
    cy.get("#tipo").select(vinculoInstitucional);
    cy.get("#curso").click({ force: true }).type(areaFormacao);
    cy.get("#fk_instituicao").select(intituicao);
    cy.get("#password").click({ force: true }).type(senha);
    cy.get("#passwordc").click({ force: true }).type(senha);
    cy.get(
      "#criar_editar-modal > .modal-dialog > .modal-content > .modal-footer > .btn-action"
    ).click();
  }
);
