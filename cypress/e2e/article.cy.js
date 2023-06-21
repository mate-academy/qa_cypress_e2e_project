/// <reference types="cypress" />
/// <reference types="../support" />

import NewArticlePageObject from '../support/pages/newArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const newArticlePage = new NewArticlePageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();

const userData = {
  username: 'riot',
  email: 'riot@qa.team',
  password: '12345Qwert!'
};

const articleData = {
  title: 'Hello friend',
  description: 'friend',
  body: 'Hello, world!!!',
};

describe('Article', () => {
  let user;
  let article;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.task('generateArticle').then(generateArticle => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
  });

  it('should be created using New Article form', () => {
    homePage.loggedUser();
    newArticlePage.visit();

    newArticlePage.typeNewArticleTitle(article.title);
    newArticlePage.typeNewArticleDescription(article.description);
    newArticlePage.typeNewArticleBody(article.body);
    newArticlePage.typeNewArticleTag(article.tag);
    newArticlePage.clickPublishButton();

    articlePage.assertArticleData(article.title, article.body, userData.username);
  });

  it('should be edited using Edit button', () => {
    newArticlePage.createArticle(
      article.title, 
      article.description, 
      article.body, 
      article.tag
    );

    articlePage.assertArticleData(article.title, article.body, userData.username);
    articlePage.clickEditButton();

    newArticlePage.typeEditArticleTitle(articleData.title);
    newArticlePage.typeEditArticleDescription(articleData.description);
    newArticlePage.typeEditArticleBody(articleData.body);
    newArticlePage.clickPublishButton();

    articlePage.assertArticleData(articleData.title, articleData.body, userData.username);
  });

  it('should be deleted using Delete button', () => {
    newArticlePage.createArticle(
      article.title, 
      article.description, 
      article.body, 
      article.tag
    );

    articlePage.assertArticleData(article.title, article.body, userData.username);
    articlePage.clickDeleteButton();

    homePage.assertDeletingArticle();
  });
});
