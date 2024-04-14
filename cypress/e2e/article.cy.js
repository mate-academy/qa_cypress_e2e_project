/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');

let user;
let article;


describe('Article', () => {
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  

  it('should be created using New Article form', () => {
    cy.visit('/#/editor');
    
    cy.getByDataQa('ArticleTitle', { timeout: 10000 }).type(article.title);
    cy.getByDataQa('ArticleDescr').type(article.description);
    cy.getByDataQa('ArticleBody').type(article.body);
    cy.getByDataQa('ArticleTag').eq(0).type(article.tag);
    cy.getByDataQa('ArticleSubmit').click();
    cy.getByDataQa('articleTitle').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    });
    cy.getByDataQa('EditArticleButton').eq(0).click();
    cy.getByDataQa('ArticleTitle').type(faker.lorem.word());
    cy.getByDataQa('ArticleSubmit').click();
    cy.getByDataQa('articleTitle').should('contain', article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
      cy.intercept('DELETE', '**/articles/*').as('deleteArticle');
      cy.getByDataQa('DeleteArticleButton').eq(0).click();
      cy.wait('@deleteArticle').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });
    });
  });
});