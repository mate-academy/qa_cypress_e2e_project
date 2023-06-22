/// <reference types="cypress" />
/// <reference types="../support" />

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);

    cy.visit('/#/editor');
    cy.getByDataCy('article-title-field')
      .type(article.title);
    cy.getByDataCy('article-description-field')
      .type(article.description);
    cy.getByDataCy('article-body-field')
      .type(article.body);
    // cy.getByDataCy('article-tags-field')
    //   .type(`${article.tag}{enter}`);
    cy.getByDataCy('publish-article-btn')
      .click();
    
    cy.getByDataCy('article-title')
      .should('contain', article.title);
    cy.getByDataCy('article-body')
      .should('contain', article.body);
    cy.getByDataCy('edit-btn')
      .should('exist');
    cy.getByDataCy('delete-btn')
      .should('exist');
  });

  it('should be edited using Edit button', () => {
    const newTitle = 'New Title!'
    cy.createArticle(article.title, article.description, article.body, article.tag)
      .then(response => {
        cy.visit(`/#/articles/${response.body.article.slug}`);
        cy.getByDataCy('edit-btn')
          .eq(1)
          .click();
      });
    
    cy.getByDataCy('article-title-field')
      .type(`{selectall}${newTitle}`);
    cy.getByDataCy('publish-article-btn')
      .click();
    
    cy.getByDataCy('article-title')
      .should('contain', newTitle);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body, article.tag)
      .then(response => {
        cy.visit(`/#/articles/${response.body.article.slug}`);
        cy.getByDataCy('delete-btn')
          .eq(1)
          .click();
        cy.url()
          .should('not.include', response.body.article.slug);
      });
  });
});
