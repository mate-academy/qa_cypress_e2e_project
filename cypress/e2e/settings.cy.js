/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import userPageObject from '../support/pages/user.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();
const userPage = new userPageObject();
const signInPage = new SignInPageObject();

const testData = {
  newUsername: 'edited_username',
  newBio:'edited_bio',
  newEmail: 'edited_email@qa.team',
  newPassword: 'Edited_password1!'
}

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.wait(500);
    cy.login(user.email, user.username, user.password);
    cy.wait(500);
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.editUsernameInput.clear().type(testData.newUsername);
    settingsPage.updateBtn.click();
    settingsPage.assertEditing('Update successful!');
    homePage.usernameLink.should('contain', testData.newUsername);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.editBioInput.clear().type(testData.newBio);
    settingsPage.updateBtn.click();
    cy.wait(100);
    settingsPage.assertEditing('Update successful!');
    cy.wait(1000);
    userPage.visitUserPage(user.username);
    cy.wait(500);
    userPage.profileBio.should('contain', testData.newBio);
  });

  it.skip('should provide an ability to update an email', () => {
    settingsPage.editEmailInput.clear().type(testData.newEmail);
    settingsPage.updateBtn.click();
    settingsPage.assertEditing('Update successful!');
    cy.get('.swal-button').should('contain', 'OK').click();

    settingsPage.logoutBtn.click();
    signInPage.visit();
    signInPage.emailField.type(testData.newEmail);
    signInPage.passwordField.type(user.password);
    signInPage.signInBtn.click();
    cy.wait(500);

    homePage.usernameLink.should('contain', user.username);
  });

  it('should provide an ability to update password', () => {
    settingsPage.editPasswordInput.clear().type(testData.newPassword);
    settingsPage.updateBtn.click();
    settingsPage.assertEditing('Update successful!');
    cy.get('.swal-button').should('contain', 'OK').click();

    settingsPage.visit();
    settingsPage.logoutBtn.click();
    signInPage.visit();
    signInPage.emailField.type(user.email);
    signInPage.passwordField.type(testData.newPassword);
    signInPage.signInBtn.click();
    cy.wait(500);
    homePage.usernameLink.should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn.click();
    homePage.navBar.should('contain', 'Sign in');
  });
});
