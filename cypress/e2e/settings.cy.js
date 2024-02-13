/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.login(user.username, user.email, user.password);
    settingsPage.visit();
    settingsPage.typeNewUsername(user.newUsername);
    settingsPage.clickUpdateSettingBtn();
    homePage.assertHeaderContainUsername(user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.login(user.username, user.email, user.password);
    settingsPage.visit();
    settingsPage.typeNewBio(user.bio);
    settingsPage.clickUpdateSettingBtn();
    settingsPage.assertSwalSucces();
    homePage.clickUsername();
    profilePage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.login(user.username, user.email, user.password);
    settingsPage.visit();
    settingsPage.typeNewEmail(user.newEmail);
    settingsPage.clickUpdateSettingBtn();
    settingsPage.assertSwalSucces();
    homePage.clickSettings();
    settingsPage.assertNewEmail(user.newEmail);
  });

  it('should provide an ability to update password', () => {
    settingsPage.login(user.username, user.email, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(user.newPassword);
    settingsPage.clickUpdateSettingBtn();
    settingsPage.assertSwalSucces();
    settingsPage.clickLogOutButton();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.newPassword);
    signInPage.signInBtn.click();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.login(user.username, user.email, user.password);
    settingsPage.visit();
    settingsPage.clickLogOutButton();

    homePage.assertHeaderContainSignIn();
  });
});
