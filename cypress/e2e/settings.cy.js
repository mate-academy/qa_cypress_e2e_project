/// <reference types='cypress' />

import faker from 'faker';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const homePage = new HomePageObject();
const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName() + faker.random.number();

    settingsPage.typeSettingsUsernameField(newUsername);
    settingsPage.clickSettingsUpdateButton();
    settingsPage.assertSettingsSuccessMessage('Update successful!');
    settingsPage.clickSettingsSwalButton();
    settingsPage.clickSettingsLogoutButton();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.random.words();

    settingsPage.typeSettingsBioField(newBio);
    settingsPage.clickSettingsUpdateButton();
    settingsPage.assertSettingsSuccessMessage('Update successful!');
    settingsPage.clickSettingsSwalButton();
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email();

    settingsPage.typeSettingsEmailField(newEmail);
    settingsPage.clickSettingsUpdateButton();
    settingsPage.assertSettingsSuccessMessage('Update successful!');
    settingsPage.clickSettingsSwalButton();
    settingsPage.clickSettingsLogoutButton();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(newEmail);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
  });

  it('should provide an ability to update password', () => {
    const newPassword = faker.name.firstName() + faker.random.number();

    settingsPage.typeSettingsPasswordField(newPassword);
    settingsPage.clickSettingsUpdateButton();
    settingsPage.assertSettingsSuccessMessage('Update successful!');
    settingsPage.clickSettingsSwalButton();

    cy.clearCookies();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    const header = 'Sign up';

    settingsPage.clickSettingsLogoutButton();
    settingsPage.asertLogout(header);
  });
});
