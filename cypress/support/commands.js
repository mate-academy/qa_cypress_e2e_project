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
  return cy.get(`[data-cy="${selector}"]`, { timeout: 10000 });
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('signIn', (email, password) => {
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

    window.localStorage
      .setItem('user', JSON.stringify(user));

    cy.setCookie('drash_sess', response.body.user.token);
  });
});
Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.visit('/#/editor');
  cy.getByDataCy('article-title-field').type(title);
  cy.getByDataCy('article-description-field').type(description);
  cy.getByDataCy('article-body-field').type(body);
  cy.getByDataCy('article-publish-btn').click();
});

// eslint-disable-next-line max-len
Cypress.Commands.add('updateArticle', (title = 'Test', description = 'description', body = 'body') => {
  cy.getByDataCy('article-title-field').type(`{selectAll}${title}`);
  cy.getByDataCy('article-description-field').type(`{selectAll}${description}`);
  cy.getByDataCy('article-body-field').type(`{selectAll}${body}`);
  cy.getByDataCy('article-publish-btn').click();
});
