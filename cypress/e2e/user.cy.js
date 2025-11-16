/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('User', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((user) => {
      cy.login(user.email, user.username, user.password);
      cy.wrap(user).as('user');
    });
    cy.createArticle();
    settingsPage.visit();
    settingsPage.clickInLogout();
    settingsPage.assertLoggedOutUser();
    cy.task('generateUser').then((secondUser) => {
      cy.login(secondUser.email, secondUser.username, secondUser.password);
    });
    cy.visit('/');
  });

  it('should be able to follow the another user', () => {
    homePage.clickInGlobalFeed();
    homePage.clickInAuthor();
    homePage.followUser();
    homePage.assertFollowedUser();
  });

  it('should be able to unfollow the another user', () => {
    cy.followUser();
    homePage.unfollowUser();
    homePage.assertUnfollowedUser();
  });
});
