/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require('faker');
describe('Article', () => {
  let user;
  let article;

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
    cy.getByDataCy('ArtTitle').type(article.title);
    cy.getByDataCy('ArtDescr').type(article.description);
    cy.getByDataCy('ArtBody').type(article.body);
    cy.getByDataCy('ArtTag').eq(0).type(article.tag);
    cy.getByDataCy('ArtSubmit').click();
    cy.getByDataCy('articleTitle').should('contain', article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
    });
    cy.getByDataCy('EditArticleBTN').eq(0).click();
    cy.getByDataCy('ArtTitle').type(faker.lorem.word());
    cy.getByDataCy('ArtSubmit').click();
    cy.getByDataCy('articleTitle').should('contain', article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article).then((slug) => {
      cy.visit(`/#/articles/${slug}`);
      cy.intercept('DELETE', '**/articles/*').as('deleteArticle');
      cy.getByDataCy('DeleteArticleBTN').eq(0).click();
      cy.wait('@deleteArticle').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
      });
    });
  });
});
