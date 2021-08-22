/// <reference types="cypress" />

describe('Work with Popup', () => {
    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('http://www.wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as("winOpen")
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })
})