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

import { generateData } from './generateData';
import { generateNewArticle } from './generateNewArticle';

Cypress.Commands.add('getByDataQa', (selector) => {
   cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', () => {
   const user = generateData();
   cy.request('POST', '/users', user)
      .then(response => ({ ...response.body.user, ...user }));
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
   cy.get(`[placeholder="${placeholder}"]`)
})



Cypress.Commands.add('login', () => {
   cy.task('generateUser').then(generateUser => {
      cy.wrap(generateUser).as('user')
      cy.request('POST', '/users', {
         username: generateUser.username,
         email: generateUser.email,
         password: generateUser.password
      })
         .then(response => {
            cy.setCookie('drash_sess', response.body.user.token)
         });
   });
});

let articleSlug;

Cypress.Commands.add('createArticle', () => {
   const user = generateData();
   const article = generateNewArticle();

   cy.request('POST', '/users', user).then(response => {
      cy.setCookie('drash_sess', response.body.user.token);
      const author_id = response.body.user.id;

      return cy.request('POST', '/articles', {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
          author_id: author_id
        }
      });
    })
});
