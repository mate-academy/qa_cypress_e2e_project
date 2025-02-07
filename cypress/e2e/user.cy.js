/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const userPage = new UserPageObject();

describe('User', () => {
  before(() => {
    cy.task('db:clear');
    cy.registrationAndAuthorization();
    cy.createArticle();

    settingsPage.goToSettingsPage();
    settingsPage.clickLogoutBtn();
  });

  it('should be able to follow the another user', () => {
    cy.registrationAndAuthorization();
    settingsPage.visit();

    homePage.visit();
    homePage.clickOnYourFeedLink();

    userPage.clickOnAuthorLink();
    userPage.clickOnFollowBtn();
  });
});
