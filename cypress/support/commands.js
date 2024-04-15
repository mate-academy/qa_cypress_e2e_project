/// <reference types='cypress' />

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

const faker = require('faker');
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

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.request('POST', '/users', {
    email: faker.internet.email(),
    username: faker.name.firstName(),
    password: 'Qwer12345!'
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
    const authorId = response.body.user.id;

    cy.request('POST', '/articles', {
      article: {
        title,
        description,
        body,
        author_id: authorId
      }
    });
  });
});
