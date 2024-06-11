import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('username-field-settings');
  }

  get bioField() {
    return cy.getByDataQa('bio-field-settings');
  }

  get emailField() {
    return cy.getByDataQa('email-field-settings');
  }

  get passwordField() {
    return cy.getByDataQa('password-field-settings');
  }

  typeNewUsername(username) {
    this.usernameField
      .type(username);
  }

  typeNewBio(bio) {
    this.bioField
      .type(bio);
  }

  typeNewEmail(email) {
    this.emailField
      .type(email);
  }

  assertEmailIsChanged(newEmail) {
    this.emailField
      .should('contain', newEmail);
  }

  typeNewPassword(password) {
    this.passwordField
      .type(password);
  }

  updateSettingsBtn() {
    cy.getByDataQa('update-settings-btn')
      .click();
  }

  logoutBtn() {
    cy.getByDataQa('logout-btn')
      .click();
  }
};

export default SettingsPageObject;
