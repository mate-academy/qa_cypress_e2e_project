/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';

const settingsPage = new SettingsPageObject();
const signInPage = new SignInPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((res) => {
      user = res;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.register(user.email, user.username, user.password);

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = `NewUser_${Date.now()}`;
    settingsPage.usernameField.clear().type(newUsername);
    settingsPage.updateBtn.click();

    cy.get('[data-cy="username-link"]').should('contain', newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'Updated';
    settingsPage.bioField.clear().type(newBio);
    settingsPage.updateBtn.click();
    settingsPage.bioField.should('have.value', newBio);
  });

  it('should provide an ability to update email', () => {
    const newEmail = `updated_${user.email}`;
    settingsPage.emailField.clear().type(newEmail);
    settingsPage.updateBtn.click();
    settingsPage.emailField.should('have.value', newEmail);
  });

  it('should provide an ability to update password and login it works', () => {
    const newPassword = 'updatedPassword123';

    settingsPage.passwordField.type(newPassword);
    settingsPage.updateBtn.click();
    settingsPage.logoutBtn.click();
    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPassword);
    signInPage.clickSignInBtn();
    cy.get('[data-cy="username-link"]').should('contain', user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logoutBtn.click();
    cy.get('.navbar').should('contain', 'Sign in');
    cy.url().should('eq', Cypress.config().baseUrl + '#/');
  });
});
