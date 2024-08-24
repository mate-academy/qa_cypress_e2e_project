/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const newArticlePage = new ArticlePageObject();

describe('User', () => {
  let user;
  let article;

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

  // user is not able to follow / unfollow the user - the [Follow user] button is not clickable
  it('should be able to follow the another user', () => {
    cy.wait(1000);
    newArticlePage.visit();

    newArticlePage.typeTitle(article.title);
    newArticlePage.typeDescription(article.description);
    newArticlePage.typeBody(article.body);
    newArticlePage.typeTags(article.tag);

    newArticlePage.clickOnPublishBtn();

    newArticlePage.checkArticleTitle(article.title);
    newArticlePage.checkArticleBody(article.body);

    cy.wait(1000);
    settingsPage.visit();
    settingsPage.clickOnLogOutBtn();

    homePage.visit();
    homePage.assertUserLogOut();

    signUpPage.visit();
    signUpPage.typeUsername('User' + user.username);
    signUpPage.typeEmailForNewUser('new' + user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    homePage.assertHeaderContainUsername(user.username);

    homePage.closeThePopUp();
    homePage.clickOnToggle();
    homePage.clickOnArticlePreview();

    newArticlePage.clickOnFollowUser();
  });
});
