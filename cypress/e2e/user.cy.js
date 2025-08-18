// cypress/e2e/user.cy.js
describe('Follow / Unfollow user', () => {
  const me = { email: 'qa@email.com', username: 'qa_user', token: 'dummy.jwt.token' }
  const target = 'jake' // кого фолловим

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.viewport(1366, 900)

    // стабильный логин через стаб
    cy.intercept('POST', '**/api/users/login', { statusCode: 200, body: { user: me } }).as('login')
    cy.intercept('GET',  '**/api/tags',        { statusCode: 200, body: { tags: ['cypress','e2e'] } }).as('tags')
    cy.intercept('GET',  '**/api/articles*',   { statusCode: 200, body: { articles: [], articlesCount: 0 } }).as('feed')

    cy.visit('/#/login')
    cy.get('input[type="email"]').type(me.email)
    cy.get('input[type="password"]').type('Qwerty1!')
    cy.get('button[type="submit"]').click()
    cy.wait('@login')
  })

  it('follows and then unfollows a user', () => {
    // профиль цели: гибкая маска под любой ник
    cy.intercept('GET', '**/api/profiles/*', (req) => {
      const username = req.url.split('/').pop()
      req.reply({
        statusCode: 200,
        body: { profile: { username, following: false, bio: '', image: null } }
      })
    }).as('profile')

    // follow → following: true
    cy.intercept('POST', '**/api/profiles/*/follow', (req) => {
      const username = req.url.split('/').slice(-2, -1)[0]
      req.reply({
        statusCode: 200,
        body: { profile: { username, following: true, bio: '', image: null } }
      })
    }).as('follow')

    // unfollow → following: false
    cy.intercept('DELETE', '**/api/profiles/*/follow', (req) => {
      const username = req.url.split('/').slice(-2, -1)[0]
      req.reply({
        statusCode: 200,
        body: { profile: { username, following: false, bio: '', image: null } }
      })
    }).as('unfollow')

    // ВАЖНО: в этой демке профиль по маршруту /#/@username
    cy.visit(`/#/@${target}`)
    cy.wait('@profile')

    cy.contains('button', 'Follow', { matchCase: false, timeout: 20000 }).should('be.visible').click()
    cy.wait('@follow')
    cy.contains('button', 'Unfollow', { matchCase: false }).should('be.visible')

    cy.contains('button', 'Unfollow', { matchCase: false }).click()
    cy.wait('@unfollow')
    cy.contains('button', 'Follow', { matchCase: false }).should('be.visible')
  })
})
