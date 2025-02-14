describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:9000/login')
    cy.get(':nth-child(2) > .form-control').type('extensionista@gmail.com')
    cy.get(':nth-child(3) > .form-control').type('123123')
    cy.get('.btn').click()
  })
})