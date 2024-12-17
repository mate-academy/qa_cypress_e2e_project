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

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('registrationAndAuthorization', () => {
  cy.task('generateUser').then(({ username, email, password }) => {
    cy.register(email, username, password);

    cy.request('POST', '/users/login', {
      user: {
        email,
        password
      }
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        email: response.body.user.email,
        id: response.body.user.id,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('drash_sess', response.body.user.token);
    });
  });
});

Cypress.Commands.add('createArticle', () => {
  cy.task('generateArticle').then((data) => {
    const { title, description, body, tag } = data;
    const storedUser = JSON.parse(window.localStorage.getItem('user'));

    cy.request('POST', '/articles', {
      article: {
        author_id: storedUser.id,
        body,
        description,
        tags: tag,
        title
      }
    }).then((response) => {
      cy.visit(`/#/articles/${response.body.article.slug}`);
    });
  });
});
