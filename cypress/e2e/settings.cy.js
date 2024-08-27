/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.page-object';
import SignUpPageObject from '../support/pages/signUp.page-object';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const signUpPage = new SignUpPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;
  before(() => {

  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    signUpPage.visit();
  });

  it('should provide an ability to update username', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();

    settingsPage.visit();
    settingsPage.usernameField.clear();
    settingsPage.usernameField.type(user.username1);
    settingsPage.updateBtn.click();
    settingsPage.usernameField.should('have.value', user.username1);
  });

  it('should provide an ability to update bio', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();

    settingsPage.visit();
    settingsPage.bioField.type(user.bio);
    settingsPage.updateBtn.click();
    settingsPage.bioField.should('have.value', user.bio);
  });

  it('should provide an ability to update an email', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();

    settingsPage.visit();
    settingsPage.emailField.clear().type(user.email1);
    settingsPage.updateBtn.click();
    settingsPage.emailField.should('have.value', user.email1);
  });

  it('should provide an ability to update password', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();
    settingsPage.visit();

    settingsPage.passwordField.clear().type(user.password1);
    settingsPage.updateBtn.click();
    settingsPage.logoutBtn.click();
    cy.get('.swal-title').should('contain', 'Update successful!');
    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    signUpPage.usernameField.type(user.username);
    signUpPage.emailField.type(user.email);
    signUpPage.passwordField.type(user.password);
    signUpPage.signUpButton.click();
    cy.get('.swal-button').click();
    settingsPage.visit();

    settingsPage.logoutBtn.click();
    cy.get('.nav-link').should('contain', 'Sign in');
  });
});
