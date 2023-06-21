import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('username-settings');
  }

  updateUsernameField(username) {
    this.usernameField.clear().type(username);
  }

  get bioField() {
    return cy.getByDataQa('bio-settings');
  }

  updateBioField(bio) {
    this.bioField.clear().type(bio);
  }

  assertBio(bio) {
    this.bioField.should('contain', bio);
  }

  get emailField() {
    return cy.getByDataQa('email-settings');
  }

  updateEmailField(email) {
    this.emailField.clear().type(email);
  }

  get passwordField() {
    return cy.getByDataQa('password-settings');
  }

  updatePasswordField(password) {
    this.passwordField.clear().type(password);
  }

  get updateSetBtn() {
    return cy.getByDataQa('update-settings-btn');
  }

  clickUpdateSetBtn() {
    this.updateSetBtn.click();
  }

  get logOutBtn() {
    return cy.getByDataQa('log-out-btn');
  }

  clickLogOutBtn() {
    this.logOutBtn.click();
  }

  get successfulUpdate() {
    return cy.get('.swal-modal');
  }

  get successModalOkBtn() {
    return cy.contains('.swal-button', 'OK');
  }

  assertSuccessfulUpdate(message) {
    this.successfulUpdate.should('contain', message);
  }

  clickOnModalOkBtn() {
    this.successModalOkBtn.click();
  }
}

export default SettingsPageObject;
