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

let userId;

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
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
  }).then((response) => {
    userId = response.body.user.id
    cy.setCookie('drash_sess', response.body.user.token)
  ;})
;})

// Cypress.Commands.add('publishArticle', () => {
//   cy.request('POST', '/articles', {
//     author_id,
//     body,
//     description,
//     tags,
//     title
//   }).then((response) => {
//     cy.setCookie('drash_sess', response.body.user.token)
//   ;})
// ;})

// Cypress.Commands.add('createArticle', (title, description, body, tags, author_id) => {
//   return cy.request({
//     method: 'POST',
//     url: '/articles',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: {
//       article: {
//         title,
//         description,
//         body,
//         tags,
//         author_id
//       },
//     }
//   }).then((response) => {
//     const slug = response.body.article.slug;
//     return response.body.article.slug;
//   });
// });

Cypress.Commands.add('createArticle', (article) => {
  return cy.request({
    method: 'POST',
    url: '/articles',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      article: {
        title: article.title,
        description: article.description,
        body: article.body,
        tags: article.tags,
        author_id: userId
      },
    }
  }).then((response) => {
    const slug = response.body.article.slug;
    return response.body.article.slug;
  });
});

