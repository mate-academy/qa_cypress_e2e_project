/* eslint-disable import/first */
/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePageObject from '../support/pages/article.PageObject';
const articlePage = new ArticlePageObject();
let user;
let article;

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register(user.email, user.username, user.password);
    articlePage.visit('/' + articlePage.url);
    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTags(article.tag);
    articlePage.clickOnPublishArticleBtn();
    articlePage.assertArticleUrl(article.url);
  });

  it('should be edited using Edit button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article);
    articlePage.clickOnEditArticleBtn();
    articlePage.editArticleTitle(article.title);
    articlePage.editArticleDescription(article.description);
    articlePage.editArticleBody(article.body);
    articlePage.editArticleTags(article.tag);
    articlePage.clickOnPublishArticleBtn();
    articlePage.assertArticleUrl(article.url);
    cy.get('h1').should('contain', article.title + article.title);
  });

  it('should be deleted using Delete button', () => {
    cy.register(user.email, user.username, user.password);
    cy.createArticle(article);
    articlePage.clickOnDeleteArticleBtn();
    articlePage.assertDeleteArticleUrl();
  });
});
