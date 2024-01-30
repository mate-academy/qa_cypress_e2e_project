/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;
  let newData;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateSecondUser').then((generateSecondUser) => {
      newData = generateSecondUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.enterNewUsername(newData.username);
    settingsPage.clickOnUpdateBtn();
    settingsPage.assertUpdatedSettings();
    signInPage.closeModalWindow();
    homePage.assertHeaderContainUsername(newData.username);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.enterBio(newData.bio);
    settingsPage.clickOnUpdateBtn();
    settingsPage.assertUpdatedSettings();
    signInPage.closeModalWindow();
    homePage.usernameLink.click();
    settingsPage.assertBio(newData.bio);
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.enterNewEmail(newData.email);
    settingsPage.clickOnUpdateBtn();
    settingsPage.assertUpdatedSettings();
    signInPage.closeModalWindow();
    settingsPage.assertNewEmail();
    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(newData.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.enterNewPassword(newData.password);
    settingsPage.clickOnUpdateBtn();
    settingsPage.assertUpdatedSettings();
    signInPage.closeModalWindow();
    settingsPage.clickOnLogoutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newData.password);
    signInPage.clickSignInBtn();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickOnLogoutBtn();
    settingsPage.assertLogout();
  });
});
