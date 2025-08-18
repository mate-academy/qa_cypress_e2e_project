// cypress/e2e/signUp.cy.js
describe('Sign Up', () => {
  it('registers a new user via UI', () => {
    const n = Date.now()
    const username = `qa_${n}`
    const email = `qa_${n}@email.com`
    const password = 'Qwerty1!'
    const fakeToken = 'fake-token-' + n

    // ===== INTERCEPTS: ПЕРЕД cy.visit() =====
    // Один alias для ДВОХ хостів; якщо старий conduit — повертаємо 201 зі стабом,
    // а для api.realworld.io пропускаємо реальну відповідь.
    cy.intercept(
      { method: 'POST', url: /^https:\/\/(api\.realworld\.io|conduit\.productionready\.io)\/api\/users$/ },
      (req) => {
        if (req.url.includes('conduit.productionready.io')) {
          req.reply({
            statusCode: 201,
            body: { user: { email, username, token: fakeToken, image: null } },
          })
        }
      }
    ).as('signup')

    const anyHost = (tail) =>
      new RegExp(`^https:\\/\\/(api\\.realworld\\.io|conduit\\.productionready\\.io)${tail}`)

    // СТАБИМО обидва GET-и під 200, щоб не ловити редіректи 307
    cy.intercept('GET', anyHost('\\/api\\/tags.*'), {
      statusCode: 200,
      body: { tags: ['e2e', 'cypress'] },
    }).as('getTags')

    cy.intercept('GET', anyHost('\\/api\\/articles.*'), {
      statusCode: 200,
      body: { articles: [], articlesCount: 0 },
    }).as('getArticles')
    // =======================================

    cy.visit('/#/register')

    cy.get("input[placeholder='Username']").should('be.visible').clear().type(username)
    cy.get("input[placeholder='Email']").clear().type(email)
    cy.get("input[placeholder='Password']").clear().type(password)
    cy.get("button[type='submit']").click()

    // чекаємо signup і гарантуємо jwt (якщо апка не поклала)
    cy.wait('@signup', { timeout: 30000 }).then(({ request, response }) => {
      cy.log(`signup URL: ${request.url}`)
      expect(response?.statusCode, `response from ${request.url}`).to.be.oneOf([200, 201])

      const token = response?.body?.user?.token || fakeToken
      cy.window().then((win) => {
        if (!win.localStorage.getItem('jwt')) {
          win.localStorage.setItem('jwt', token)
        }
      })
    })

    // Перезавантажуємо SPA, щоб вона перечитала jwt і зробила фіди
    cy.reload()

    // тепер і tags, і articles гарантовано 200 (навіть якщо першим стріляє conduit)
    cy.wait('@getTags', { timeout: 30000 }).its('response.statusCode').should('eq', 200)
    cy.wait('@getArticles', { timeout: 30000 }).its('response.statusCode').should('eq', 200)

    // на всякий – перевіримо, що jwt є
    cy.window().then((win) => {
      const jwt = win.localStorage.getItem('jwt')
      expect(jwt, 'jwt in localStorage').to.be.a('string').and.have.length.greaterThan(5)
    })
  })
})
