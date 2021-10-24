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
}

export default buildEnv