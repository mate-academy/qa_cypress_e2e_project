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

Cypress.Commands.add('register', ({ email, username, password }) => {
  cy.request('POST', '/api/users', {
    user: {
      email,
      username,
      password
    }
  }).then((res) => ({
    ...res.body.user,
    password
  }));
});

Cypress.Commands.add('login', (user) => {
  cy.register(user)
    .then(({ email, password }) => {
      cy.request('POST', '/api/users/login', { user: { email, password } })
        .then((res) => {
          cy.setCookie('drash_sess', res.body.user.token);
        });
    });
});
