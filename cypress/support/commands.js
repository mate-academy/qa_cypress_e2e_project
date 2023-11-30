/* eslint-disable max-len */
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

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'blabla@i.ua', username = 'blablablacar', password = '123Qwerty!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('createArticle', (title = 'example', description = 'exaaaaaaaaample', body = 'bla bla bla example', tag = 'tag') => {
  cy.visit('/#/editor');

  cy.getByDataQa('article-title')
    .type(title);
  cy.getByDataQa('article-description')
    .type(description);
  cy.getByDataQa('article-body')
    .type(body);
  cy.get('.ti-input')
    .type(tag);

  cy.getByDataQa('submit')
    .click();
});

Cypress.Commands.add('login',
  (username = 'blablablacar', email = 'blabla@i.ua', password = '123Qwerty!') => {
    cy.request('POST', '/users', {
      username,
      email,
      password
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: response.body.user.email,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username,
        id: response.body.user.id
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('drash_sess', response.body.user.token);
      return cy.wrap(user).as('createdUser');
    });
  }
);
