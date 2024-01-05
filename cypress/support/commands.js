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

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', { email, password, username });
});
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/users/login', { user: { email, password } }).then(
    (response) => {
      const user = {
        username: response.body.user.username,
        email: response.body.user.email,
        bio: response.body.user.bio,
        effectiveImage:
          'https://static.productionready.io/images/smiley-cyrus.jpg',
        image: response.body.user.image,
        token: response.body.user.token
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('drash_sess', response.body.user.token);
    }
  );
});

Cypress.Commands.add('createArticle',
  (username, email, password, title, description, body, tag) => {
    cy.request('POST', '/users', {
      username,
      email,
      password
    }).then((response) => {
      cy.setCookie('drash_sess', response.body.user.token);
      cy.request('POST', '/articles', {
        article: {
          title,
          description,
          body,
          author_id: response.body.user.id,
          tags: tag
        }
      });
    });
  });
