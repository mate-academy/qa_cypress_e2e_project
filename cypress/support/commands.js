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

// eslint-disable-next-line max-len
Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

// eslint-disable-next-line max-len
Cypress.Commands.add('newArticle', (title = 'none', about = 'none', article = 'none') => {
  articlePage.visit();
  articlePage.typeTitle(title);
  articlePage.typeAbout(about);
  articlePage.typeArticle(article);
  articlePage.publishClick();
});

Cypress.Commands.add('logout', () => {
  cy.visit('/#/settings');
  cy.get('.btn-outline-danger').click();
});
