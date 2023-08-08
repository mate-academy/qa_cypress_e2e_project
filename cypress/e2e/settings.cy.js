import HomePageObject from '../support/pages/home.pageObject.js';
import SignInPageObject from '../support/pages/signIn.pageObject.js';
import SettingsPageObject from '../support/pages/settings.pageObject.js';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

let user;
const testMail = 'test@gmail.com';
const testPassword = 'A123123aaA!';

/// <reference types='cypress' />
/// <reference types='../support' />

describe('Sign Up page', () => {
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    homePage.visit(`#/`);
  });

  it('should provide an ability to update username', () => {
    signInPage.registerAndLogin(user.email, user.username, user.password);
    homePage.visit(`#/settings`);
    settingsPage.userNamePlusText('TestData');
    settingsPage.clickUpdateSettings();
    settingsPage.assertErrorMassageTitle('Update successful!');
    settingsPage.clickOk();
    homePage.userPageOpen();
    settingsPage.assertUserName(user.username + 'TestData');
  });

  it('should provide an ability to update bio', () => {
    signInPage.registerAndLogin(user.email, user.username, user.password);
    homePage.visit(`#/settings`);
    settingsPage.bioPlusText('TestData');
    settingsPage.clickUpdateSettings();
    settingsPage.assertErrorMassageTitle('Update successful!');
    settingsPage.clickOk();
    homePage.userPageOpen();
    settingsPage.assertBio('TestData');
  });

  it('should provide an ability to update an email', () => {
    signInPage.registerAndLogin(user.email, user.username, user.password);
    homePage.visit(`#/settings`);
    settingsPage.emailForTest(testMail);
    settingsPage.clickUpdateSettings();
    settingsPage.assertErrorMassageTitle('Update successful!');
    settingsPage.clickOk();
    settingsPage.loggoutButtonclick();
    homePage.visit(`#/login`);
    signInPage.signInForTests(testMail, user.password);
    signInPage.assertAfterLoginByUsername(user.username);
  });

  it('should provide an ability to update password', () => {
    signInPage.registerAndLogin(user.email, user.username, user.password);
    homePage.visit(`#/settings`);
    settingsPage.passwordForTest(testPassword);
    settingsPage.clickUpdateSettings();
    settingsPage.assertErrorMassageTitle('Update successful!');
    settingsPage.clickOk();
    settingsPage.loggoutButtonclick();
    homePage.visit(`#/login`);
    signInPage.signInForTests(user.email, testPassword);
    signInPage.assertAfterLoginByUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    signInPage.registerAndLogin(user.email, user.username, user.password);
    homePage.visit(`#/settings`);
    settingsPage.loggoutButtonclick();
    settingsPage.assertSignInLink();
    settingsPage.assertSignUpLink();
  });
});
