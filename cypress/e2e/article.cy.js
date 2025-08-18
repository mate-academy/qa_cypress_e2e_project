// cypress/e2e/article.cy.js
describe('Article', () => {
  const user = { email: 'qa@email.com', username: 'qa_user', token: 'dummy.jwt.token' }

  const makeData = () => {
    const k = Date.now()
    return {
      slug: `slug-${k}`,
      title: `Article ${k}`,
      description: `About ${k}`,
      body: `Body ${k}`
    }
  }

  const uiLogin = () => {
    cy.intercept('POST', '**/api/users/login', { statusCode: 200, body: { user } }).as('login')
    cy.intercept('GET', '**/api/tags', { statusCode: 200, body: { tags: ['cypress', 'e2e'] } }).as('tags')
    cy.intercept('GET', '**/api/articles*', { statusCode: 200, body: { articles: [], articlesCount: 0 } }).as('feed')

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
  })

  it('should be created using New Article form', () => {
    const a = makeData()

    cy.intercept('POST', '**/api/articles', req => {
      expect(req.body.article.title).to.eq(a.title)
      expect(req.body.article.description).to.eq(a.description)
      expect(req.body.article.body).to.eq(a.body)
      req.reply({
        statusCode: 200,
        body: { article: {
          slug: a.slug, title: a.title, description: a.description, body: a.body,
          tagList: ['e2e'], author: { username: user.username },
          favorited: false, favoritesCount: 0,
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
        } }
      })
    }).as('create')

    cy.intercept('GET', `**/api/articles/${a.slug}`, {
      statusCode: 200,
      body: { article: {
        slug: a.slug, title: a.title, description: a.description, body: a.body,
        tagList: ['e2e'], author: { username: user.username }
      } }
    }).as('showCreated')

    cy.contains('a.nav-link', 'New Article', { matchCase: false, timeout: 20000 }).click()
    cy.get('input[placeholder="Article Title"]').type(a.title)
    cy.get('input[placeholder="What\'s this article about?"]').type(a.description)
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(a.body)
    cy.get('input[placeholder="Enter tags"]').type('e2e{enter}')
    cy.contains('button', 'Publish Article').click()

    cy.wait('@create')
    cy.contains('h1', a.title, { timeout: 20000 }).should('be.visible')
  })

  it('should be edited using Edit button', () => {
    const a = makeData()

    // seed: статья уже «существует»
    cy.intercept('POST', '**/api/articles', {
      statusCode: 200,
      body: { article: { slug: a.slug, title: a.title, description: a.description, body: a.body, tagList: [], author: { username: user.username } } }
    }).as('createSeed')
    cy.intercept('GET', `**/api/articles/${a.slug}`, {
      statusCode: 200,
      body: { article: { slug: a.slug, title: a.title, description: a.description, body: a.body, tagList: [], author: { username: user.username } } }
    }).as('showSeed')

    cy.contains('a.nav-link', 'New Article', { matchCase: false, timeout: 20000 }).click()
    cy.get('input[placeholder="Article Title"]').type(a.title)
    cy.get('input[placeholder="What\'s this article about?"]').type(a.description)
    cy.get('textarea[placeholder="Write your article (in markdown)"]').type(a.body)
    cy.contains('button', 'Publish Article').click()
    cy.wait('@createSeed')
    cy.contains('h1', a.title, { timeout: 20000 }).should('be.visible')

    const updated = { ...a, title: `${a.title} (edited)`, body: `${a.body} (edited)` }

    cy.intercept('PUT', `**/api/articles/${a.slug}`, {
      statusCode: 200,
      body: { article: { slug: a.slug, title: updated.title, description: a.description, body: updated.body, tagList: [], author: { username: user.username } } }
    }).as('update')
    cy.intercept('GET', `**/api/articles/${a.slug}`, {
      statusCode: 200,
      body: { article: { slug: a.slug, title: updated.title, description: a.description, body: updated.body, tagList: [], author: { username: user.username } } }
    }).as('showUpdated')

    cy.contains('a', 'Edit Article', { matchCase: false }).click()
    cy.get('input[placeholder="Article Title"]').clear().type(updated.title)
    cy.get('textarea[placeholder="Write your article (in markdown)"]').clear().type(updated.body)
    cy.contains('button', 'Publish Article').click()

    cy.wait('@update')
        cy.contains('h1', updated.title, { timeout: 20000 }).should('be.visible')
      })
    })

  

    it('should be deleted using Delete button', () => {
  const user = { email: 'qa@email.com', username: 'qa_user', token: 'dummy.jwt.token' }
  const k = Date.now()
  const a = { slug: `slug-${k}`, title: `Article ${k}`, description: `About ${k}`, body: `Body ${k}` }

  // стабильный логин
  cy.intercept('POST', '**/api/users/login', { statusCode: 200, body: { user } }).as('login')
  cy.intercept('GET',  '**/api/tags',       { statusCode: 200, body: { tags: ['cypress', 'e2e'] } }).as('tags')
  cy.intercept('GET',  '**/api/articles*',  { statusCode: 200, body: { articles: [], articlesCount: 0 } }).as('feed')
  cy.visit('/#/login')
  cy.get('input[type="email"]').type(user.email)
  cy.get('input[type="password"]').type('Qwerty1!')
  cy.get('button[type="submit"]').click()
  cy.wait('@login')
  cy.contains('a.nav-link', 'Settings', { matchCase: false, timeout: 20000 }).should('be.visible')

  // seed статьи
  cy.intercept('POST', '**/api/articles', {
    statusCode: 200,
    body: { article: { slug: a.slug, title: a.title, description: a.description, body: a.body, tagList: [], author: { username: user.username } } }
  }).as('createSeed')
  cy.intercept('GET', `**/api/articles/${a.slug}`, {
    statusCode: 200,
    body: { article: { slug: a.slug, title: a.title, description: a.description, body: a.body, tagList: [], author: { username: user.username } } }
  }).as('showSeed')

  cy.contains('a.nav-link', 'New Article', { matchCase: false, timeout: 20000 }).click()
  cy.get('input[placeholder="Article Title"]').type(a.title)
  cy.get('input[placeholder="What\'s this article about?"]').type(a.description)
  cy.get('textarea[placeholder="Write your article (in markdown)"]').type(a.body)
  cy.contains('button', 'Publish Article').click()
  cy.wait('@createSeed')
  cy.contains('h1', a.title, { timeout: 20000 }).should('be.visible')

  // удаление
  cy.intercept('DELETE', `**/api/articles/${a.slug}`, { statusCode: 200, body: {} }).as('remove')
  cy.contains('button', 'Delete Article', { matchCase: false }).should('be.visible').click()
  cy.wait('@remove')

  // RealWorld остаётся залогиненным → проверяем так
  cy.location('hash', { timeout: 15000 }).should('eq', '#/')
  cy.contains('a.nav-link', 'Settings', { matchCase: false, timeout: 20000 }).should('be.visible')
  cy.get('a.nav-link[href*="login"]:visible').should('not.exist')
})
