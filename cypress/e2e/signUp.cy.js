/// <reference types="cypress" />
/// <reference types="../support" />

const {generateNewUser} = require('../support/generateNewUser');

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.visit('#/register')
  });

  const { username, email, password } = generateNewUser();

  it('should provide an ability for the user to sign up with valid data', () => {
    cy.get('[data-qa="username-sign-up"]')
      .type(username);
    cy.get('[data-qa="email-sign-up"]')
      .type(email);
    cy.get('[data-qa="password-sign-up"]')
      .type(password);
    cy.get('[data-qa="sign-up-btn"]')
      .click();
    cy.contains('.swal-modal', 'Your registration was successful!')
      .should('exist');
  });

  it('should not provide an ability to the user to sign up with empty username', () => {
    cy.get('[data-qa="email-sign-up"]')
      .type(email);
    cy.get('[data-qa="password-sign-up"]')
      .type(password);
    cy.get('[data-qa="sign-up-btn"]')
      .click();
    cy.contains('.swal-modal', 'Username field required.')
      .should('exist');
  });

  it('should not provide an ability to the user to sign up with empty email', () => {
    cy.get('[data-qa="username-sign-up"]')
    .type(username);
    cy.get('[data-qa="password-sign-up"]')
      .type(password);
    cy.get('[data-qa="sign-up-btn"]')
      .click();
    cy.contains('.swal-modal', 'Email field required.')
      .should('exist');
  });

  it('should not provide an ability to the user to sign up with empty password', () => {
    cy.get('[data-qa="username-sign-up"]')
      .type(username);
    cy.get('[data-qa="email-sign-up"]')
      .type(email);
    cy.get('[data-qa="sign-up-btn"]')
      .click();
    cy.contains('.swal-modal', 'Password field required.')
      .should('exist');
  });

  it('should not provide an ability to the user to sign up with already taken email', () => {
  cy.get('[data-qa="username-sign-up"]')
    .type(username);
  cy.get('[data-qa="email-sign-up"]')
    .type('karcofe007@gmail.com');
  cy.get('[data-qa="password-sign-up"]')
    .type(password);
  cy.get('[data-qa="sign-up-btn"]')
    .click();
  cy.contains('.swal-modal', 'Email already taken.')
    .should('exist');
  });
});
