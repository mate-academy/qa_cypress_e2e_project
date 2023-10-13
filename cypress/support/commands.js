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

Cypress.Commands.add('register', (user) => {
  cy.request('POST', '/users', {
    email: user.email,
    password: user.password,
    username: user.username
  });
});

Cypress.Commands.add('login', (user) => {
  cy.request('POST', '/users', {
    email: user.email,
    password: user.password,
    username: user.username
  }).then((response) => {
    window.localStorage.setItem('id', response.body.user.id);
    cy.setCookie('drash_sess', response.body.user.token);
  }).as('user');
});

Cypress.Commands.add('createArticle', (article) => {
  const author_id = window.localStorage.getItem('id');
  cy.request({
    method: 'POST',
    url: '/articles',
    body: {
      article: {
        author_id,
        description: article.description,
        body: article.body,
        tags: article.tag,
        title: article.title
      }
    }
  });
});
