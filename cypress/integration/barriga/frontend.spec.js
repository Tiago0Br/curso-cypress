/// <reference types="cypress" />

import loc from "../../support/locators"
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should test at a functional level', () => {
    after(() => {
        cy.clearLocalStorage()
    })

    beforeEach(() => {
        buildEnv()
        cy.login('a@a', 'Senha errada')
        cy.get(loc.MENU.HOME).click()
        // cy.resetApp()
    })

    it('Should create an account', () => {
        cy.intercept(
            'POST',
            '/contas',
            { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
        ).as('saveConta')

        cy.acessarMenuConta()

        cy.intercept(
            'GET',
            '/contas',
            [
                { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
            ]
        ).as('contasSave')

        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.intercept(
            'PUT',
            '/contas/**',
            { id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1 }
        )

        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create account with the same name', () => {
        cy.intercept({
            method: 'POST',
            url: '/contas'
        }, {
            statusCode: 400,
            body: { "error": "Já existe uma conta com esse nome!" }
        }).as('saveContaMesmoNome')

        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.intercept(
            'POST',
            '/transacoes',
            { 
                "id": 31433,
                "conta_id": 856690,
                "descricao": "asdasd", 
                "envolvido": "sdfsdfs", 
                "observacao": null, 
                "tipo": "REC", 
                "data_transacao": "2021-10-20T03:00:00.000Z", 
                "data_pagamento": "2021-10-21T03:00:00.000Z",
                "valor": "123.00",
                "usuario_id": 24919,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        )

        cy.intercept({
            method: 'GET',
            url: '/extrato/**'
        }, {
            fixture: 'movimentacaoSalva'
        })

        cy.get(loc.MENU.MOVIMENTACAO).click()

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.intercept(
            'GET',
            '/transacoes/**',
            {
                "conta": "Conta para saldo",
                "id": 795441,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-10-16T03:00:00.000Z",
                "data_pagamento": "2021-10-16T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 856694,
                "usuario_id": 24919,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        )

        cy.intercept(
            'PUT',
            '/transacoes/**',
            {
                "conta": "Conta para saldo",
                "id": 795441,
                "descricao": "Movimentacao 1, calculo saldo",
                "envolvido": "CCC",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2021-10-16T03:00:00.000Z",
                "data_pagamento": "2021-10-16T03:00:00.000Z",
                "valor": "3500.00",
                "status": false,
                "conta_id": 856694,
                "usuario_id": 24919,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        )

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '100,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.intercept(
            'GET',
            '/saldo',
            [{
                conta_id: 999,
                conta: 'Carteira',
                saldo: '4034.00'
            },
            {
                conta_id: 9909,
                conta: 'Banco',
                saldo: '10000000.00'
            }]
        ).as('saldoFinal')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira')).should('contain', '4.034,00')
    })

    it('Should remove a transaction', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/transacoes/**'
        }, {
            statusCode: 204,
            body: {}
        }).as('del')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it('Should validate data send to create an account', () => {
        cy.intercept(
            'POST',
            '/contas',
            {
                body: { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 },
            }
        ).as('saveConta')

        cy.acessarMenuConta()

        cy.intercept(
            'GET',
            '/contas',
            [
                { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
                { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 },
                { id: 3, nome: 'Conta de teste', visivel: true, usuario_id: 1 }
            ]
        ).as('contasSave')

        cy.inserirConta('{CONTROL}')
        // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it.only('Should test colors', () => {
        cy.intercept({
            method: 'GET',
            url: '/extrato/**'
        }, {
            body: [
                {"conta":"Conta para alterar", "id":822996,"descricao":"Receita paga", "envolvido":"Eu mesmo", "observacao":null, "tipo":"REC", "data_transacao":"2021-10-20T03:00:00.000Z", "data_pagamento":"2021-10-21T03:00:00.000Z", "valor":"150.00", "status":true, "conta_id":856690, "usuario_id":24919, "transferencia_id":null, "parcelamento_id":null},
                {"conta":"Conta com movimentacao","id":795440,"descricao":"Receita pendente","envolvido":"BBB","observacao":null,"tipo":"REC","data_transacao":"2021-10-16T03:00:00.000Z","data_pagamento":"2021-10-16T03:00:00.000Z","valor":"-1500.00","status":false,"conta_id":856693,"usuario_id":24919,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":795441,"descricao":"Despesa paga","envolvido":"CCC","observacao":null,"tipo":"DESP","data_transacao":"2021-10-16T03:00:00.000Z","data_pagamento":"2021-10-16T03:00:00.000Z","valor":"3500.00","status":true,"conta_id":856694,"usuario_id":24919,"transferencia_id":null,"parcelamento_id":null},
                {"conta":"Conta para saldo","id":795442,"descricao":"Despesa pendente","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-10-16T03:00:00.000Z","data_pagamento":"2021-10-16T03:00:00.000Z","valor":"-1000.00","status":false,"conta_id":856694,"usuario_id":24919,"transferencia_id":null,"parcelamento_id":null}
            ]
        })

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
    })
})