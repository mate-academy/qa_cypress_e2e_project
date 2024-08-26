/* eslint-disable cypress/no-unnecessary-waiting */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

describe('Article', () => {
  let user;
  let article;

  before(() => {
    // Initialization if needed
  });

  const signInPage = new SignInPageObject();
  const newArticlePage = new ArticlePageObject();
  const homePage = new HomePageObject();
  const userPage = new UserPageObject();

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      return cy.task('generateArticle');
    }).then((generateArticle) => {
      article = generateArticle;

      signInPage.visit();
      cy.register(user.email, user.username, user.password);

      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
    });
  });

  it('should be created using New Article form', () => {
    cy.wait(1000);
    newArticlePage.visit();

    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTags(article.tag);

    newArticlePage.clickOnPublishBtn();

    newArticlePage.checkArticleTitle(article.title);
    newArticlePage.checkArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    cy.wait(1000);
    newArticlePage.visit();

    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTags(article.tag);
    newArticlePage.clickOnPublishBtn();

    newArticlePage.checkArticleTitle(article.title);

    newArticlePage.clickOnEditBtn();
    newArticlePage.typeTitle('new');
    newArticlePage.clickOnPublishBtn();

    newArticlePage.checkArticleTitle(article.title + 'new');
  });

  it('should be deleted using Delete button', () => {
    cy.wait(1000);
    newArticlePage.visit();

    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTags(article.tag);
    newArticlePage.clickOnPublishBtn();

    newArticlePage.checkArticleTitle(article.title);
    newArticlePage.clickOnDeleteBtn();

    cy.wait(1000);
    homePage.clickOnUsernameLink();
    userPage.assertPreviewArticles(article.title);
  });
});
