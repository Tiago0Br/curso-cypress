/// <reference types="cypress" />

import loc from "../../support/locators"

describe('Should test at a functional level', () => {
    before(() => {
        cy.login(Cypress.env('email'), Cypress.env('senha'))
        cy.resetApp()
        // cy.visit('https://barrigareact.wcaquino.me/')
        // cy.get(loc.LOGIN.USER).type(Cypress.env('email'))
        // cy.get(loc.LOGIN.PASSWORD).type(Cypress.env('senha'))
        // cy.get(loc.LOGIN.BTN_LOGIN).click()
        // cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    it('Should create an account', () => {
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.get(loc.CONTAS.NOME).type('Conta de teste')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => {
        // cy.get(':nth-child(7) > nth-child(2) > .fa-edit')
        cy.get(loc.MENU.SETTINGS).click()
        cy.get(loc.MENU.CONTAS).click()
        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })
})