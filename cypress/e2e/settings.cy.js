/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

const registeredUser = {
  username: 'Shakira123',
  email: 'shakirashakira11@qa.team',
  password: '12345Qwert!'
};

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    homePage.clearDatabase();
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('/');
    homePage.registeredUser();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.updateUsername(user.username);
    settingsPage.clickSubmitBtn();

    settingsPage.assertSuccessfulUpdate();
    settingsPage.clickOkBtn();
    settingsPage.assertUsername(user.username);
    homePage.assertUsernameLink(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.updateBio(user.bio);
    settingsPage.clickSubmitBtn();

    settingsPage.assertSuccessfulUpdate();
    settingsPage.clickOkBtn();
    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    settingsPage.updateEmail(user.email);
    settingsPage.clickSubmitBtn();

    settingsPage.assertSuccessfulUpdate();
    settingsPage.clickOkBtn();

    settingsPage.clickLogout();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(registeredUser.password);
    signInPage.clickSignInBtn();

    homePage.assertUsernameLink(registeredUser.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.updatePassword(user.password);
    settingsPage.clickSubmitBtn();

    settingsPage.assertSuccessfulUpdate();
    settingsPage.clickOkBtn();

    signInPage.visit();
    signInPage.typeEmail(registeredUser.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertUsernameLink(registeredUser.username);
  });

  it('should provide an ability to log out', () => {

    settingsPage.clickLogout();
    homePage.assertHomePageUrl();
    settingsPage.assertLogout();
  });
});