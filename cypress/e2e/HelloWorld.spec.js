describe('Notification Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4173') // Certifique-se de que a URL está correta
  })

  it('should display a notification when a task is about to expire', () => {
    const taskName = 'Test Task'
    const futureDate = new Date(Date.now() + 6 * 60 * 1000).toISOString().slice(0, 16) // 6 minutos a partir de agora

    // Preenche o campo de tarefa
    cy.get('input[placeholder="Enter new task"]').type(taskName)

    // Preenche o campo de data e hora
    cy.get('input[type="datetime-local"]').type(futureDate)

    // Clica no botão de adicionar nova tarefa
    cy.get('button').contains('New').click()

    // Avança o tempo em 5 minutos e 1 segundo para disparar a notificação
    cy.clock()
    cy.tick(5 * 60 * 1000 + 1000)

    // Verifica se a notificação aparece
    cy.get('.notification').should(
      'contain',
      `The task "${taskName}" is due in less than 5 minutes!`
    )
  })

  it('should allow closing the notification', () => {
    const taskName = 'Test Task'
    const futureDate = new Date(Date.now() + 6 * 60 * 1000).toISOString().slice(0, 16) // 6 minutos a partir de agora

    // Preenche o campo de tarefa
    cy.get('input[placeholder="Enter new task"]').type(taskName)

    // Preenche o campo de data e hora
    cy.get('input[type="datetime-local"]').type(futureDate)

    // Clica no botão de adicionar nova tarefa
    cy.get('button').contains('New').click()

    // Avança o tempo em 5 minutos e 1 segundo para disparar a notificação
    cy.clock()
    cy.tick(5 * 60 * 1000 + 1000)

    // Verifica se a notificação aparece
    cy.get('.notification').should(
      'contain',
      `The task "${taskName}" is due in less than 5 minutes!`
    )

    // Fecha a notificação
    cy.get('.notification button').contains('Close').click()

    // Verifica se a notificação foi removida
    cy.get('.notification').should('not.exist')
  })
})
