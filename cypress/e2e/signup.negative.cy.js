// cypress/e2e/signup.negative.cy.js
// Мета: сервер повертає 422, фронт показує помилку, jwt НЕ зʼявляється.

describe('Auth / Sign Up (negative)', () => {
  // Матчимо будь-який хост: і api.realworld.io, і conduit.productionready.io
  const API_USERS = '**/api/users'

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  it('shows API validation error and does not set jwt', () => {
    // Стабимо відповідь бекенду 422 — "email is invalid"
    cy.intercept('POST', API_USERS, {
      statusCode: 422,
      body: { errors: { email: ['is invalid'] } },
    }).as('signupFail')

    cy.visit('/#/register')

    // ВАЖЛИВО: email має бути СИНТАКСИЧНО валідним, щоб сабміт не заблокувався браузером
    const n = Date.now()
    cy.get('input[placeholder="Username"]').clear().type(`qa_bad_${n}`)
    cy.get('input[placeholder="Email"]').clear().type(`bad+${n}@mail.test`)
    cy.get('input[placeholder="Password"]').clear().type('Qwerty1!')
    cy.get('button[type="submit"]').click()

    // Запит точно піде і впаде на нашому стабі 422
    cy.wait('@signupFail', { timeout: 30000 })
      .its('response.statusCode')
      .should('eq', 422)

    // Фронт показує помилку
    cy.get('.error-messages').should('be.visible')

    // Токен НЕ зʼявляється
    cy.window().then((win) => {
      expect(win.localStorage.getItem('jwt')).to.be.null
    })
  })
})
