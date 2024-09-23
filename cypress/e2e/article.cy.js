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

  it.only('should create a new article', () => {
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

  // it('should be edited using Edit button', () => {

  // });

  // it('should be deleted using Delete button', () => {

  // });
});
