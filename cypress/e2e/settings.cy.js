/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();

const updatedUser = {
  username: 'sandra_ma1123',
  email: 'sandra_m0123@test.com',
  password: '000Qwert!'
};

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    homePage.registeredUser(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateUsername(updatedUser.username);
    settingsPage.clickSubmitBtn();
    settingsPage.assertUpdateSuccessful();
    homePage.assertHeaderContainUsername(updatedUser.username);
  });

  it('should provide an ability to update bio', () => {
    homePage.registeredUser(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateBio(user.bio);
    settingsPage.clickSubmitBtn();
    settingsPage.assertUpdateSuccessful();
    settingsPage.clickOkBtn();
    settingsPage.assertBio(user.bio);
  });

  it('should provide an ability to update an email', () => {
    homePage.registeredUser(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updateEmail(updatedUser.email);
    settingsPage.clickSubmitBtn();
    settingsPage.assertUpdateSuccessful();
    settingsPage.clickOkBtn();

    signInPage.visit();
    signInPage.typeEmail(updatedUser.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertUsernameLink(user.username);
  });

  it('should provide an ability to update password', () => {
    homePage.registeredUser(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.updatePassword(updatedUser.password);
    settingsPage.clickSubmitBtn();
    settingsPage.assertUpdateSuccessful();
    settingsPage.clickOkBtn();

    signInPage.visit();
    signInPage.typeEmail(user.email);

    signInPage.typePassword(updatedUser.password);
    signInPage.clickSignInBtn();

    homePage.assertUsernameLink(user.username);
  });

  it('should provide an ability to log out', () => {
    homePage.registeredUser(user.email, user.username, user.password);
    settingsPage.visit();
    settingsPage.clickLogOut();
    homePage.assertHomePageUrl();
    settingsPage.assertLogOut();
  });
});
