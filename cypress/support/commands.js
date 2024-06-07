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
import EditPageObject from './pages/edit.pageObject';

addMatchImageSnapshotCommand();

const editPage = new EditPageObject();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

Cypress.Commands.add(
  'register',
  (email = 'riot@qa.team', username = 'Riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
    });
  }
);

Cypress.Commands.add(
  'signIn',
  (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
    cy.request('POST', '/users', {
      email,
      username,
      password
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
  }
);

Cypress.Commands.add('publishArticle', (data) => {
  cy.signIn(data.email, data.username, data.password);
  editPage.visit();
  editPage.typeTitle(data.title);
  editPage.typeAbout(data.about);
  editPage.typeBody(data.body);
  editPage.typeTags(data.title);
  editPage.typeTags(data.about);
  editPage.typeTags(data.tag);
  editPage.clickPublishArticleBtn();
}
);
