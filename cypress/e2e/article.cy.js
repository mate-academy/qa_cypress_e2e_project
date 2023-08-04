/* eslint-disable max-len */
/// <reference types='cypress' />
/// <reference types='../support' />

import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const newArticlePage = new NewArticlePageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

const userData = {
  username: 'antonzal99',
  email: 'anton1999@qa.team',
  password: '12345Qwert!'
};

const articleData = {
  title: 'aaaa1',
  description: 'aaaa2',
  body: 'aaaa3'
};

describe('Article', () => {
  let article;

  before(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    homePage.registeredUser();
    newArticlePage.visit();
  });

  it('should be created using New Article form', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(article.title, article.body, userData.username);
  });

  it('should be edited using Edit button', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(article.title, article.body, userData.username);

    articlePage.clickEditBtn();

    newArticlePage.typeEditArticleTitle(articleData.title);
    newArticlePage.typeEditArticleDescription(articleData.description);
    newArticlePage.typeEditArticleBody(articleData.body);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(articleData.title, articleData.body, userData.username);
  });

  it('should be deleted using Delete button', () => {
    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishArticleBtn();

    articlePage.assertArticleData(article.title, article.body, userData.username);

    articlePage.clickDeleteBtn();

    articlePage.assertDeletingArticle();
  });
});
