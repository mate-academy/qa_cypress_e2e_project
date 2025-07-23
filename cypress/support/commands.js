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

Cypress.Commands.add(
  'register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    });
  }
);

Cypress.Commands.add(
  'login',
  (email = 'riot@qa.team', password = '12345Qwert!') => {
    return cy.request('POST', '/users/login', {
      user: { email, password }
    });
  }
);

Cypress.Commands.add('registerAndLogin', () => {
  return cy.task('generateUser').then(({ email, username, password }) => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    }).then(({ body: { user } }) => {
      window.localStorage.setItem('user', JSON.stringify(user));

      cy.setCookie('auth', user.token);
      cy.setCookie('drash_sess', user.token);

      return cy.wrap({ ...user, password });
    });
  });
});

Cypress.Commands.add('createArticle', (authorId) => {
  return cy.task('generateArticle').then(({ title, description, body }) => {
    return cy
      .request({
        method: 'POST',
        url: '/articles',
        body: {
          article: {
            author_id: authorId,
            title,
            description,
            body,
            tags: ''
          }
        }
      })
      .then((response) => response.body.article);
  });
});
