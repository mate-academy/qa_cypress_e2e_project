/* eslint-disable max-len */
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
import SignUpPageObject from './pages/signUp.pageObject';
import HomePageObject from './pages/home.pageObject';

const articlePage = new ArticlePageObject();
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('loginAsUser', (email, username, password) => {
  signUpPage.visit();

  signUpPage.typeUsername(username);
  signUpPage.typeEmail(email);
  signUpPage.typePassword(password);
  signUpPage.clickSignUpBtn();

  homePage.clickOk();
});

Cypress.Commands.add('createArticleAsUser', (title = 'mart', description = 'riot', body = 'AWDWDawdadawd') => {
  articlePage.visit();

  articlePage.typeArticleTitle(title);
  articlePage.typeArticleDescription(description);
  articlePage.typeArticleBody(body);
  articlePage.clickPublishArticleBtn();
});
