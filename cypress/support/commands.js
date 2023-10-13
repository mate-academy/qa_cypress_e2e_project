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
import SignInPageObject from './pages/signIn.pageObject';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.overwrite('visit', (originalFn, url, Option) => {
  originalFn('/#' + url);
});

Cypress.Commands.add('register', (username, email, password) => {
  cy.request('POST', '/users', {
    username,
    email,
    password
  });
});

Cypress.Commands.add('loginSignInPage', (email, password) => {
  const signInPage = new SignInPageObject();

  signInPage.visit();
  signInPage.typeEmail(email);
  signInPage.typePassword(password);
  signInPage.clickSignInBtn();
});

Cypress.Commands.add('login', (username, email, password) => {
  cy.request('POST', '/users', {
    username,
    email,
    password
  }).then((response) => {
    const user = {
      id: response.body.user.id,
      username: response.body.user.username,
      email: response.body.user.email,
      bio: response.body.user.bio,
      image: response.body.user.image,
      token: response.body.user.token
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('getRegisterUser', () => {
  const registerUser = JSON.parse(window.localStorage.getItem('user'));
  return registerUser;
});

Cypress.Commands.add('createArticle', (id, body, description, tag, title) => {
  cy.request('POST', 'articles', {
    article: {
      author_id: id,
      body,
      description,
      tags: tag,
      title
    }
  });
});
