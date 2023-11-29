/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const profilePage = new ProfilePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.login(user.username, user.email, user.password);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.assertRegisteredUsername(user.username);
    settingsPage.typeUpdateUsername(user.updateUsername);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessUpdate();
    settingsPage.clickSuccessAlertBtn();
    settingsPage.assertUpdatedUsername(user.updateUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.assertEmptyBio();
    settingsPage.typeUpdateBio(user.bio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessUpdate();
    settingsPage.clickSuccessAlertBtn();
    homePage.clickProfileLink();
    profilePage.assertProfileBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.assertRegisterEmail(user.email);
    settingsPage.typeUpdateEmail(user.updatedEmail);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessUpdate();
    settingsPage.clickSuccessAlertBtn();
    settingsPage.assertRegisterEmail(user.updatedEmail);
  });

  it('should provide an ability to update password', () => {
    homePage.assertHeaderContainUsername(user.username);
    settingsPage.typeUpdatePassword(user.updatedPassword);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertSuccessUpdate();
    settingsPage.clickSuccessAlertBtn();
    settingsPage.clickLogoutButton();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.updatedPassword);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    homePage.assertHeaderContainUsername(user.username);
    settingsPage.clickLogoutButton();
    homePage.visit();
    homePage.assertHeaderWithoutUsername(user.username);
  });
});
