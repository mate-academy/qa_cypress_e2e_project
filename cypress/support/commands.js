/* eslint-disable max-len */
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

Cypress.Commands.add('registerAndLogin', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((registerResponse) => {
    expect(registerResponse.status).to.equal(200);
    const token = registerResponse.body.user.token;
    const userId = registerResponse.body.user.id;
    cy.request('POST', '/users/login', {
      user: {
        email,
        password
      }
    }).then((loginResponse) => {
      expect(loginResponse.status).to.equal(200);

      cy.setCookie('drash_sess', token);
      return cy.wrap(userId);
    });
  });
});

Cypress.Commands.add('getByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', 'users/login', {
    user: {
      email,
      password
    }
  }).then((resp) => {
    const token = resp.body.user.token;
    expect(resp.status).to.equal(200);
    cy.setCookie('drash_sess', token);
  });
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('createArticle', (article, user) => {
  cy.request({
    method: 'POST',
    url: 'articles',
    body: {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tags: article.tags,
        author_id: user.id
      }
    }
  }).then((resp) => {
    const slug = resp.body.article.slug;
    return cy.wrap(slug);
  });
});
