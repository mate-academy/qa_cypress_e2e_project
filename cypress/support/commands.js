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
import SignInPageObject from './pages/signIn.pageObject';

const signInPage = new SignInPageObject();

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  signInPage.visit();

  signInPage.typeEmail(email);
  signInPage.typePassword(password);
  signInPage.clickSignInBtn();

  cy.contains('Global Feed');
});

Cypress.Commands.add('createArticle', (username, email, password, title, description, body, tag) => {
  cy.request('POST', '/users', {
    username,
    email,
    password
  }).then((response) => {
    expect(response.status).to.equal(200);

    cy.setCookie('drash_sess', response.body.user.token);
    const authorId = response.body.user.id;

    cy.request('POST', '/articles', {
      article: {
        title,
        description,
        body,
        author_id: authorId,
        tags: tag
      }
    });
  });
});
