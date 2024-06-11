import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

const { faker } = require('@faker-js/faker');

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

Cypress.Commands.add('getByDataCy', (selector) => {
  return cy.get(`[data-qa="${selector}"]`, { timeout: 10000 });
});

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
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

Cypress.Commands.add('login', (
  email = 'riot@qa.team',
  username = 'riot',
  password = '12345Qwert!'
) => {
  cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
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

Cypress.Commands.add('createArticle', (title, description, body, tags) => {
  cy.request('POST', '/users', {
    email: faker.internet.email().toLowerCase(),
    username: faker.random.word(),
    password: '12345Qwert!'
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
    const authorId = response.body.user.id;

    cy.request('POST', '/articles', {
      article: {
        title,
        description,
        body,
        tags,
        author_id: authorId
      }
    });
  });
});
