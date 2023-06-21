/// <reference types="cypress" />
/// <reference types="../support" />
import SettingsPageObject from '../support/pages/settings.PageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let newData;
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateNewData').then(generateNewData => {
      newData = generateNewData;
    });
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.register();
  });

  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.typeNewUsername(newData.username);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertMessageAboutUpdatingData();
    homePage.assetrNewUsername(newData.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.typeNewBio(newData.bio);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertMessageAboutUpdatingData();
    homePage.clickUsernameLink();
    settingsPage.assertMessageAboutUpdatingBio(newData.bio);
  });

  it.skip('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.typeNewEmail(newData.email);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertMessageAboutUpdatingData();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(newData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertSuccessfulLogin(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.typeNewPassword(newData.password);
    settingsPage.clickUpdateSettingsBtn();
    settingsPage.assertMessageAboutUpdatingData();
    settingsPage.clickLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newData.password);
    signInPage.clickSignInBtn();
    homePage.assertSuccessfulLogin(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.visit();
    settingsPage.clickLogoutBtn();
    settingsPage.assertSuccessfulLogout();
  });
});
