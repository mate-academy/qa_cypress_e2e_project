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

Cypress.Commands.add('getByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((response) => {
    const user = {
      token: response.body.user.token,
      id: response.body.user.id
    };
    expect(response.status).to.eq(200);
    cy.setCookie('drash_sess', response.body.user.token);
    return cy.wrap(user).as('createdUser');
  });
});

Cypress.Commands.add('publishArticle',
  (authorId, title, description, body) => {
    cy.request({
      method: 'POST',
      url: `/articles`,
      body: {
        article: {
          author_id: authorId,
          title,
          description,
          body,
          tags: ''
        }
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  }
);
