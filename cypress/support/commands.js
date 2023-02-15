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

import { faker } from '@faker-js/faker';
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', (username, email, password) => {
  cy.request({
    method: 'POST',
    url: '/users',
    body: {
      email,
      username,
      password
    }
  });
});

Cypress.Commands.add('login', (username, email, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token)
  })
});

Cypress.Commands.add('article', (title, description, body) => {
  cy.request('POST', '/users', {
    email: faker.internet.email(),
    username: faker.random.word(),
    password: 'Test123!'
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);

    cy.request({method: 'POST',
      url: '/articles',
      body: {
        article: {
          title,
          description,
          body,
          tags: faker.lorem.word(),
          author_id: response.body.user.id
        }
      }
    })
  })
});
