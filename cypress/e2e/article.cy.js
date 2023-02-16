/// <reference types='cypress' />

describe('Article', () => {
  let user;
  let article;
  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
  });

  it('should be created using New Article form', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/#/editor');

    cy.getByDataCy('title-field')
      .type(article.title);
    cy.getByDataCy('description-field')
      .type(article.description);
    cy.getByDataCy('body-field')
      .type(article.body);  
    cy.getByDataCy('publish-btn')
      .click(); 

    cy.getByDataCy('article-title')
      .should('contain', article.title);
    cy.getByDataCy('article-body')
      .should('contain', article.body);
    cy.getByDataCy('edit-article')
      .should('exist');
    cy.getByDataCy('delete-article')
      .should('exist');
  });
  
  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body)
     .then(response => {
    cy.visit(`/#/articles/${response.body.article.slug}`);

    cy.getByDataCy('edit-article')
      .first()
      .click();
    cy.getByDataCy('title-field')
      .type(`{selectall}{backspace}${'new article'}`);
    cy.getByDataCy('publish-btn')
      .click();
    cy.getByDataCy('article-title')
      .should('contain', 'new article');    
  });
});

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body)
     .then(response => {
      cy.visit(`/#/articles/${response.body.article.slug}`);
    cy.getByDataCy('delete-article')
      .first()
      .click();
    cy.url()
      .should('not.include', '/articles')
    cy.get('.banner')
      .matchImageSnapshot();
     })
  });
});
