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
import SignInPageObject from '../support/pages/signIn.pageObject';
import articlePageObject from '../support/pages/article.pageObject';


const articlePage = new articlePageObject();
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

Cypress.Commands.add('newArticle', (title, description, body) => {
  cy.request('POST', '/article', {
    title,
    description,
    body
  });
});

Cypress.Commands.add('logIn', (email = 'riot@qa.team', password = '12345Qwert!') => {
  signInPage.typeEmail(email);
  signInPage.typePassword(password);
  signInPage.clickSignInBtn();
  });

Cypress.Commands.add('createArticle', (title, description, body) => {
  articlePage.createArticleBtn();
  articlePage.articleTitle(title);
  articlePage.articleDescription(description);
  articlePage.articleBody(body);
  articlePage.clickPublichBtn();
  });

  
