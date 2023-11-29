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

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('createArticle', ( title = 'testtitle', description = 'testdescription', body = 'test body', tag = 'test ta') => {
  cy.visit('/#/editor');

  cy.getByDataQa('title').type(title);
  cy.getByDataQa('description').type(description);
  cy.getByDataQa('body').type(body);
  cy.get('.ti-input').type(tag);

  cy.getByDataQa('publish-btn').click();
});

Cypress.Commands.add('login',
  (username = 'riot', email = 'riot@qa.team', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      username,
      email,
      password
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        effectiveImage: "https://static.productionready.io/images/smiley-cyrus.jpg",
        email: response.body.user.email,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username,
        id: response.body.user.id,
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('drash_sess', response.body.user.token);
      return cy.wrap(user).as('createdUser');
    });
  }
)
