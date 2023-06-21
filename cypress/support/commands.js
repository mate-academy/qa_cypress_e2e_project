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

addMatchImageSnapshotCommand();
const faker = require('faker');

Cypress.Commands.add('getByDataQA', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = 'Qwert123!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', '/users/login', {
    email,
    password
  }).then(response => {
    const user = {
      id: response.body.user.id,
      username: response.body.user.username,
      email: response.body.user.email,
      bio: response.body.user.bio,
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      token: response.body.user.token
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (title, description, body, tags) => {
  cy.request({
    url: '/users',
    method: 'POST',
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.random.word()
    }
  }).then(response => {
    cy.setCookies('drash_sess', response.body.user.token);
    cy.request({
      url: '/articles',
      method: 'POST',
      body: {
        article: {
          title,
          description,
          body,
          tags,
          author_id: response.body.user.id
        }
      }
    });
  });
});
