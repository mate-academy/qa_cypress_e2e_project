/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from
  '../support/pages/article.pageObject';
import HomePageObject from
  '../support/pages/home.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();  

describe('Article', () => {
    let user;
    let article;
  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

  cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });

  cy.register();
  cy.login();
  });

  it('should be created using New Article form', () => {
    articlePage.visit();
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(article.tag);
    articlePage.clickPublishArticleBtn();
    articlePage.assertArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createdArticle(article);
    articlePage.clickEditArticleBtn();
    articlePage.updateArticleTitle(article.title);
    articlePage.updateArticleDescription(article.description);
    articlePage.updateArticleBody(article.body);
    articlePage.updateArticleTags(article.tag);
    articlePage.clickPublishArticleBtn();
    articlePage.assertArticleTitle(article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.createdArticle(article);
    articlePage.clickDeleteArticleBtn();
    homePage.assertArticles();
  });
});
