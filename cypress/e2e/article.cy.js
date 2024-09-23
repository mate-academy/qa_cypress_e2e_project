/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.register();
    cy.visit('#/login');
    cy.get('input[placeholder="Email"]').type('riot@qa.team');
    cy.get('input[placeholder="Password"]').type('12345Qwert!');
    cy.get('[data-cy="sign-in-btn"]').click();
    cy.url().should('include', '/');
    cy.get('[data-testid="new-article-nav"]').click();
  });

  it('should create a new article', () => {
    cy.task('generateArticle').then((article) => {
      cy.get('input[placeholder="Article Title"]').type(article.title);
      cy.get(':nth-child(2) > .form-control').type(article.description);
      cy.get(':nth-child(3) > .form-control').type(article.body);
      cy.get('.vue-tags-input').type(article.tag);
      cy.get('.btn').click();
      cy.url().should('include', '#/articles/');
      cy.contains(article.title).should('exist');
    });
  });

  it('should be edited using Edit button', () => {
    cy.task('generateArticle').then((article) => {
      cy.get('input[placeholder="Article Title"]').type(article.title);
      cy.get(':nth-child(2) > .form-control').type(article.description);
      cy.get(':nth-child(3) > .form-control').type(article.body);
      cy.get('.vue-tags-input').type(article.tag);
      cy.get('.btn').click();
      cy.url().should('include', '#/articles/');
      cy.contains(article.title).should('exist');
    });
    cy.url().should('include', '#/articles/');
    cy.get('.article-actions > [data-testid="article-meta"] > [data-testid="author-actions"] > [data-testid="edit-article-btn"]').click();
    cy.get('input[placeholder="Article Title"]').type('Edited Article Title');

    cy.get('.btn').click();

    cy.contains('Edited Article Title').should('exist');
  });

  it('should be deleted using Delete button', () => {
    cy.task('generateArticle').then((article) => {
      cy.get('input[placeholder="Article Title"]').type(article.title);
      cy.get(':nth-child(2) > .form-control').type(article.description);
      cy.get(':nth-child(3) > .form-control').type(article.body);
      cy.get('.vue-tags-input').type(article.tag);
      cy.get('.btn').click();
      cy.url().should('include', '#/articles/');
      cy.contains(article.title).should('exist');
    });
    cy.url().should('include', '#/articles/');
    cy.contains('Delete Article').should('exist');
    cy.contains('Delete Article').click();
    cy.contains('Delete Article').should('not.exist');
  });
});
