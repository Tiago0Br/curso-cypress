/// <reference types="cypress" />

describe('Cypress basics', () => {
    it('Should visit a page and assert title', () => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')

        // const title = cy.title()
        // console.log(title)

        cy.title().should("be.equal", "Campo de Treinamento")
        cy.title().should("contain", "Campo")

        cy.title().should("be.equal", 'Campo de Treinamento')
            .and("contain", 'Campo')

        //TODO imprimir o log no console
        //TODO escrever o log em um campo de texto
    })
})