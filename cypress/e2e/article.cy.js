/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const articlePage = new ArticlePageObject();
const homePage = new HomePageObject();
const faker = require('faker');

describe('Article page', () => {
  const newArticleTitle = faker.lorem.word();
  const newArticleDescription = faker.lorem.words();
  const newArticleBody = faker.lorem.words();
  const newArticleTags = faker.lorem.words();
  let article;
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);
  });

  it('should be created using New Article form', () => {
    cy.login();

    articlePage.visit();

    articlePage.typeArticleTitle(article.title);
    articlePage.typeArticleDescription(article.description);
    articlePage.typeArticleBody(article.body);
    articlePage.typeArticleTag(article.tag);
    articlePage.typeArticleTag(article.tag);

    cy.wait(5000);

    articlePage.clickPublishBtn();

    homePage.assertArticlePageUrl(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.login();
    cy.createArticle();
    cy.wait(5000);

    articlePage.clickEditArticleBtn();

    articlePage.articleTitle.clear();
    articlePage.articleTitle.type(newArticleTitle);

    articlePage.typeArticleDescription(newArticleDescription);

    articlePage.typeArticleBody(newArticleBody);
    articlePage.typeArticleTag(newArticleTags);
    articlePage.clickPublishBtn();

    homePage.assertEditArticlePageUrl(newArticleTitle);
  });

  it('should be deleted using Delete button', () => {
    cy.login();
    cy.createArticle();

    articlePage.clickDeleteBtn();
    homePage.assertSuccessfullDelete();
  });
});
