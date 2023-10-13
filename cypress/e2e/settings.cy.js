/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from "../support/pages/settings.pageObject";
import HomePageObject from "../support/pages/home.pageObject";
import ProfilePageObject from "../support/pages/profile.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let credentialsData;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('settingsData').then((settingsData) => {
      credentialsData = settingsData;
    });
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(user.username);
    settingsPage.verifySuccessfulUpdating();
    homePage.assertHeaderContainUsername(user.username);
    homePage.clickUsernameLink();
    profilePage.accertUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(credentialsData.bio);
    settingsPage.verifySuccessfulUpdating();
    homePage.clickUsernameLink();
    profilePage.accertNewBio(credentialsData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(credentialsData.newEmail);
    settingsPage.verifySuccessfulUpdating();
    settingsPage.clickLogoutBtn();
    signInPage.loginWithUpdatedData(credentialsData.newEmail, user.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(credentialsData.newPassword);
    settingsPage.verifySuccessfulUpdating();
    settingsPage.clickLogoutBtn();
    signInPage.loginWithUpdatedData(credentialsData.email, credentialsData.newPassword);
    homePage.assertHeaderContainUsername(credentialsData.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.checkUrl();
  });
});
