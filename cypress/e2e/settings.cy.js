/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from "../support/pages/settings.pageObject";

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;
  
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.username, user.password);
    settingsPage.visit();  
    });
  });

  it('should provide an ability to update username', () => {
    settingsPage.userNameField
      .clear()
      .type(user.username);
    settingsPage.updSettingsBtn
      .click();
    cy.contains('.swal-title', 'Update successful!');

  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField
      .type(user.bio);
    settingsPage.updSettingsBtn
      .click();
    cy.contains('.swal-title', 'Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField
      .clear()    
      .type(user.email);
    settingsPage.updSettingsBtn
      .click();
    cy.contains('.swal-title', 'Update successful!');
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField    
      .type(user.password);
    settingsPage.updSettingsBtn
      .click();
    cy.contains('.swal-title', 'Update successful!');
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOutBtn
      .click();
    cy.url().should('eq', 'http://localhost:1667/#/');
  });
});
