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
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
      email,
      username,
      password
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (title, description, body, tags) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:1667/users',
    body: {
      username: 'riot',
      email: 'riot@qa.team',
      password: '12345Qwert!'
    }
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
    const authorId = response.body.user.id;
    const authToken = response.body.user.token;

    cy.request({
      method: 'POST',
      url: 'http://localhost:1667/articles',
      headers: {
        Cookie: `drash_sess=${authToken}`
      },
      body: {
        article: {
          title,
          description,
          body,
          tags: `${tags}{enter}`,
          author_id: authorId
        }
      }
    })
  });
});

