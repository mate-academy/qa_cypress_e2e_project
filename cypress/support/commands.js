// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

import SignUpPageObject from '../support/pages/signUp.pageObject';

const signUpPage = new SignUpPageObject;

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('createArticleViaUi', (article) => {
  cy.visit('/#/editor');
  cy.getByDataQa('article-title').type(article.title);
  cy.getByDataQa('article-description').type(article.description);
  cy.getByDataQa('article-body').type(article.body);
  cy.getByDataQa('submit-button').click();
})

Cypress.Commands.add('assertWrongCredsMessage', () => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Login failed!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Invalid user credentials.');
});

Cypress.Commands.add('assertLoginEmptyEmailMessage', () => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Login failed!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Email field required.');
});

Cypress.Commands.add('assertLoginEmptyPasswordMessage', () => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Login failed!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Password field required.');
});

Cypress.Commands.add('assertSuccessfulRegistration', (username) => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Welcome!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Your registration was successful!');

    cy.get('[class="swal-button swal-button--confirm"]').click();

  cy.getByDataQa('username-link').should('contain.text', username);
});

Cypress.Commands.add('assertSignUpEmptyUsernameMessage', () => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Registration failed!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Username field required.');
});

Cypress.Commands.add('assertSignUpEmptyEmailMessage', () => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Registration failed!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Email field required.');
});

Cypress.Commands.add('assertSignUpEmptyPasswordMessage', () => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Registration failed!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Password field required.');
});

Cypress.Commands.add('assertSignUpPasswordRequirementsMessage', () => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Registration failed!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
});

Cypress.Commands.add('assertSignUpInvalidEmalMessage', () => {
  cy.get('[class="swal-title"]')
      .should('contain.text', 'Registration failed!');

  cy.get('[class="swal-text"]')
      .should('contain.text', 'Email must be a valid email.');
});

Cypress.Commands.add('fillSignUpWithInvalidPassword', (user, invalidPassowrd) => {
  signUpPage.typeUsername(user.username);
  signUpPage.typeEmail(user.email);
  signUpPage.typePassword(invalidPassowrd);
  signUpPage.clickOnSignUpBtn;
});

Cypress.Commands.add('fillSignUpWithInvalidEmail', (user, invalidEmail) => {
  signUpPage.typeUsername(user.username);
  signUpPage.typeEmail(invalidEmail);
  signUpPage.typePassword(user.randomPassword);
  signUpPage.clickOnSignUpBtn;
});
