/* eslint-disable max-len */
import HomePageObject from '../support/pages/home.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';
import ArticlePageObject from '../support/pages/article.pageObject.js';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const articlePage = new ArticlePageObject();

let user;
let article;

/// <reference types='cypress' />
/// <reference types='../support' />

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
    signInPage.registerAndLogin(user.email, user.username, user.password);

    homePage.visit(`#/editor`);
    articlePage.createArticle(article.title, article.description, article.body, article.tag);

    articlePage.assertArticlePageURL(article.title);
    articlePage.assertArticleTitle(article.title);
    articlePage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    signInPage.registerAndLogin(user.email,
      user.username, user.password);
    homePage.visit(`#/editor`);
    articlePage.createArticle(article.title,
      article.description, article.body, article.tag);
    articlePage.assertEditArticleLink();
    articlePage.assertEditorePageURL(article.title);
    articlePage.createArticle(' test changes1',
      ' test changes2',
      ' test changes3',
      ' test changes4');

    articlePage.assertEditorePageURL(article.title);
    articlePage
      .assertArticleTitle(article.title + ' test changes1');
    articlePage
      .assertArticleBody(article.body + ' test changes3');
  });

  it('should be deleted using Delete button', () => {
    signInPage.registerAndLogin(user.email,
      user.username, user.password);
    homePage.visit(`#/editor`);
    articlePage.createArticle(article.title,
      article.description, article.body, article.tag);
    articlePage.assertDeleteArticleButton();
    homePage.userPageOpen();
    homePage.assertUsernameFromUserPage(user.username);
    homePage.assernoArticlesAreHere();
  });
});
