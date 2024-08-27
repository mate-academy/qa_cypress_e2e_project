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

Cypress.Commands.add('register', (userData) => {
  const {
    username,
    email: { validEmail },
    password: { validPassword }
  } = userData;

  cy.request('POST', 'users', {
    email: validEmail,
    username,
    password: validPassword
  }).then((response) => ({
    ...response.body.user,
    validPassword
  }));
});

Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', 'users/login', {
    user: {
      email,
      password
    }
  }).then((response) => {
    const user = {
      id: response.body.user.id,
      username: response.body.user.username,
      email: response.body.user.email,
      bio: response.body.user.bio,
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      token: response.body.user.token
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', user.token);
  });
});

Cypress.Commands.add('authorization', (userData) => {
  const {
    username,
    email: { validEmail },
    password: { validPassword }
  } = userData;

  cy.request('POST', 'users', {
    email: validEmail,
    username,
    password: validPassword
  }).then((response) => {
    const user = {
      id: response.body.user.id,
      username: response.body.user.username,
      email: response.body.user.email,
      bio: response.body.user.bio,
      image: 'https://static.productionready.io/images/smiley-cyrus.jpg',
      token: response.body.user.token
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    cy.setCookie('drash_sess', user.token);

    return cy.wrap(user).as('userInfo');
  });
});

Cypress.Commands.add('createArticle', (articleData, id) => {
  const { title, description, body, tag } = articleData;

  cy.request('POST', 'articles', {
    article: {
      author_id: id,
      title,
      description,
      body,
      tags: tag
    }
  }).then((response) => response.body.article);
});

Cypress.Commands.add('followUser', (username) => {
  cy.request('POST', `profiles/${username}/follow`, {});
});
