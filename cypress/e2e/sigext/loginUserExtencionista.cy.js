describe("Usuario deve realizar o login no usuario institucional", () => {
  let user;
  before(() => {
    cy.fixture("user-extensao").then((tData) => (user = tData));
  });
  it("atraves da pagina da aplicação com sucesso", () => {
    cy.login(user.usuario, user.senha);
  });
});
