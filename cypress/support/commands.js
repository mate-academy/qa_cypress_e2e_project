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

const faker = require('faker');

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});


Cypress.Commands.add('register', (email = 'riot@qa.team',
  username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('login', (email = 'riot@qa.team',
  password = '12345Qwert!') => {
  cy.request('POST', '/users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      // eslint-disable-next-line max-len
      effectiveImage: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', response.body.user.token);
  });
});


Cypress.Commands.add('createdArticle', (article) => {
  cy.visit('/#/editor');
  cy.getByDataCy('article_title')
    .type(article.title);
  cy.getByDataCy('article_description')
    .type(article.description);
  cy.getByDataCy('article_body')
    .type(article.body);
  cy.getByDataCy('article_tags')
    .eq(0)
    .type(article.tag);
  cy.getByDataCy('article_publishBtn')
    .click();
  cy.getByDataCy('article_title')
    .should('contain', article.title);
}); 
 