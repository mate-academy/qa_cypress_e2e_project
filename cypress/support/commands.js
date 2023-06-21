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
import faker from 'faker';

import { generateNewUser } from './generateNewUser';
import { generateNewArticle } from './generateNewArticle';

addMatchImageSnapshotCommand();

Cypress.Commands.add(`findByPlaceholder`, (placeholder) => {
  cy.get(`[placeholder = "${placeholder}"]`);
});

Cypress.Commands.add(`registerNewUser`, () => {
  const user = generateNewUser();

  cy.request('POST', 'http://localhost:1667/users', user)
    .then(response => ({...response.body.user, ...user}));
});

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', () => {
  const user = generateNewUser();
  cy.request('POST', '/users', user)
    .then(response => ({ ...response.body.user, ...user }));
});

Cypress.Commands.add('login', () => {
  cy.task('generateUser').then(generateUser => {
    cy.wrap(generateUser).as('user')

    cy.request('POST', 'http://localhost:1667/users', {
        username: generateUser.username,
        email: generateUser.email,
        password: generateUser.password,
    })

    .then(response => {
      cy.setCookie('drash_sess', response.body.user.token)
    });
  })
});

Cypress.Commands.add('createArticle', () => {
  const user = generateNewUser();
  const article = generateNewArticle();

  cy.request('POST', '/users', user).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
    const author_id = response.body.user.id;

    return cy.request('POST', '/articles', {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
        author_id: author_id
      }
    });
  })
});
