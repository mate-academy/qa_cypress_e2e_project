/// <reference types='cypress' />
/// <reference types='../support' />

import ProfilePage from '../support/pages/profile.pageObject';
import HomePage from '../support/pages/home.pageObject';
import SettingsPage from '../support/pages/settings.pageObject';

const profilePage = new ProfilePage();
const settingsPage = new SettingsPage();
const homePage = new HomePage();

describe('Settings page', () => {
  let user;
  let newUser;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      newUser = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.register(user.username, user.email, user.password);
      cy.login(user.email, user.password);
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeNewUsername(newUser.username);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.allertSuccessfulUpdate();

    settingsPage.assertUpdatedUsernameField(newUser.username);
    homePage.assertHeaderContainUsername(newUser.username);
    profilePage.visit(newUser.username);
    profilePage.assertProfileInLink(newUser.username);
    profilePage.assertUpdatedProfileInfo(newUser.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeNewBio(newUser.bio);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.allertSuccessfulUpdate();
    settingsPage.assertUpdatedBioField(newUser.bio);
    profilePage.visit(user.username);
    profilePage.assertUpdatedProfileInfo(newUser.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeNewEmail(newUser.email);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.allertSuccessfulUpdate();
    settingsPage.assertUpdatedEmailField(newUser.email);
    settingsPage.clickOnLogoutBtn();
    cy.loginSignInPage(newUser.email, user.password);
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.typeNewPassword(newUser.password);
    settingsPage.clickOnUpdateSettingBtn();
    settingsPage.allertSuccessfulUpdate();

    cy.loginSignInPage(user.email, newUser.password);
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickOnLogoutBtn();
    homePage.assertHeaderNotContainUsername();
    homePage.assertHeaderContainSignIn();
    homePage.assertUrlAfterLogout();
  });
});
