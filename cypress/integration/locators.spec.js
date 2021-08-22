/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
        cy.reload()
    })

    it('...', () => {
        
    })
})