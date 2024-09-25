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

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

// Cypress.Commands.add('getByDataCy', (selector) => {
//   cy.get(`[data-cy="${selector}"]`);
// });

// eslint-disable-next-line max-len
Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

Cypress.Commands.add('login', (email, username, password) => {
  cy.request('POST', 'http://localhost:1667/users', {
    // eslint-disable-next-line object-shorthand
    email: email,
    // eslint-disable-next-line object-shorthand
    username: username,
    // eslint-disable-next-line object-shorthand
    password: password
    // eslint-disable-next-line arrow-parens
  }).then(response => {
    cy.setCookie('drash_sess', response.body.user.token);
    const authorId = response.body.user.id;
    window.localStorage.setItem('authorId', authorId);
  });
});

// let Slug;

// Cypress.Commands.add('setArticleSlug', (slug) => {
//   Slug = slug;
// });

// Cypress.Commands.add('getArticleSlug', () => {
//   return Slug;
// });

Cypress.Commands.add('createArticle', (title, description, body) => {
  cy.getCookie('drash_sess').then((token) => {
    const authToken = token.value;
    const author = window.localStorage.getItem('authorId');

    cy.request('POST', 'http://localhost:1667/articles', {
      article: {
        title,
        description,
        body,
        tags: '',
        author_id: author
      },
      headers: {
        Authorization: `Token ${authToken}`
      }
    });
  }).then((response) => {
    const articleSlug = response.body.article.slug;
    window.localStorage.setItem('slug', articleSlug);
  });
});
