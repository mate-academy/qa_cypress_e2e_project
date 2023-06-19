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
import faker from 'faker';
import { generateNewArticle } from './generateNewArticle';
import { generateNewUser } from './generateNewUser';

addMatchImageSnapshotCommand();

Cypress.Commands.add(`findByPlaceholder`, (placeholder) => {
  cy.get(`[placeholder = "${placeholder}"]`);
});

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add(`registerNewUser`, () => {
  const user = generateNewUser();

  cy.request('POST', 'http://localhost:1667/users', user)
      .then(response => ({...response.body.user, ...user}));
});

Cypress.Commands.add(`login`, (user) => {
  cy.request('POST', 'http://localhost:1667/users/login', {
      user: {
          email: user.email,
          password: user.password
      }
  })
      .then(response => {
          cy.setCookie('drash_sess', response.body.user.token )
});
});

Cypress.Commands.add(`createNewArticle`, (user) => {
  const title = faker.lorem.sentence(2).slice(0, -1);
  const description = faker.lorem.sentence(5);
  const body = faker.lorem.sentence().slice(0, -1);
  const tags = faker.lorem.sentence(1).slice(0, -1);

      cy.request('POST', 'http://localhost:1667/articles', {
        article: {
          title,
          description,
          body,
          tags,
          author_id: user.id
        }
      }).its('body.article.slug').should('exist');
});
