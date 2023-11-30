import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
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
    cy.getByDataCy('update-settings-btn')
      .click();
  }

  assertNewEmail(newEmail) {
    this.emailField.should('contain', newEmail);
  }

  clickLogOutBtn() {
    cy.getByDataCy('log-out-btn').click();
  }

  assertSuccessfulUpdateModal() {
    cy.contains('.swal-modal', 'Update successful!')
      .should('be.visible');
  }
}

export default SettingsPageObject;