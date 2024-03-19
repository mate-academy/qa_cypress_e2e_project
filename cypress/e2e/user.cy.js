/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ArticlesPageObject from '../support/pages/articles.pageObject';

const signInPage = new SignInPageObject();
const profilePage = new ProfilePageObject();
const settingsPage = new SettingsPageObject();
const articlePage = new ArticlesPageObject();

describe('User', () => {
  let followerUser;
  let followingUser;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((user1) => {
      followerUser = user1;
      cy.register(followerUser.email, followerUser.username,
        followerUser.password);
    });
  });

  it('should be able to follow another user', () => {
    signInPage.visit();
    signInPage.typeEmail(followerUser.email);
    signInPage.typePassword(followerUser.password);
    signInPage.clickSignInBtn();
    articlePage.visit();
    articlePage.clickWriteArticle();
    articlePage.typeTitle('Your Title');
    articlePage.typeDescription('Your Description');
    articlePage.typeBody('Your Body');
    articlePage.clickArticlePublishButton();
    settingsPage.visit();
    signInPage.clickSignOutBtn();
  });

  it.skip('should be able to follow the another user', () => {
    signInPage.visit();
    cy.task('generateUser').then((user2) => {
      followingUser = user2;
      cy.register(followingUser.email, followingUser.username,
        followingUser.password);
      signInPage.typeEmail(followingUser.email);
      signInPage.typePassword(followingUser.password);
      signInPage.clickSignInBtn();
      profilePage.clickYourFeed();
      profilePage.clickUser();
      profilePage.clickFollowUser();
      profilePage.clickUnFollowUser();
    });
  });
});
