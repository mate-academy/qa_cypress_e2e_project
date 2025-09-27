/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import NewArticlePageObject from '../support/pages/newArticle.pageObject';

const newArticlePage = new NewArticlePageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let user;
  let article;
  let newArticleData;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      newArticleData = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.login(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

    newArticlePage.visit();
  });

  it('should be created using New Article form', () => {
    newArticlePage.typeData(
      article.title,
      article.description,
      article.body,
      article.tag
    );

    newArticlePage.clickPublishArticleBtn();

    cy.url().should('include', article.title);

    articlePage.isCorrectTitle(article.title);
  });

  it('should be edited using Edit button in banner part', () => {
    newArticlePage.typeData(
      article.title,
      article.description,
      article.body,
      article.tag
    );

    newArticlePage.clickPublishArticleBtn();

    cy.url().should('include', article.title);

    cy.get('.banner').within(() => {
      articlePage.editArticle();
    });

    newArticlePage.editData(
      newArticleData.title,
      newArticleData.description,
      newArticleData.body,
      newArticleData.tag
    );

    newArticlePage.clickPublishArticleBtn();

    articlePage.isCorrectTitle(newArticleData.title);
  });

  it('should be edited using Edit button in page part', () => {
    newArticlePage.typeData(
      article.title,
      article.description,
      article.body,
      article.tag
    );

    newArticlePage.clickPublishArticleBtn();

    cy.url().should('include', article.title);

    cy.get('.page').within(() => {
      articlePage.editArticle();
    });

    newArticlePage.editData(
      newArticleData.title,
      newArticleData.description,
      newArticleData.body,
      newArticleData.tag
    );

    newArticlePage.clickPublishArticleBtn();

    articlePage.isCorrectTitle(newArticleData.title);
  });

  it('should be deleted using Delete button in banner part', () => {
    newArticlePage.typeData(
      article.title,
      article.description,
      article.body,
      article.tag
    );

    newArticlePage.clickPublishArticleBtn();

    cy.url().should('include', article.title);

    cy.get('.banner').within(() => {
      articlePage.deleteArticle();
    });

    cy.visit(`http://localhost:1667/#/@${user.username}/`);

    cy.getByDataCy('user-page-article-preview')
      .should('contain', 'No articles are here... yet.');
  });

  it('should be deleted using Delete button in page part', () => {
    newArticlePage.typeData(
      article.title,
      article.description,
      article.body,
      article.tag
    );

    newArticlePage.clickPublishArticleBtn();

    cy.url().should('include', article.title);

    cy.get('.page').within(() => {
      articlePage.deleteArticle();
    });

    cy.visit(`http://localhost:1667/#/@${user.username}/`);

    cy.getByDataCy('user-page-article-preview')
      .should('contain', 'No articles are here... yet.');
  });
});
