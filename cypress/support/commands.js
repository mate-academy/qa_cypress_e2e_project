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

const faker = require("faker");

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', () => {

  let username = faker.lorem.word();
  let email = username+'@mail.com';
  let password = '12345Qwert!';

  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
});
});
Cypress.Commands.add('createArticle', (title, description, body) => {
  
  let username = faker.lorem.word();
  let email = username+'@mail.com';
  let password = '12345Qwert!';
  let author_id;

  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token)
    author_id = response.body.user.id;
  }).then(() => {
    cy.request('POST', '/articles', { 
      article: {
        title,
        description,
        body,
        tags: faker.lorem.word({length: 3}),
        author_id
      }
  });
});
});
Cypress.Commands.add('registerNew', (username, email, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
});
});
Cypress.Commands.add('createNewArticle', (title, description, body) => {
  
  let username = faker.lorem.word();
  let email = username+'@mail.com';
  let password = '12345Qwert!';
  let author_id;

  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then(response => {
    author_id = response.body.user.id;
  }).then(() => {
    cy.request('POST', '/articles', { 
      article: {
        title,
        description,
        body,
        tags: faker.lorem.word({length: 3}),
        author_id
      }
  });
});
});
