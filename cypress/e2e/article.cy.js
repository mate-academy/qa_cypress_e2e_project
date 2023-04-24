/// <reference types="cypress" />
/// <reference types="../support" />

describe('Article page', () => {
  let article;

  beforeEach(() => {
    cy.task('db:clear'); 
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });   
  });

  it('should be created using New Article form', () => {
    cy.login();
    cy.visit('/editor');
    cy.getByDataCy('article-field-title')
      .type(article.title);
    cy.getByDataCy('article-field-description')
      .type(article.description);
    cy.getByDataCy('article-field-body').clear()
      .type(article.body);
    cy.getByDataCy('publish-article-button')
      .click();

      cy.contains(article.title)
      .should('be.visible');
      cy.url()
      .should('include', '/articles/' + article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body) 
      .then(response => {
      cy.visit(`/articles/${response.body.article.slug}`)
    })
    cy.getByDataCy('edit-article-button').first()
      .click();
    cy.getByDataCy('article-field-title').clear()
      .type('new');
    cy.getByDataCy('article-field-description').clear()
      .type('newdescription');
    cy.getByDataCy('article-field-body').clear()
      .type('newbody');
    cy.getByDataCy('publish-article-button')
      .click();

    cy.contains('new')
      .should('be.visible');
    cy.contains('newbody')
      .should('be.visible');
  });

  it('should be deleted using Delete button', () => {

    cy.createArticle(article.title, article.description, article.body) 
      .then(response => {
        cy.visit(`/articles/${response.body.article.slug}`)
      })
    cy.getByDataCy('delete-button').first()
      .click();

    cy.get(article.title)
      .should('not.exist')
    cy.url()
      .should('include', '/');
  });
});
