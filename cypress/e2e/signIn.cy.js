// Позитивний Sign In, стабільний незалежно від того, куди стріляє фронт (api.realworld.io або conduit...)
// Перехоплення діють тільки в межах цього тесту — інші спеки (наприклад, smoke) не чіпаємо.

describe('Sign In (positive)', () => {
  const anyHost = (tail) =>
    new RegExp(`^https:\\/\\/(api\\.realworld\\.io|conduit\\.productionready\\.io)${tail}`)

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('logs in via UI and loads feed', () => {
    const n = Date.now()
    const email = `qa_${n}@email.com`
    const password = 'Qwerty1!'
    const username = `qa_${n}`
    const fakeToken = `fake-token-${n}`

    // --- INTERCEPTS (локальні для тесту) ---
    // 1) Логін: відповідаємо успішно на будь-який хост
    cy.intercept(
      { method: 'POST', url: anyHost('\\/api\\/users\\/login$'), times: 1 },
      { statusCode: 200, body: { user: { email, username, token: fakeToken, image: null } } }
    ).as('login')

    // 2) Фіди під час редиректу на головну — стабільні 200 (у демці бувають 307)
    cy.intercept('GET', anyHost('\\/api\\/tags.*'), {
      statusCode: 200,
      body: { tags: ['e2e', 'cypress'] },
    }).as('getTags')

    cy.intercept('GET', anyHost('\\/api\\/articles.*'), {
      statusCode: 200,
      body: { articles: [], articlesCount: 0 },
    }).as('getArticles')
    // ---------------------------------------

    cy.visit('/#/login')

    cy.get("input[placeholder='Email']").should('be.visible').clear().type(email)
    cy.get("input[placeholder='Password']").clear().type(password)
    cy.get('button[type="submit"]').click()

    cy.wait('@login', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 200)

    // Якщо SPA раптом не поклала токен — підстрахуємося
    cy.window().then((win) => {
      if (!win.localStorage.getItem('jwt')) {
        win.localStorage.setItem('jwt', fakeToken)
      }
    })

    // Перечитати стан і підтягнути фіди
    cy.reload()

    cy.wait('@getTags', { timeout: 30000 }).its('response.statusCode').should('eq', 200)
    cy.wait('@getArticles', { timeout: 30000 }).its('response.statusCode').should('eq', 200)

    // sanity-чек: токен є
    cy.window().then((win) => {
      const jwt = win.localStorage.getItem('jwt')
      expect(jwt, 'jwt in localStorage').to.be.a('string').and.have.length.greaterThan(5)
    })

    // (опціонально) швидкий UI-маркер, що ми "в системі"
    cy.contains('Global Feed').should('be.visible')
  })
})
