/// <reference types="cypress" />

describe('Work with basic elements', () => {
    it('Text', () => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
        cy.get('body').should("contain", 'Cuidado')
        // cy.get('body').should("have.text", 'Cuidado')
        cy.get('span').should("contain", 'Cuidado')
        // cy.get('div').should("contain", 'Cuidado')
        cy.get('span').should("contain", 'Cuidado')
        cy.get('.facilAchar').should("have.text", 'Cuidado onde clica, muitas armadilhas...')
    })
})