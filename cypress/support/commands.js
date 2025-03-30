import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand();

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('getByDataCy', (selector) => {
  cy.get(`[data-cy="${selector}"]`);
});

// Cypress.Commands.add('createArticle', (title, description, body, tag) => {
//   cy.findByPlaceholder('Article Title').type(title);
//   cy.findByPlaceholder('What\'s this article about?').type(description);
//   cy.findByPlaceholder('Write your article (in markdown)').type(body);
//   cy.findByPlaceholder('Enter tags').type(tag);
//   cy.contains(`button`, `Publish Article`).click();
// });

Cypress.Commands.add('registerAndLogin', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  }).then((response) => {
    cy.setCookie('drash_sess', response.body.user.token);
  });
});

Cypress.Commands.add('registerOnly', (email, username, password) => {
  cy.request('POST', '/users', {
    email,
    username,
    password
  });
});
