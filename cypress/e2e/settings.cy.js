/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let newTestData;
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateNewTestData').then(generateNewTestData => {
      newTestData = generateNewTestData;
    });
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.register();
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeNewUsername(newTestData.username);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.checkMessageThatDataUpdated();

    homePage.visit();
    homePage.checkNewUsername(newTestData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeNewBio(newTestData.bio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.checkMessageThatDataUpdated();

    homePage.visit();
    homePage.clickUsernameLink();

    settingsPage.checkMessageThatBioUpdated(newTestData.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeNewEmail(newTestData.email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.checkMessageThatDataUpdated();
    settingsPage.clickLogoutBtn();

    signInPage.visit();
    signInPage.emailField.type(newTestData.email);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();

    homePage.checkSuccessfulLogin(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);

    settingsPage.visit();
    settingsPage.passwordField.type(newTestData.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.checkMessageThatDataUpdated();
    settingsPage.clickLogoutBtn();

    signInPage.visit();
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(newTestData.password);
    signInPage.signInBtn.click();

    homePage.checkSuccessfulLogin(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    settingsPage.checkSuccessfulLogout();
  });
});
