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
import articlePageObject from '../support/pages/article.pageObject';

const articlePage = new articlePageObject();

addMatchImageSnapshotCommand();

const faker = require('faker');

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', (email = faker.internet.email(), username = faker.internet.userName(), password = faker.internet.password()) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:1667/#/login');

  cy.getByDataCy('email-sign-in').type(email);
  cy.getByDataCy('password-sign-in').type(password);
  cy.getByDataCy('sign-in-btn').click();
})

Cypress.Commands.add('createArticle', (title, about, body) => {
  articlePage.clickNewArticle();

  articlePage.typeTitle(title);
  articlePage.typeAbout(about);
  articlePage.typeArticle(body);

  articlePage.clickPublishArticle();
})