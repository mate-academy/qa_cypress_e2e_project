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

Cypress.Commands.add('register', (username, email, password) => {
  cy.request('POST', '/users', {
    username,
    email,
    password
  });
});

Cypress.Commands.add('login', (username, email, password) => {
  cy.request('POST', '/users', {
      username: username,
      email: email,
      password: password
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (username, email, password, title, description, body, tag) => {
  cy.request('POST', '/users', {
    username: username,
    email: email,
    password: password
  }).then(response => {

    expect(response.status).to.equal(200);
    expect(response.body.user).to.have.property('token').and.not.to.be.empty;

    cy.setCookie('drash_sess', response.body.user.token);
    const authorId = response.body.user.id

  cy.request('POST', '/articles', {
    article: {
      title: title,
      description: description,
      body: body,
      author_id: authorId,
      tags: tag
    }
  })
  })
});
