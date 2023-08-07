/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
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
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.updateUsername(user.username + '123');
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.successfulUpdateMessage();
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update bio', () => {
    const bio = 'Hello there!';
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.updateBio(bio);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.successfulUpdateMessage();
  });

  it('should provide an ability to update an email', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.updateEmail('aaa' + user.email);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.successfulUpdateMessage();

    settingsPage.clickOnLogOutBtn();
    signInPage.visit();
    signInPage.typeEmail('aaa' + user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    const newPassword = '123Qwer#';
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.updatePassword(newPassword);
    settingsPage.clickOnUpdateSettingsBtn();

    settingsPage.successfulUpdateMessage();

    settingsPage.clickOnLogOutBtn();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();

    settingsPage.clickOnLogOutBtn();

    settingsPage.assertLogOut();
  });
});
