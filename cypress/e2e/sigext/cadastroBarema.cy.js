describe("Usuario institucional deve cadastrar o barema", () => {
  let user;
  before(() => {
    cy.fixture("user-institucional").then((data) => (user = data));
  });
  it("atraves das configurações com sucesso", () => {
    cy.login(user.usuario, user.senha);
    cy.wait(1000);
    cy.get('.treeview > [href="#"]').click();
    cy.get(".treeview-menu > :nth-child(2) > a").click();
    cy.get(".box-header > .pull-right > .btn").click();
    cy.get(".formbuilder-icon-checkbox-group");
    cy.get("#titulo").type("Barema Teste");
    cy.get(".formbuilder-icon-checkbox-group > span").click();
    cy.get(".formbuilder-icon-date > span").click();
    cy.get("#btn_adicionar_editar").click();
  });
});
