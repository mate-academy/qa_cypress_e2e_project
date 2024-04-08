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

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register', (username = 'riot', email = 'riot@qa.team', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (username, email, password) => {
  return cy.request('POST', 'http://localhost:1667/users', {
    email,
    username,
    password
  }).then((response) => {
    const user = {
      id: response.body.user.id,
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
    Cypress.env('userId', user.id);
  });
});

Cypress.Commands.add('createArticle', (title, description, body, tags) => {
  cy.getByDataCy('title-field').type(title);
  cy.getByDataCy('description-field').type(description);
  cy.getByDataCy('body-field').type(body);
  cy.getByDataCy('tags-field').first().type(`${tags}{enter}`);
  cy.getByDataCy('submit-button').click();
});
