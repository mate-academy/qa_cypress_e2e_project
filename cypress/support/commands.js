/* eslint-disable camelcase */
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

Cypress.Commands.add('findByPlaseholder', (placeholder) => {
  cy.get(`[placeholder^="${placeholder}"]`);
});

// // eslint-disable-next-line max-len
// Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
//   cy.request('POST', '/users', {
//     email,
//     username,
//     password
//   });
// });

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
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
    return cy.wrap(user).as('user');
  });
});

Cypress.Commands.add('loginAuth', (email, password) => {
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
    return cy.wrap(user).as('user');
  });
});

Cypress.Commands.add('createArticle', (author_id, title, description, body) => {
  cy.request({
    method: 'POST',
    url: '/articles',
    body: {
      article: {
        author_id,
        title,
        description,
        body,
        tags: ''
      }
    }
  });
});

// Cypress.Commands.add('registerAndlogin', () => {
//   cy.register().then((user) => {
//     cy.loginAuth(user).then(() => user);
//   });
// });
// Cypress.Commands.add('createArticle', (author_id, title, description, body) => {
//   cy.request({
//     method: 'POST',
//     url: '/articles',
//     body: {
//       article: {
//         author_id,
//         title,
//         description,
//         body,
//         tags: ''
//       }
//     }
//   });
// });