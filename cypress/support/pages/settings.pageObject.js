import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('username-settings');
  }

  get passwordField() {
    return cy.getByDataQa('password-settings');
  }

  get bioField() {
    return cy.getByDataQa('bio-settings');
  }

  get emailField() {
    return cy.getByDataQa('email-settings');
  }

  fillUsernameField(newUsername) {
    this.usernameField.clear().type(newUsername);
  }

  fillPasswordField(newPassword) {
    this.passwordField.clear().type(newPassword);
  }

  fillBioField(newBio) {
    this.bioField.type(newBio);
  }

  fillEmailField(newEmail) {
    this.emailField.clear().type(newEmail);
  }

  clickUpdateBtn() {
    cy.getByDataQa('update-settings-btn')
      .click();
  }

  assertNewEmail(newEmail) {
    this.emailField.should('contain', newEmail);
  }

  clickLogOutBtn() {
    cy.getByDataQa('log-out-btn').click();
  }

  assertSuccessfulUpdateModal() {
    cy.contains('.swal-modal', 'Update successful!')
      .should('be.visible');
  }
}

export default SettingsPageObject;
