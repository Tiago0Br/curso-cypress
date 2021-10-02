/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    before(() => {
        // cy.login('a@a', 'a')
    })

    beforeEach(() => {
        // cy.resetApp()
    })

    it('Should create an account', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: Cypress.env('email'),
                senha: Cypress.env('senha'),
                redirecionar: false
            }
        }).its('body.token').should('not.be.empty')
    })

    it('Should update an account', () => {
    })

    it('Should not create account with the same name', () => {
    })

    it('Should create a transaction', () => {
    })

    it('Should get balance', () => {
    })

    it('Should remove a transaction', () => {
    })
})