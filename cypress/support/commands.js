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

const { faker } = require('@faker-js/faker');
const randomEmail = faker.internet.email();
const randomUsername = faker.internet.userName();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (
    email = randomEmail,
    username = randomUsername,
    password = '12345Qwert!'
  ) => {
    cy.request('POST', '/users', {
      email,
      username,
      password,
    }).then((response) => {
      cy.setCookie('drash_sess', response.body.user.token);
      cy.setCookie('userId', response.body.user.id.toString());
      cy.setCookie('username', response.body.user.username);
      cy.setCookie('email', response.body.user.email);
    });
  }
);

Cypress.Commands.add('generateArticleData', () => {
  const title = faker.string.alpha(5);
  const about = faker.string.alpha(10);
  const body = faker.string.alpha(15);
  const tag = faker.string.alpha(3);

  return {
    title,
    about,
    body,
    tag,
  };
});

Cypress.Commands.add('createArticle', (count = 1, userId) => {
  for (let i = 1; i <= count; i++) {
    cy.generateArticleData().then((article) => {
      cy.request('POST', '/articles', {
        article: {
          title: article.title,
          description: article.about,
          body: article.body,
          tags: [],
          author_id: userId,
        },
      });
    });
  }
});

Cypress.Commands.add('replaceString', (string, character) => {
  const newString = string.replace(character, '');

  return newString;
});
