describe('Auth / Sign Out', () => {
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.viewport(1366, 900)

    cy.intercept('POST', '**/api/users/login', {
      statusCode: 200,
      body: { user: { email: 'qa@email.com', username: 'qa_user', token: 'dummy.jwt.token' } }
    }).as('login')

    cy.intercept('GET', '**/api/tags', {
      statusCode: 200,
      body: { tags: ['cypress', 'e2e', 'demo'] }
    }).as('tags')

    cy.intercept('GET', '**/api/articles*', {
      statusCode: 200,
      body: { articles: [], articlesCount: 0 }
    }).as('articles')
  })

  it('clears jwt and returns to logged-out state (stable)', () => {
    cy.visit('/#/login')

    cy.get('input[type="email"]').type('qa@email.com')
    cy.get('input[type="password"]').type('Qwerty1!')
    cy.get('button[type="submit"]').click()
    cy.wait('@login')

    cy.contains('a.nav-link', 'Settings', { matchCase: false, timeout: 20000 }).should('be.visible').click()

    cy.location('hash', { timeout: 15000 }).should('include', '/settings')
    cy.contains('h1', 'Your Settings', { timeout: 20000 }).should('be.visible')

    cy.contains('button', 'Logout', { matchCase: false }).should('be.visible').click()

    cy.location('hash', { timeout: 15000 }).should('eq', '#/')
    cy.contains('a.nav-link', 'Sign in', { matchCase: false, timeout: 20000 }).should('be.visible')

    // вот тут ключевая правка:
    cy.get('a.nav-link[href*="settings"]:visible').should('not.exist')

    cy.window().then(win => {
      expect(win.localStorage.getItem('jwt')).to.be.null
    })
  })
})
