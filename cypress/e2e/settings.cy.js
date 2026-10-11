/// <reference types="cypress" />

import SignInPageObject from '../support/pages/signIn.pageObject';
import SettingsPageObject from '../support/pages/settings.pageObject';

const signInPage = new SignInPageObject();
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
      cy.register(user.email, user.username, user.password);
    });

    cy.then(() => {
      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();

      settingsPage.visit();
    });
  });

  it('should update username', () => {
    const updatedUsername = `${user.username}Updated`;

    settingsPage.usernameField.clear().type(updatedUsername);
    settingsPage.updateButton.click();

    cy.getByDataQa('username-link')
      .should('contain', updatedUsername);
  });

  it('should update bio', () => {
    const bio = 'Cypress test profile bio';

    settingsPage.bioField.clear().type(bio);
    settingsPage.updateButton.click();

    cy.contains('Update successful!').should('be.visible');
  });

  it('should update email', () => {
    const email = `updated${Date.now()}@mail.com`;

    settingsPage.emailField.clear().type(email);
    settingsPage.updateButton.click();

    cy.contains('Update successful!').should('be.visible');
  });

  it('should update password', () => {
    settingsPage.passwordField.type('NewPassword123!');
    settingsPage.updateButton.click();

    cy.contains('Update successful!').should('be.visible');
  });

  it('should log out', () => {
    settingsPage.logoutButton.click();

    cy.getByDataQa('username-link').should('not.exist');
    cy.contains('Sign in').should('be.visible');
  });
});
