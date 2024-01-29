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
    cy.getByDataCy('ArticleTitle').type(article.title);
    cy.getByDataCy('ArticleDescr').type(article.description);
    cy.getByDataCy('ArticleBody').type(article.body);
    cy.getByDataCy('ArticleTag').eq(0).type(article.tag);
    cy.getByDataCy('ArticleSubmit').click();
    cy.getByDataCy('articleTitle').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    });
    cy.getByDataCy('EditArticleButton').eq(0).click();
    cy.getByDataCy('ArticleTitle').type(faker.lorem.word());
    cy.getByDataCy('ArticleSubmit').click();
    cy.getByDataCy('articleTitle').should('contain', article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
      cy.intercept('DELETE', '**/articles/*').as('deleteArticle');
      cy.getByDataCy('DeleteArticleButton').eq(0).click();
      cy.wait('@deleteArticle').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });
    });
  });
});
