// cypress/e2e/settings.cy.js
describe('Settings page', () => {
  const user = { email: 'qa@email.com', username: 'qa_user', token: 'dummy.jwt.token' }

  const uiLogin = () => {
    cy.intercept('POST', '**/api/users/login', { statusCode: 200, body: { user } }).as('login')
    cy.intercept('GET',  '**/api/tags',        { statusCode: 200, body: { tags: ['cypress','e2e'] } }).as('tags')
    cy.intercept('GET',  '**/api/articles*',   { statusCode: 200, body: { articles: [], articlesCount: 0 } }).as('feed')

    cy.visit('/#/login')
    cy.get('input[type="email"]').type(user.email)
    cy.get('input[type="password"]').type('Qwerty1!')
    cy.get('button[type="submit"]').click()
    cy.wait('@login')
  }

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.viewport(1366, 900)
    uiLogin()

    cy.contains('a.nav-link', 'Settings', { matchCase: false, timeout: 20000 }).click()
    cy.location('hash', { timeout: 15000 }).should('include', '/settings')
    cy.contains('h1', 'Your Settings', { timeout: 20000 }).should('be.visible')
  })

  it('should provide an ability to update username', () => {
    const username = `qa_${Date.now()}`

    cy.intercept('PUT', '**/api/user', (req) => {
      expect(req.body.user.username).to.eq(username)
      req.reply({ statusCode: 200, body: { user: { ...user, username } } })
    }).as('updName')

    cy.get('input[placeholder="Username"]').clear().type(username)
    cy.contains('button', 'Update Settings').click()
    cy.wait('@updName')

    // Навбар має показати нове імʼя
    cy.contains('a.nav-link', username, { matchCase: false, timeout: 20000 }).should('be.visible')
  })

  it('should provide an ability to update bio', () => {
    const bio = `bio-${Date.now()}`

    cy.intercept('PUT', '**/api/user', (req) => {
      expect(req.body.user.bio).to.eq(bio)
      req.reply({ statusCode: 200, body: { user: { ...user, bio } } })
    }).as('updBio')

    cy.get('textarea[placeholder="Short bio about you"]').clear().type(bio)
    cy.contains('button', 'Update Settings').click()
    cy.wait('@updBio')
  })

  it('should provide an ability to update an email', () => {
    const email = `qa_${Date.now()}@email.com`

    cy.intercept('PUT', '**/api/user', (req) => {
      expect(req.body.user.email).to.eq(email)
      req.reply({ statusCode: 200, body: { user: { ...user, email } } })
    }).as('updEmail')

    cy.get('input[placeholder="Email"]').clear().type(email)
    cy.contains('button', 'Update Settings').click()
    cy.wait('@updEmail')
  })

it('should provide an ability to update password', () => {
  const password = 'Qwerty2!'

  cy.intercept('PUT', '**/api/user', (req) => {
    expect(req.body.user.password).to.eq(password)
    req.reply({ statusCode: 200, body: { user } }) // сервер пароль не возвращает
  }).as('updPass')

  // ищем инпут пароля внутри формы Settings
  cy.get('form').within(() => {
    cy.get('input[placeholder="Password"], input[placeholder="New Password"], input[type="password"]')
      .first()
      .should('be.visible')
      .clear()
      .type(password)
  })

  cy.contains('button', 'Update Settings').click()
  cy.wait('@updPass')
})


  it('should provide an ability to log out', () => {
    // Кнопка саме на Settings
    cy.contains('button', 'Logout', { matchCase: false, timeout: 20000 })
      .should('be.visible')
      .click()

    cy.location('hash', { timeout: 15000 }).should('eq', '#/')

    // JWT повинен зникнути
    cy.window().then(win => {
      expect(win.localStorage.getItem('jwt'), 'jwt after logout').to.be.null
    })

    // І ми вже гість
    cy.contains('a.nav-link', 'Sign in', { matchCase: false, timeout: 20000 }).should('be.visible')
    cy.get('a.nav-link[href*="settings"]:visible').should('not.exist')
  })
})
