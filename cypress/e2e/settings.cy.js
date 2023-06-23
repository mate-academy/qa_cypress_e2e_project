/// <reference types="cypress" />
/// <reference types="../support" />

import HomePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const homePage = new HomePageObject();
const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();
let user;
const updateMessage = 'Update successful!';
const newUsername = 'New Username';
const newBio = 'Something about user';
const newEmail = '12345678@gmail.qa';
const newPassword = 'New Password';

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then(generatedUser => {
      user = generatedUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.usernameField.type(`{selectAll}${newUsername}`);
    homePage.clickOnBtn('update-btn');
    settingsPage.assertSuccessfulUpdate(updateMessage);
    settingsPage.clickOnModalOk();
    settingsPage.assertUpdatedUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.userbioField.type(`{selectAll}${newBio}`);
    homePage.clickOnBtn('update-btn');
    settingsPage.assertSuccessfulUpdate(updateMessage);
    settingsPage.clickOnModalOk();
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.useremailField.type(`{selectAll}${newEmail}`);
    homePage.clickOnBtn('update-btn');
    settingsPage.assertSuccessfulUpdate(updateMessage);
    settingsPage.clickOnModalOk();

    cy.clearCookies();

    signInPage.visit();
    signInPage.emailField.type(newEmail);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.userpasswordField.type(newPassword);
    homePage.clickOnBtn('update-btn');
    settingsPage.clickOnModalOk();

    cy.clearCookies();

    signInPage.visit();
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(newPassword);
    signInPage.signInBtn.click();
    signInPage.assertFailedSignIn();
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    homePage.clickOnBtn('logout-btn');
    settingsPage.assertSuccessfulLogOut();
  });
});
