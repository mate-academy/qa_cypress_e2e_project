import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('username-settings');
  }

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get updateBtn() {
    return cy.getByDataQa('update-settings-btn');
  }

  get successAlert() {
    return cy.get('.swal-modal');
  }

  get successAlertBtn() {
    return cy.contains('.swal-button', 'OK');
  }

  get bioField() {
    return cy.getByDataQa('bio-settings');
  }

  get emailField() {
    return cy.getByDataQa('email-settings');
  }

  get passwordField() {
    return cy.getByDataQa('password-settings');
  }

  get logoutButton() {
    return cy.getByDataQa('logout-btn');
  }

  typeUpdateUsername(username) {
    this.usernameField.clear().type(username);
  }

  clickUpdateSettingsBtn() {
    this.updateBtn.click();
  }

  clickSuccessAlertBtn() {
    this.successAlertBtn.click();
  }

  typeUpdateBio(bio) {
    this.bioField.type(bio);
  }

  typeUpdateEmail(email) {
    this.emailField.clear().type(email);
  }

  typeUpdatePassword(password) {
    this.passwordField.type(password);
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

  assertRegisteredUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertSuccessUpdate() {
    this.successAlert.should('contain', 'Update successful!');
  }

  assertUpdatedUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertEmptyBio() {
    this.bioField.should('be.empty');
  }

  assertRegisterEmail(email) {
    this.emailField
      .should('have.value', email);
  }
}

export default SettingsPageObject;
