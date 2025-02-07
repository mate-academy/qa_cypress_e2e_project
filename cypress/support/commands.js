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
import ArticlePageObject from '../support/pages/article.pageObject';

const articlePage = new ArticlePageObject();

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

Cypress.Commands.add('registerAndLogin', (email, username, password) => {
  cy.register(email, username, password).then(() => {
    cy.request('POST', '/users/login', {
      user: {
        email,
        password,
      },
    }).then((response) => {
      cy.setCookie('drash_sess', response.body.user.token);
    });
  });
});

Cypress.Commands.add('createArticle', (title, description, body, tag) => {
  articlePage.visit();
  cy.getByDataCy('article-title-field').type(title);
  articlePage.typeDescription(description);
  articlePage.typeBodyArticle(body);
  articlePage.typeTag(tag);
  articlePage.clickPublishBtn();
});
