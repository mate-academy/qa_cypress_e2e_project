/* eslint-disable */
/// <reference types='cypress' />
/// <reference types='../support' />

import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const userPage = new UserPageObject();
const settingsPage = new SettingsPageObject();

describe('User', () => {
  let firstUser;
  let secondUser;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      firstUser = generateUser;
    });

    cy.task('generateUser').then((generateEditUser) => {
      secondUser = generateEditUser;
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    signUpPage.visit();

    signUpPage.typeUserName(firstUser.username);
    signUpPage.typeEmail(firstUser.email);
    signUpPage.typePassword(firstUser.password);
    signUpPage.clickSignUpBtn();
    cy.wait(3000);
    signUpPage.clickSwalBtn('OK');
    articlePage.visit();
    articlePage.createArticle(
      article.title,
      article.description,
      article.body,
      article.tag
    );

    articlePage.assertArticlePageContainArticle(article.title);

    settingsPage.visit();
    settingsPage.clickBtn('Or click here to logout.');

    homePage.assertUserHeaderNotExist();

    signUpPage.visit();

    signUpPage.typeUserName(secondUser.username);
    signUpPage.typeEmail(secondUser.email);
    signUpPage.typePassword(secondUser.password);
    signUpPage.clickSignUpBtn();
    cy.wait(3000);
    signUpPage.clickSwalBtn('OK');

    userPage.openMyFeedTab();
    userPage.visitUserLinkOnArticleTab(firstUser.username);

    userPage.clickBtn('Follow ' + firstUser.username);
  });
});
