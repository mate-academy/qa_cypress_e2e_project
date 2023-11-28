/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import homePageObject from '../support/pages/home.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';
const faker = require("faker");

const signInPage = new SignInPageObject();
const homePage = new homePageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  
  beforeEach(() => {
    cy.task('db:clear')
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    cy.login(user.email, user.username, user.password);
      settingsPage.visit();
    });
  });

  it('should provide an ability to update username', () => {
    const newUsername = faker.name.firstName().toLowerCase();
    settingsPage.fillUsernameField(newUsername);
    settingsPage.clickUpdateBtn();
    homePage.assertUsernameLink(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = faker.lorem.words();
    settingsPage.fillBioField(newBio);
    settingsPage.clickUpdateBtn();
    settingsPage.assertUpdatedBio(newBio);
  });

  it('should provide an ability to update an email', () => {
    const newEmail = faker.internet.email().toLowerCase();
    settingsPage.fillEmailField(newEmail);
    settingsPage.clickUpdateBtn();
    settingsPage.visit();
    settingsPage.assertEmailField(newEmail);
  });

  it('should provide an ability to update password', () => {
    const newPassword = 'Qwer1234@'

    settingsPage.fillPasswordField(newPassword);
    settingsPage.clickUpdateBtn();
   
    
    cy.clearCookies();

    signInPage.visit();
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(newPassword);
    signInPage.signInBtn.click();

    homePage.assertUsernameLink(user.username)
  });

  it('should provide an ability to log out', () => {
    settingsPage.clickLogoutBtn();
    homePage.assertUserIsNotLoggedIn();
  });
});
