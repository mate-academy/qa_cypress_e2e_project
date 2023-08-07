import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

// eslint-disable-next-line max-len
Cypress.Commands.add('register', (email = 'riot@qa.team', username = 'riot', password = '12345Qwert!') => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('createArticle', (article) => {
  cy.visit('/#/editor');
  cy.findByPlaceholder('Article Title').type(article.title);
  cy.findByPlaceholder('What\'s this article about?').type(article.description);
  cy.findByPlaceholder('Write your article (in markdown)').type(article.body);
  cy.findByPlaceholder('Enter tags').type(article.tag);
  cy.contains('.btn', 'Publish Article').click();
});
