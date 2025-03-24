/// <reference types='cypress' />
/// <reference types='../support' />
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

describe('Article', () => {
  const homePage = new HomePageObject();
  const articlePage = new ArticlePageObject();
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
  });

  beforeEach(() => {
    homePage.visit();
    cy.login(user.email, user.username, user.password);
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.typeTitle(article.title);
    articlePage.typeDescription(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishArticleBtn();
    articlePage.titleField.should('contain', article.title);
    articlePage.bodyField.should('contain', article.body);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        articlePage.visit(`#/articles/${response.body.article.slug}`);
        articlePage.editArticleBtn.first().click();
        articlePage.typeTitle(article.title);
        articlePage.typeDescription(article.description);
        articlePage.typeBody(article.body);
        articlePage.clickPublishArticleBtn();
        articlePage.titleField.should('contain', article.title);
        articlePage.bodyField.should('contain', article.body);
      });
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const url = `#/articles/${response.body.article.slug}`;
        articlePage.visit(url);
        articlePage.deleteArticleBtn.first().click();
        cy.url().should('not.include', url);
      });
  });
});
