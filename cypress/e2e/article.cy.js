/* eslint-disable cypress/unsafe-to-chain-command */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((u) => {
      user = u;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    cy.login(user.email, user.password);
  });

  it('should be created using New Article form', () => {
    cy.createArticle();
    cy.contains('h1', Cypress.env('articleTitle')).should('be.visible');
  });

  it('should be edited using Edit button', () => {
    cy.createArticle();
    cy.contains('[data-qa="edit-article-btn"]').click();
    cy.get('[data-qa="title-input"]').clear().type('Updated Title');
    cy.contains('[data-qa="publish-article-btn"]').click();
    cy.contains('h1', 'Updated Title').should('be.visible');
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle();
    cy.contains('[data-qa="delete-article-btn"]').click();
    cy.url().should('eq', 'http://localhost:3000/#/');
  });
});
