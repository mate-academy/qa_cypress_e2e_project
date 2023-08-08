/// <reference types='cypress' />
/// <reference types='../support' />

import SettingsPageObject from '../support/pages/settings.pageObject';
import HomePageObject from '../support/pages/home.pageObject';

const settingsPage = new SettingsPageObject();
const homePage = new HomePageObject();

describe('Settings page', () => {
  let user;
  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.usernameField
      .type(`{selectAll}${user.newUsername}`);
    settingsPage.updateSettingsBtn
      .click();
    homePage.modalWindow
      .should('contain', 'Update successful!');
    homePage.usernameLink
      .should('contain', user.newUsername);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.bioField
      .type(user.bio);
    settingsPage.updateSettingsBtn
      .click();
    homePage.modalWindow
      .should('contain', 'Update successful!');
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.emailField
      .type(`{selectAll}${user.newEmail}`);
    settingsPage.updateSettingsBtn
      .click();
    homePage.modalWindow
      .should('contain', 'Update successful!');
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.passwordField
      .type(`{selectAll}${user.newPassword}`);
    settingsPage.updateSettingsBtn
      .click();
    homePage.modalWindow
      .should('contain', 'Update successful!');
  });

  it('should provide an ability to log out', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.logOutBtn
      .click();
    homePage.navbar
      .should('contain', 'Sign in')
      .and('contain', 'Sign up');
  });
});
