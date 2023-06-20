/// <reference types="cypress" />
/// <reference types="../support" />

describe('Sign Up page', () => {
  let user

  before(() => {
    cy.task('db:clear')
    cy.task('generateUser').then((generateUser) => {
      user = generateUser
    })
  })

  it('should provide an ability to register a new account', () => {
    const successRegistrationTitle = 'Welcome!'
    const successRegistrationText = 'Your registration was successful!'
    cy.intercept('POST', '/users').as('registration')

    cy.visit('/#/')
    cy.getByDataCy('sign-up-link').click()
    cy.getByDataCy('username-field').type(user.username)
    cy.getByDataCy('email-field').type(user.email)
    cy.getByDataCy('password-field').type(user.password)
    cy.getByDataCy('sign-up-btn').click()

    cy.wait('@registration')
    cy.get('.swal-title').should('have.text', successRegistrationTitle)
    cy.get('.swal-text').should('have.text', successRegistrationText)
  })

  it('should not allow registration with an email entered not in the format part@domain.top', () => {
    const unsuccessRegistrationTitle = 'Registration failed!'
    const unsuccessRegistrationText = 'Email must be a valid email. '
    const email = 'blablabla'

    cy.visit('/#/')
    cy.getByDataCy('sign-up-link').click()
    cy.getByDataCy('username-field').type(user.username)
    cy.getByDataCy('email-field').type(email)
    cy.getByDataCy('password-field').type(user.password)
    cy.getByDataCy('sign-up-btn').click()

    cy.get('.swal-title').should('have.text', unsuccessRegistrationTitle)
    cy.get('.swal-text').should('have.text', unsuccessRegistrationText)
  })

  it('should not allow to register with an empty Username field', () => {
    const unsuccessRegistrationTitle = 'Registration failed!'
    const unsuccessRegistrationText = 'Username field required. '

    cy.visit('/#/')
    cy.getByDataCy('sign-up-link').click()
    cy.getByDataCy('email-field').type(user.email)
    cy.getByDataCy('password-field').type(user.password)
    cy.getByDataCy('sign-up-btn').click()

    cy.get('.swal-title').should('have.text', unsuccessRegistrationTitle)
    cy.get('.swal-text').should('have.text', unsuccessRegistrationText)
  })

  it('should not allow to register with an empty Email field', () => {
    const unsuccessRegistrationTitle = 'Registration failed!'
    const unsuccessRegistrationText = 'Email field required. '

    cy.visit('/#/')
    cy.getByDataCy('sign-up-link').click()
    cy.getByDataCy('username-field').type(user.username)
    cy.getByDataCy('password-field').type(user.password)
    cy.getByDataCy('sign-up-btn').click()

    cy.get('.swal-title').should('have.text', unsuccessRegistrationTitle)
    cy.get('.swal-text').should('have.text', unsuccessRegistrationText)
  })

  it('should not allow to register with an empty Password field', () => {
    const unsuccessRegistrationTitle = 'Registration failed!'
    const unsuccessRegistrationText = 'Password field required. '

    cy.visit('/#/')
    cy.getByDataCy('sign-up-link').click()
    cy.getByDataCy('username-field').type(user.username)
    cy.getByDataCy('email-field').type(user.email)
    cy.getByDataCy('sign-up-btn').click()

    cy.get('.swal-title').should('have.text', unsuccessRegistrationTitle)
    cy.get('.swal-text').should('have.text', unsuccessRegistrationText)
  })
})
