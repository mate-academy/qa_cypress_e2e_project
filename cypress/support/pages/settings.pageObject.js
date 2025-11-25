import PageObject from './PageObject';

class SettingsPageObject extends PageObject {
  get usernameField() {
    return cy.getByDataQa('username-field');
  }

  get emailField() {
    return cy.getByDataQa('email-field');
  }

  get bioField() {
    return cy.getByDataQa('bio-field');
  }

  get currentPasswordField() {
    return cy.getByDataQa('current-password-field');
  }

  get newPasswordField() {
    return cy.getByDataQa('new-password-field');
  }

  get updateSettingsButton() {
    return cy.getByDataQa('update-settings-button');
  }

  get logoutButton() {
    return cy.getByDataQa('logout-button');
  }

  get successMessage() {
    return cy.getByDataQa('success-message');
  }

  get userHeader() {
    return cy.getByDataQa('user-header');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
    return this;
  }

  typeCurrentPassword(password) {
    this.currentPasswordField.type(password);
    return this;
  }

  typeNewPassword(password) {
    this.newPasswordField.type(password);
    return this;
  }

  clickUpdateSettings() {
    this.updateSettingsButton.click();
    return this;
  }

  clickLogout() {
    this.logoutButton.click();
    return this;
  }

  visit() {
    cy.visit('/settings');
    return this;
  }
}

export default SettingsPageObject;
