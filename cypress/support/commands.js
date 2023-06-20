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

Cypress.Commands.add('getBySwalTitle', (title) => {
  cy.get('.swal-title').contains(title).should('exist');
});

Cypress.Commands.add('sweetAlertConfirmBtn', (btn) => {
  cy.get('.swal-button--confirm').contains(btn).click();
});

Cypress.Commands.add('getBySwalText', (text) => {
  cy.get('.swal-text').contains(text).should('exist');
});

Cypress.Commands.add('login', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then(response => {
    const user = {
      id: response.body.user.id,
      username: response.body.user.username,
      email: response.body.user.email,
      bio: response.body.user.bio,
      image: response.body.user.image,
      token: response.body.user.token
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('assertUrl', (expectedUrl) => {
  cy.url().should('include', expectedUrl);
});

Cypress.Commands.add('GlobalArticlesEmptyList', (text) => {
  cy.getByDataQa('articles-empty-list-text').contains(text).should('exist');
});

Cypress.Commands.add('createArticle', (title, description, body, tags) => {
  cy.request({
    method: 'POST',
    url: '/users',
    body: {
      username: 'riot',
      email: 'riot@qa.team',
      password: '12345Qwerty!'
    }
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
    const autorId = response.body.user.id;

    cy.request({
      method: 'POST',
      url: '/articles',
      body: {
        article: {
          title,
          description,
          body,
          tags,
          author_id: autorId
        }
      }
    });
  });
});