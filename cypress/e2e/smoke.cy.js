describe('Smoke', () => {
  it('opens home (stable)', () => {
    cy.intercept('GET', '**/api/articles*', {
      statusCode: 200,
      body: {
        articles: [
          {
            slug: 'hello-cypress',
            title: 'Hello Cypress',
            description: 'smoke',
            body: 'smoke',
            tagList: ['cypress'],
            createdAt: '2025-01-01T00:00:00.000Z',
            updatedAt: '2025-01-01T00:00:00.000Z',
            favorited: false,
            favoritesCount: 0,
            author: { username: 'bot', bio: null, image: null, following: false }
          }
        ],
        articlesCount: 1
      }
    }).as('getArticles')

    cy.intercept('GET', '**/api/tags', {
      statusCode: 200,
      body: { tags: ['cypress', 'testing'] }
    }).as('getTags')

    cy.visit('/')

    cy.wait('@getArticles').its('response.statusCode').should('eq', 200)
    cy.get('a.nav-link').contains('Sign in').should('be.visible')
    cy.get('.article-preview').should('have.length.at.least', 1)

    cy.wait('@getTags').its('response.statusCode').should('eq', 200)
    cy.get('.tag-list .tag-pill').should('have.length.at.least', 1)
  })
})
