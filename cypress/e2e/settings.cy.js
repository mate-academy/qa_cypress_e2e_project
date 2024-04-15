/// <reference types='cypress' />
/// <reference types='../support' />
const faker = require("faker"); 

import SettingsPageObject from "../support/pages/settings.pageObject";
import SignInPageObject from "../support/pages/signIn.pageObject";

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  before(() => {
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    }).then((user) => {
      cy.login(user.email, user.username, user.password);
    });
    settingsPage.visit();
  });

  it.only('should provide an ability to update username', () => {
    const newUsername = faker.lorem.word(8);
    settingsPage.usernameField.type(`{selectAll}${newUsername}`);
    settingsPage.updateButton.click();
    settingsPage.assertUsernameValue(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.words(15);

    settingsPage.bioField.type(`{selectAll}${newBio}`);
    settingsPage.updateButton.click();
    settingsPage.assertUpdatedUserInfo(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();

    settingsPage.emailField.type(`{selectAll}${newEmail}`);
    settingsPage.updateButton.click();
    settingsPage.visit();
    settingsPage.assertEmailValue(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Qwerty123';

    settingsPage.passwordField.type(newPassword);
    settingsPage.updateButton.click();
    cy.clearCookies().reload();
    signInPage.visit();
    signInPage.login(user.email, newPassword);
    settingsPage.assertUsernameLinkisVisible();
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutButton.click();
    settingsPage.assertTokenIsRemoved();
  });
});
