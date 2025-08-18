// Мета: при неправильних логін-даних бачимо помилку, а jwt НЕ зʼявляється.
describe('Auth / Sign In (negative)', () => {
  // Матчимо обидва хости (демо інколи ходить на старий домен)
  const anyHost = (tail) =>
    new RegExp(`^https:\\/\\/(api\\.realworld\\.io|conduit\\.productionready\\.io)${tail}`)

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('shows error on invalid credentials and does not set jwt', () => {
    // Стабимо невдалий логін
    cy.intercept(
      { method: 'POST', url: anyHost('\\/api\\/users\\/login$'), times: 1 },
      { statusCode: 403, body: { errors: { 'email or password': ['is invalid'] } } }
    ).as('loginFail')

    cy.visit('/#/login')
    cy.get('input[placeholder="Email"]').type('wrong@example.com')
    cy.get('input[placeholder="Password"]').type('bad-pass-123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginFail', { timeout: 30000 })
      .its('response.statusCode')
      .should('be.oneOf', [401, 403, 422])

    cy.get('.error-messages').should('be.visible')

    cy.window().then((win) => {
      expect(win.localStorage.getItem('jwt')).to.be.null
    })
  })
})
