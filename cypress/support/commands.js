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
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[placeholder="${selector}"]`);
});

Cypress.Commands.add('register', (
  email = 'riot@qa.team',
  username = 'riot',
  password = '12345Qwert!'
) => {
  return cy.request('POST', 'https://conduit.mate.academy/api/users', {
    user: {
      email,
      password,
      username
    }
  }).then((response) => ({
    ...response.body.user,
    password
  }));
});

Cypress.Commands.add('login', (user) => {
  cy.request('POST', 'https://conduit.mate.academy/api/users/login', {
    user
  }).then((response) => {
    expect(response.status).to.eq(200);
    const user = {
      username: response.body.user.username,
      email: response.body.user.email,
      token: response.body.user.token,
      bio: response.body.user.bio,
      image: response.body.user.image,
      effectiveImage:
        'https://www.onthisday.com/images/people/homer-simpson.jpg?w=360'
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('auth', response.body.user.token);
  });
});

Cypress.Commands.add('registerAndLoginUser', () => {
  cy.registerNewUser().then((user) => {
    cy.login(user).then(() => user);
  });
});
