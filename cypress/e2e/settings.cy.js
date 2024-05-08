/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';
import HomePageObject from '..//support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();
const userPage = new UserPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let updateData;
  let user;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
    });
    cy.task('generateUpdateData').then((generateUpdateData) => {
      updateData = generateUpdateData;
    });
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUserame(updateData.username);
    settingsPage.clickOnUpdateBtn();
    settingsPage.clickOnOkBtn();
    userPage.visitUserPage(updateData.username);
    userPage.assertBannerContainUsername(updateData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(updateData.bio);
    settingsPage.clickOnUpdateBtn();
    settingsPage.clickOnOkBtn();
    userPage.visitUserPage(user.username);
    userPage.assertBannerContainBio(updateData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(updateData.email);
    settingsPage.clickOnUpdateBtn();
    settingsPage.clickOnOkBtn();
    settingsPage.assertSettingsContainEmail(updateData.email);
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(updateData.password);
    settingsPage.clickOnUpdateBtn();
    settingsPage.clickOnOkBtn();
    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(updateData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickOnLogoutBtn();
    homePage.assertHeaderNotContainUsername();
  });
});
