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
      .type('Newusername');
    settingsPage.updSettingsBtn
      .click();
    cy.contains('.swal-title', 'Update successful!');

  });

  it('should provide an ability to update bio', () => {
    settingsPage.bioField
      .type('Newuserbio');
    settingsPage.updSettingsBtn
      .click();
    cy.contains('.swal-title', 'Update successful!');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.emailField
      .clear()    
      .type('Newuser@email.com');
    settingsPage.updSettingsBtn
      .click();
    cy.contains('.swal-title', 'Update successful!');
  });

  it('should provide an ability to update password', () => {
    settingsPage.passwordField    
      .type('1newUserPass!');
    settingsPage.updSettingsBtn
      .click();
    cy.contains('.swal-title', 'Update successful!');
  });

  it('should provide an ability to log out', () => {
    
    settingsPage.visit();
    settingsPage.logOutBtn
      .click();
    cy.url().should('eq', 'http://localhost:1667/#/');
  });
});
