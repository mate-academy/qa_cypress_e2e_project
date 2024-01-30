/// <reference types='cypress' />
/// <reference types="../support" />
import { SettingsPageObject } from '../support/pages/settings.pageObject';

describe('Settings page', () => {
  const settingsPage = new SettingsPageObject();
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should provide an ability to update username', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.usernameField
      .clear();
    settingsPage.usernameField
      .type(user.usernameNew);
    settingsPage.updateSettingsButton.click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Update successful!');
    });
    cy.get('[data-qa="username-link"]').should('contain', user.usernameNew);
  });

  it('should provide an ability to update bio', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.bioField
      .type('newBio');
    settingsPage.updateSettingsButton.click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Update successful!');
    });
    settingsPage.bioField.should('have.value', 'newBio');
  });

  it('should provide an ability to update an email', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.emailField
      .clear();
    settingsPage.emailField.type(user.newEmail);
    settingsPage.updateSettingsButton.click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Update successful!');
    });
    settingsPage.emailField.should('have.value', user.newEmail);
  });

  it('should provide an ability to update password', () => {
    cy.register(user.email, user.username, user.password);
    cy.login(user.email, user.password);
    settingsPage.visit();
    settingsPage.passwordField
      .clear();
    settingsPage.passwordField
      .type(user.passwordNew);
    settingsPage.updateSettingsButton.click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Update successful!');
    });
    settingsPage.logoutButton.click();
  });
});
