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

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', (username, email, password) => {
  cy.request('POST', '/users', {
    username,
    email,
    password
  });
});

Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle',
  (username, email, password, body, description, tag, title) => {
    cy.request('POST', '/users', {
      username,
      email,
      password
    }).then((response) => {
      const userId = response.body.user.id;
      const authToken = response.body.user.token;

      cy.setCookie('drash_sess', authToken);

      cy.request({
        method: 'POST',
        url: '/articles',
        body: {
          article: {
            author_id: userId,
            body,
            description,
            tags: tag,
            title
          }
        },
        headers: {
          Authorization: authToken
        }
      });
    });
  });