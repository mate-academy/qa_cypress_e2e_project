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

// import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

// addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  return cy.get(`[placeholder^="${placeholder}"]`);// Explicitly return the chainable
});

Cypress.Commands.add('register',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    });
  });

Cypress.Commands.add('login', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/api/users/login',
    body: {
      user: {
        email,
        password
      }
    }
  }).then((response) => {
    const user = {
      bio: response.body.user.bio,
      effectiveImage: response.body.user.image,
      email: response.body.user.email,
      image: response.body.user.image,
      token: response.body.user.token,
      username: response.body.user.username
    };
    window.localStorage.setItem('user', JSON.stringify(user));// Correctly set key as a string
    cy.setCookie('auth', response.body.user.token);
  });
});

Cypress.Commands.add('createArticle', (title, description, body) => {
  return cy.getCookie('auth').then((token) => {
    const authToken = token.value;

    return cy.request({
      method: 'POST',
      url: '/api/articles',
      body: {
        article: {
          title,
          description,
          body,
          tagList: []
        }
      },
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
  });
});
