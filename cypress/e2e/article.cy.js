/// <reference types="cypress" />
/// <reference types="../support" />

import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const publishArticle = new NewArticlePageObject();
const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();

const testData = {
  articleTitle: 'edited_title',
  articleDescription: 'edited_description',
  articleBody: 'edited_body'
};

describe('Article', () => {
  let article;

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(500);

    cy.login();
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
    publishArticle.visit();
  });

  it('should be created using New Article form', () => {
    publishArticle.articleTitleField.clear().type(article.title);
    publishArticle.articleDescriptionField.clear().type(article.description);
    publishArticle.articleBodyField.clear().type(article.body);
    publishArticle.publishBtn.click();

    articlePage.assertArticleTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    publishArticle.articleTitleField.clear().type(article.title);
    publishArticle.articleDescriptionField.clear().type(article.description);
    publishArticle.articleBodyField.clear().type(article.body);
    publishArticle.publishBtn.click();

    articlePage.assertArticleTitle(article.title);

    articlePage.visitArticlePage(article.title);
    articlePage.editArticleBtn.eq(0).click();

    publishArticle.articleTitleField.clear().type(testData.articleTitle);
    publishArticle.articleDescriptionField.clear().type(testData.articleDescription);
    publishArticle.articleBodyField.clear().type(testData.articleBody);
    publishArticle.publishBtn.click();
    
    articlePage.assertArticleTitle(testData.articleTitle);
  });

  it('should be deleted using Delete button', () => {
    publishArticle.articleTitleField.clear().type(article.title);
    publishArticle.articleDescriptionField.clear().type(article.description);
    publishArticle.articleBodyField.clear().type(article.body);
    publishArticle.publishBtn.click();

    articlePage.assertArticleTitle(article.title);

    articlePage.visitArticlePage(article.title);
    articlePage.deleteArticleBtn.eq(1).click();

    homePage.visitYourFeed();
    homePage.assertDeletingArticle('No articles are here... yet.');
  });
});
