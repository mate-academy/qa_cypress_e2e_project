/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import CreateArticlePage from '../support/pages/articleCreating.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import UserSettings from '../support/pages/userSettings.pageObject';

const signUpPage = new SignUpPageObject();
const signInPage = new SignInPageObject();
const userSettings = new UserSettings();
const homePage = new HomePageObject();
const createArticlePage = new CreateArticlePage();

describe('User can follow/unfollow the user', () => {
  let user;
  let article;
  before(() => {
    cy.task('db:clear');
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.clickOkBtn();

    createArticlePage.visit();
    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTags(article.tag);
    createArticlePage.clickArticleCreateBtn();

    homePage.assertSettingsLink();

    homePage.clickTheSettings();

    userSettings.clickLogoutBtn();
    signUpPage.visit();
    signUpPage.typeUsername('username');
    signUpPage.typeEmail('mynewemail2@io.ua');
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.clickOkBtn();

    homePage.clickTheYourFeedLink();
    homePage.clickTheAnotherUser();
    homePage.clickTheFollowBtn();
    homePage.assertUnfollowBtn();
  });

  it('should be able to unfollow the another user', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();
    signUpPage.clickOkBtn();

    createArticlePage.visit();
    createArticlePage.typeTitle(article.title);
    createArticlePage.typeDescription(article.description);
    createArticlePage.typeBody(article.body);
    createArticlePage.typeTags(article.tag);
    createArticlePage.clickArticleCreateBtn();

    homePage.assertSettingsLink();

    homePage.clickTheSettings();

    userSettings.clickLogoutBtn();
    signInPage.visit();

    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.clickTheYourFeedLink();
    homePage.clickTheAnotherUser();
    homePage.clickTheFollowBtn();
    homePage.assertUnfollowBtn();
    homePage.clickUnfollowBtn();
  });
});
