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

Cypress.Commands.add('register', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
    userId = response.body.user.id;
  });
});

Cypress.Commands.add('login',
  (email, username, password) => {
    cy.request('POST', '/users/login', {
      email,
      username,
      password
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        // eslint-disable-next-line max-len
        effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: response.body.user.email,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username,
        id: response.body.user.id
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('drash_sess', response.body.user.token);
    });
  });

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
      }
    }
  }).then((response) => {
    return response.body.article.slug;
  });
});
