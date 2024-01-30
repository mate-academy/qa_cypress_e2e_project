/// <reference types='cypress' />
/// <reference types='../support' />

import ArticlePageObject from '../support/pages/article.pageObject';
import CreatedArticlePage from '../support/pages/createdArticle.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settingsPageObject';
import UserPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

const homePage = new HomePageObject();
const articlePage = new ArticlePageObject();
const createdArticlePage = new CreatedArticlePage();
const settingsPage = new SettingsPageObject();
const userPage = new UserPageObject();
const signInPage = new SignInPageObject();
const signUpPage = new SignUpPageObject();

let user;
let secondUser;
let newArticle;

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateSecondUser').then((generateSecondUser) => {
      secondUser = generateSecondUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      newArticle = generateArticle;
    });
  });

  it('should be able to follow the another user', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.newArticleLinkClick();

    articlePage.typeTitle(newArticle.title);
    articlePage.typeAbout(newArticle.description);
    articlePage.typeBodySevenWords(newArticle.bodySevenWords);
    articlePage.typeTag(newArticle.tag);
    articlePage.clickPublishButton();

    homePage.settingsLinkClick();
    settingsPage.logoutButtonClick();

    signUpPage.visit();
    signUpPage.typeUsername(secondUser.username);
    signUpPage.typeEmail(secondUser.email);
    signUpPage.typePassword(secondUser.password);
    signUpPage.clickSignUpBtn();

    homePage.yourFeedToggleClick();

    userPage.articleAuthorClick();
    userPage.followButtonClick();
    userPage.assertFollowButton();
  });

  it('should be able to unfollow the another user', () => {
    cy.register(user.email, user.username, user.password);
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.newArticleLinkClick();

    articlePage.typeTitle(newArticle.title);
    articlePage.typeAbout(newArticle.description);
    articlePage.typeBodySevenWords(newArticle.bodySevenWords);
    articlePage.typeTag(newArticle.tag);
    articlePage.clickPublishButton();

    createdArticlePage.asseertCreatedArticleTitle(newArticle.title);
    createdArticlePage.asseertCreatedArticleBody(newArticle.bodySevenWords);

    homePage.settingsLinkClick();
    settingsPage.logoutButtonClick();

    signUpPage.visit();
    signUpPage.typeUsername(secondUser.username);
    signUpPage.typeEmail(secondUser.email);
    signUpPage.typePassword(secondUser.password);
    signUpPage.clickSignUpBtn();

    homePage.clickPopUpOkButton();

    homePage.yourFeedToggleClick();

    userPage.articleAuthorClick();
    userPage.followButtonClick();
    userPage.followButtonClick();
    userPage.assertUnfollowButton();
  });
});
