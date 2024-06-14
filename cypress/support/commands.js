/// <reference types="cypress" />
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
import SignUpPageObject from './pages/signup.pageObject';
import ArticlePage from './pages/article.pageObjects';

const signUpPage = new SignUpPageObject();
const articlePage = new ArticlePage();

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

Cypress.Commands.add('createArticle', (title = 'mart', description = 'riot', body = 'AWDWDawdadawd') => {
  cy.request('POST', '/articles', {
      article: {
          title,
          description,
          body,
      }
  });
});

Cypress.Commands.add('createArticleAsUser', (title = 'mart', description = 'riot', body = 'AWDWDawdadawd') => {
  articlePage.visit();

    articlePage.typeTitle(title);
    articlePage.typeDescription(description);
    articlePage.typeBody(body);
    articlePage.clickArticleBtn();
});

Cypress.Commands.add('loginAsUser', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  signUpPage.visit();

  signUpPage.typeUsername(username);
  signUpPage.typeEmail(email);
  signUpPage.typePassword(password);
  signUpPage.clickSignUpBtn();
  signUpPage.clickOk();
});

Cypress.Commands.add('login', (email = 'riot@qa.team',
  username = 'riot', password = '12345Qwert!') => {
   cy.request('POST', '/users', {
       username:
       email,
       password
   }).then(response => {
     const user = {
       username: response.body.user.username,
       email: response.body.user.email,
       image: response.body.user.image,
       token: response.body.user.token,
       bio: response.body.user.bio,
     };
     window.localStorage.setItem('user', JSON.stringify(user));
     cy.setCookie('auth', response.body.user.token);
   });
 });
