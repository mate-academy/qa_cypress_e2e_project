/// <reference types="cypress" />
/// <reference types="../support" />

import ArticlePageObject from '../support/pages/article.pageObject';
import PageObject from '../support/PageObject';

const articlePage = new ArticlePageObject();
const pageObject = new PageObject();

describe('Article', () => {
  let article;
  let article2;
  beforeEach(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article2 = generateArticle;
    });
  });

  it('should be created using New Article form', () => {
    cy.register();
    articlePage.visit();
    articlePage.typeInTitleField(article.title);
    articlePage.typeInDescribeField(article.description);
    articlePage.typeInBodyField(article.body);
    articlePage.typeInTagField(article.body);
    articlePage.clickOnPublishArticleBtn();
    articlePage.containArticleTitlEOnPage(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.register();
    articlePage.visit();
    articlePage.typeInTitleField(article.title);
    articlePage.typeInDescribeField(article.description);
    articlePage.typeInBodyField(article.body);
    articlePage.typeInTagField(article.body);
    articlePage.clickOnPublishArticleBtn();
    articlePage.clickOnEditArticleBtn();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);

    articlePage.clearIntitleField();
    articlePage.typeInTitleField(article2.title);
    articlePage.clearInBodyField();
    articlePage.typeInBodyField(article2.body);
    articlePage.clickOnPublishArticleBtn();
    articlePage.containArticleTitlEOnPage(article2.title);
    articlePage.containArticleBodyOnPage(article2.body);
  });

  it('should be deleted using Delete button', () => {
    cy.register();
    articlePage.visit();
    articlePage.typeInTitleField(article.title);
    articlePage.typeInDescribeField(article.description);
    articlePage.typeInBodyField(article.body);
    articlePage.typeInTagField(article.tag);
    articlePage.clickOnPublishArticleBtn();
    articlePage.clickOnDeleteBtn();
    pageObject.assertAllertTextContain('Deleted the article. Going home...');
  });
});
