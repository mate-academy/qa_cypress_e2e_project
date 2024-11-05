/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';

describe('Settings page', () => {
  const settingsPage = new SettingsPageObject();

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
    cy.task('db:clear');
  });
  it('should provide an ability to update username', () => {
    settingsPage.visit();
    settingsPage.updateUsername('NewUsername');

    cy.contains('NewUsername').should('be.visible');
  });

  it('should provide an ability to update bio', () => {
    settingsPage.visit();
    settingsPage.updateBio('This is my updated bio');

    cy.contains('This is my updated bio').should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    settingsPage.visit();
    settingsPage.updateEmail('newemail@example.com');

    cy.contains('Your email has been updated').should('be.visible');
  });

  it('should provide an ability to update password', () => {
    settingsPage.visit();
    settingsPage.updatePassword('NewSecurePassword123!');

    cy.contains('Your password has been updated').should('be.visible');
  });

  it('should provide an ability to log out', () => {
    settingsPage.logOut();

    cy.contains('Sign In').should('be.visible');
  });
  });
});

