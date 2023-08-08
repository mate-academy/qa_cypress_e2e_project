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


import SignUpPageObject from '../support/pages/signUp.pageObject';
const signUpPage = new SignUpPageObject();

import SignInPageObject from './pages/signIn.pageObject';
const signInPage = new SignInPageObject();

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
const faker = require('faker');
const randomNumber = Math.floor(Math.random() * 100000);

addMatchImageSnapshotCommand();

Cypress.Commands.add('getSelector', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('getLink', (link) => {
  cy.get(`[href="#/${link}"]`);
});

Cypress.Commands.add('getPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('getCyData', (value) => {
  cy.get(`[cy-data="${value}"]`);
});

Cypress.Commands.add('register', (username = faker.name.firstName() +  Math.floor(Math.random() * 100000), email = 'test' +  Math.floor(Math.random() * 100000) + '@mail.com', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    username,
    email,
    password
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
    cy.request('POST', '/users/login', {
      action: "check_if_user_is_authenticated",
      token: response.body.user.token
    });
  });
  cy.visit(`/#/@${username}`);
  cy.visit('#/');
});

Cypress.Commands.add('loginManual', (usernamelog, emaillog, passwordlog) => {
  signInPage.visit();
  signInPage.typeEmail(emaillog);
  signInPage.typePassword(passwordlog);
  signInPage.clickSignInBtn();
});


Cypress.Commands.add('registerManual', (username = faker.name.firstName() +  Math.floor(Math.random() * 100000), email = 'test' +  Math.floor(Math.random() * 100000) + '@mail.com', password = '12345Qwert!') => {
  signUpPage.visit();
  signUpPage.typeUsername(username);
  signUpPage.typeEmail(email);
  signUpPage.typePassword(password);
  signUpPage.clickSignUpBtn();
  cy.get('.swal-button').click();
});


Cypress.Commands.add('logOut', () => {
  cy.get('[cy-data="settings-link"]').click({force:true});
  cy.get('[cy-data="Logout button"]').click({force:true});
});



Cypress.Commands.add('createArticle', (title = faker.lorem.word(), description = faker.lorem.words(), body = faker.lorem.words(), tag = faker.lorem.word()) => {

  cy.get('[cy-data="create_article"]').click();
  cy.get('[placeholder="Article Title"]').type(title);
  cy.get('[placeholder="What\'s this article about?"]').type(description);
  cy.get('[placeholder="Write your article (in markdown)"]').type(body);
  cy.get('[placeholder="Enter tags"]').type(tag);
  cy.get('.btn').click();
});
