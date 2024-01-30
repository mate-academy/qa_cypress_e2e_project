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
  return cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('register',
  (email = 'userOne32@hotmail.com',
    username = 'userOne32',
    password = 'Userpass1') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    })
      .then((response) => {
        cy.setCookie('drash_sess', response.body.user.token);
      });
  });

Cypress.Commands.add('login',
  (email = 'user33@hotmail.com',
    username = 'user32',
    password = 'Userpass1') => {
    cy.request('POST', 'http://localhost:1667/users/login', {
      user: {
        email,
        password
      }
    }).then((response) => {
      cy.setCookie('drash_sess', response.body.user.token);
    });
  });
