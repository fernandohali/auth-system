/// <reference types="cypress" />

// Bem-vindo ao Cypress!
//
// Este arquivo de especificação contém uma variedade de testes de exemplo
// para um aplicativo de lista de tarefas, projetado para demonstrar
// o poder de escrever testes com o Cypress.
//
// Para saber mais sobre como o Cypress funciona e
// o que o torna uma ferramenta de teste tão incrível,
// leia nosso guia de introdução:
// https://on.cypress.io/introduction-to-cypress

describe('exemplo de aplicativo de lista de tarefas', () => {
  beforeEach(() => {
    // O Cypress começa com um estado limpo para cada teste,
    // então precisamos dizer a ele para visitar nosso site com o comando `cy.visit()`.
    // Como queremos visitar a mesma URL no início de todos os nossos testes,
    // incluímos isso na função beforeEach para que seja executado antes de cada teste.
    cy.visit('https://example.cypress.io/todo')
  })

  it('exibe dois itens na lista por padrão', () => {
    // Usamos o comando `cy.get()` para obter todos os elementos que correspondem ao seletor.
    // Em seguida, usamos `should` para afirmar que há dois itens correspondentes,
    // que são os dois itens padrão.
    cy.get('.todo-list li').should('have.length', 2)

    // Podemos ir além e verificar se os itens padrão contêm o texto correto.
    // Usamos as funções `first` e `last` para obter os primeiros e últimos elementos individualmente
    // e, em seguida, fazemos uma asserção com `should`.
    cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
    cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
  })

  it('pode adicionar novos itens à lista', () => {
    // Vamos armazenar o texto do novo item em uma variável para reutilizá-lo.
    const newItem = 'Feed the cat'

    // Pegamos o elemento de entrada e usamos o comando `type`
    // para inserir nosso novo item na lista. Após digitar o conteúdo do item,
    // precisamos pressionar a tecla Enter para enviar o formulário.
    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    // Agora que digitamos o novo item, vamos verificar se ele foi adicionado à lista.
    // Como é o item mais recente, deve ser o último elemento da lista.
    // Além disso, com os dois itens padrão, devemos ter um total de 3 elementos na lista.
    cy.get('.todo-list li')
      .should('have.length', 3)
      .last()
      .should('have.text', newItem)
  })

  it('pode marcar um item como concluído', () => {
    // Além de usar `get` para obter um elemento pelo seletor,
    // podemos usar `contains` para selecionar um elemento pelo seu conteúdo.
    // No entanto, isso retornará o elemento <label>, que é o menor elemento contendo o texto.
    // Para marcar o item como concluído, encontramos o elemento <input> associado a esse <label>,
    // subindo no DOM até o elemento pai. Em seguida, usamos `find` para localizar o checkbox <input>
    // e aplicamos o comando `check` para marcá-lo.
    cy.contains('Pay electric bill')
      .parent()
      .find('input[type=checkbox]')
      .check()

    // Agora que marcamos o item, verificamos se ele está com a classe de concluído.
    // Usamos `contains` para encontrar o elemento <label> e `parents`
    // para subir vários níveis no DOM até encontrar o elemento <li> correspondente.
    // Em seguida, verificamos se ele tem a classe `completed`.
    cy.contains('Pay electric bill')
      .parents('li')
      .should('have.class', 'completed')
  })

  context('com uma tarefa marcada como concluída', () => {
    beforeEach(() => {
      // Vamos reaproveitar o comando anterior para marcar um item como concluído
      // e garantir que cada teste comece com esse estado.
      cy.contains('Pay electric bill')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })

    it('pode filtrar as tarefas não concluídas', () => {
      // Clicamos no botão "Ativo" para exibir apenas as tarefas pendentes.
      cy.contains('Active').click()

      // Após o filtro, verificamos se há apenas um item na lista.
      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Walk the dog')

      // Também verificamos se a tarefa concluída não está mais na página.
      cy.contains('Pay electric bill').should('not.exist')
    })

    it('pode filtrar as tarefas concluídas', () => {
      // Clicamos no botão "Concluído" para exibir apenas as tarefas concluídas.
      cy.contains('Completed').click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .first()
        .should('have.text', 'Pay electric bill')

      cy.contains('Walk the dog').should('not.exist')
    })

    it('pode excluir todas as tarefas concluídas', () => {
      // Primeiro, clicamos no botão "Limpar concluídas".
      // O comando `contains` aqui tem duas funções:
      // 1. Garante que o botão existe no DOM. Esse botão só aparece quando há pelo menos uma tarefa concluída,
      //    então esse comando implicitamente verifica se ele está presente.
      // 2. Seleciona o botão para podermos clicar nele.
      cy.contains('Clear completed').click()

      // Depois, verificamos se resta apenas um item na lista e se o item removido não está mais lá.
      cy.get('.todo-list li')
        .should('have.length', 1)
        .should('not.have.text', 'Pay electric bill')

      // Por fim, garantimos que o botão "Limpar concluídas" não existe mais.
      cy.contains('Clear completed').should('not.exist')
    })
  })
})
