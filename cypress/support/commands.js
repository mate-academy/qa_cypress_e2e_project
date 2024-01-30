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

/// <reference types="cypress" />

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa^="${selector}"]`);
});

// eslint-disable-next-line max-len
Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

// eslint-disable-next-line max-len
Cypress.Commands.add('login',
  // eslint-disable-next-line max-len
  (email, password) => {
    cy.request('POST', '/users/login', {
      user: {
        email,
        password
      }
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: response.body.user.email,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username,
        id: response.body.user.id
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('drash_sess', response.body.user.token);
    });
  });
