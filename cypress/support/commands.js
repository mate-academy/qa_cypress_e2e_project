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
import ArticlePageObject from "../support/pages/article.pageObject";
const ArticlePage = new ArticlePageObject();

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataQa', (selector) => {
  cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});

 Cypress.Commands.add('createNewArticle', (title, description, body) => {
  ArticlePage.visit();
  ArticlePage.typeTitle(title);
  ArticlePage.typeDescription(description);
  ArticlePage.typeBody(body);
  ArticlePage.clickPublishBtn();
  });

Cypress.Commands.add('login', 
(email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users/login', {
      user: {
        email,
        username,
        password
      }
    }).then((response) => {
      const user = {
        bio: response.body.user.bio,
        effectiveImage:
        'https://static.productionready.io/images/smiley-cyrus.jpg',
        email: response.body.user.email,
        image: response.body.user.image,
        token: response.body.user.token,
        username: response.body.user.username
      };
      window.localStorage.setItem('user', JSON.stringify(user));
      cy.setCookie('drash_sess', response.body.user.token);
    });
  });
