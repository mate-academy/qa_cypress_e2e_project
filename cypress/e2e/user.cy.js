/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const articlePage = new ArticlePageObject();
const settingsPage = new SettingsPageObject();
const signUpPage = new SignUpPageObject();

describe('User', () => {
  let user;
  let article;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    articlePage.clickArticleLink();
    articlePage.inputTitle(article.title);
    articlePage.inputTopic(article.description);
    articlePage.inputBody(article.body);
    articlePage.clickPublishBtn();

    settingsPage.clickSettingsLink();
    settingsPage.clickLogoutBtn();

    signUpPage.visit();

    signUpPage.inputUsername('test' + user.username);
    signUpPage.inputEmail('test' + user.email);
    signUpPage.inputPassword(user.password);

    signUpPage.clickSignUpBtn();

    userPage.assertSuccessfulRegistration();
    articlePage.clickYourFeedTab();
    articlePage.clickArticleThatWasCreated(article.title);
    userPage.clickFollowBtn();
  });
});
