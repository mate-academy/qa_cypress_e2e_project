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

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('createdArticle', (article) => {
  cy.visit('/#/editor');
  cy.getByDataCy('article-title')
    .type(article.title);
  cy.getByDataCy('article-about')
    .type(article.description);
  cy.getByDataCy('article-write')
    .type(article.body);
  cy.getByDataCy('enter-tags')
    .eq(0)
    .type(article.tag);
  cy.getByDataCy('publish-article')
    .click();
});
Cypress.Commands.add('login', (email = 'riot@qa.team',
  password = '12345Qwert!') => {
  cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
  })

