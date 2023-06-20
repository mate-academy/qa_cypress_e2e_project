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
  cy.request('POST', 'users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email = 'riot@qa.team', password = '12345Qwert!') => {
  cy.request('POST', 'users/login', {
    user: {
      email,
      password
    }
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

Cypress.Commands.add('getUser', () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  return user;
});

Cypress.Commands.add('createArticle', (id, articleBody, articleDescription, articleTags, articleTitle) => {
  cy.request('POST', 'articles', {
    article: {
      author_id: id,
      body: articleBody,
      description: articleDescription,
      tags: articleTags,
      title: articleTitle
    }
  });
});
