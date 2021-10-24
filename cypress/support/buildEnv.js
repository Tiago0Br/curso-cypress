const buildEnv = () => {
    cy.intercept(
        'POST',
        '/signin',
        {
            id: 1000,
            nome: 'Usuário falso',
            token: 'Uma string muito grande que não deveria ser aceito, mas na verdade vai'
        }
    ).as('signin')

    cy.intercept(
        'GET',
        '/saldo',
        [{
            conta_id: 999,
            conta: 'Carteira',
            saldo: '100.00'
        },
        {
            conta_id: 9909,
            conta: 'Banco',
            saldo: '10000000.00'
        }]
    ).as('saldo')

    cy.intercept(
        'GET',
        '/contas',
        [
            { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
            { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 }
        ]
    ).as('contas')

    cy.intercept(
        'GET',
        '/extrato/**',
        [
            {"conta":"Conta para alterar", "id":822996,"descricao":"Teste", "envolvido":"Eu mesmo", "observacao":null, "tipo":"REC", "data_transacao":"2021-10-20T03:00:00.000Z", "data_pagamento":"2021-10-21T03:00:00.000Z", "valor":"150.00", "status":true, "conta_id":856690, "usuario_id":24919, "transferencia_id":null, "parcelamento_id":null},
            {"conta":"Conta com movimentacao","id":795440,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-10-16T03:00:00.000Z","data_pagamento":"2021-10-16T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":856693,"usuario_id":24919,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":795441,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-10-16T03:00:00.000Z","data_pagamento":"2021-10-16T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":856694,"usuario_id":24919,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":795442,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-10-16T03:00:00.000Z","data_pagamento":"2021-10-16T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":856694,"usuario_id":24919,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para saldo","id":795443,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-10-16T03:00:00.000Z","data_pagamento":"2021-10-16T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":856694,"usuario_id":24919,"transferencia_id":null,"parcelamento_id":null},
            {"conta":"Conta para extrato","id":795444,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-10-16T03:00:00.000Z","data_pagamento":"2021-10-16T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":856695,"usuario_id":24919,"transferencia_id":null,"parcelamento_id":null}
        ]
    )
}

export default buildEnv