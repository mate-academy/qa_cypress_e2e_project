/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPageObject from '../support/pages/settings.pageObject';

const settingsPage = new SettingsPageObject();

describe('Settings page', () => {
  let user;

  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.visit('/');
    cy.register();
    cy.login();
    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    settingsPage.typeUsername(user.username);
    settingsPage.submitForm();
    settingsPage.assertProfilePage(user.username);
  });

  it('should provide an ability to update bio', () => {
    settingsPage.typeBio(user.bio);
    settingsPage.submitForm();
    settingsPage.assertProfilePage();
  });

  it('should provide an ability to update an email', () => {
    settingsPage.typeEmail(user.email);
    settingsPage.submitForm();
    settingsPage.assertProfilePage();
  });

  it('should provide an ability to update password', () => {
    settingsPage.typePassword(user.password);
    settingsPage.submitForm();
    settingsPage.assertProfilePage();
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();
    cy.url().should('include', '/');
  });
});
