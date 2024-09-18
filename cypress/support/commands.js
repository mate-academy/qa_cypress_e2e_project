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
  cy.get(`[data-cy="${selector}"]`, { timeout: 5000 });
});

Cypress.Commands.add('register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    }).then((response) => ({
      ...response.body.user,
      password
    }));
  });

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'users/login', {
    user
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('registerAndLoginUser', (email, username, password) => {
  cy.register(email, username, password).then((user) => {
    cy.login(user).then(() => user);
    cy.wrap(user).as('user');
  });
});

Cypress.Commands.add('assertPageUrl', (url) => {
  cy.hash().should('equal', '#' + url);
});

Cypress.Commands.add('createArticle', (article, articlePage) => {
  articlePage.visit();

  articlePage.typeTitle(article.title);
  articlePage.typeDescription(article.description);
  articlePage.typeBody(article.body);
  articlePage.typeTag(article.tag);
  articlePage.clickPublishBtn();

  cy.assertPageUrl(`/articles/${article.title}`);
});
