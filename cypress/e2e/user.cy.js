/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignUpPageObject from '../support/pages/signUp.pageObject';

let user;
let article;

const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const articlePage = new ArticlePageObject();
const settingsPage = new SettingsPageObject();
const signUpPage = new SignUpPageObject();
const secondUser = 'test';

describe('User', () => {
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

  beforeEach(() => {
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    articlePage.clickArticleLink();
    articlePage.typeTitle(article.title);
    articlePage.typeTopic(article.description);
    articlePage.typeBody(article.body);
    articlePage.clickPublishBtn();
    settingsPage.clickSettingsLink();
    settingsPage.clickLogoutBtn();

    signUpPage.visit();
    signUpPage.typeUsername(secondUser + user.username);
    signUpPage.typeEmail(secondUser + user.email);
    signUpPage.typePassword(user.password);

    signUpPage.clickSignUpBtn();
    userPage.assertSuccessfulRegistration();
  });

  it('should be able to follow the another user', () => {
    articlePage.clickYourFeedTab();
    articlePage.clickArticleThatWasCreated(article.title);
    userPage.clickFollowBtn();
  });
});
