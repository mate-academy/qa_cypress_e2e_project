import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataCy('username-field-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-textarea-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-field-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-field-settings');
  }

  get updateSettingBtn() {
    return cy.getByDataCy('update-button-settings');
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-button-settings');
  }

  get successMessage() {
    return cy.get('.swal-title');
  }

  get successMessageBtn() {
    return cy.get('[class="swal-button swal-button--confirm"]');
  }

  // commands to fill fields
  fillUsernameField(username) {
    this.usernameField.type(username);
  }

  fillBioField(bio) {
    this.bioField.type(bio);
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  // commands to clear fields
  clearUsernameField() {
    this.usernameField.clear();
  }

  clearBioField() {
    this.bioField.clear();
  }

  clearEmailField() {
    this.emailField.clear();
  }

  // commands to asserts
  assertEmailField(email) {
    this.emailField.should('have.value', email);
  }

  assertContainSuccessMessage() {
    this.successMessage.should('contain', 'Update successful!');
  }

  // commands to click on buttons
  clickOnUpdateSettingsBtn() {
    this.updateSettingBtn.click();
  }

  clickOnLogOutBtn() {
    this.logOutBtn.click();
  }

  clickSuccessMessageBth() {
    this.successMessageBtn.click();
  }
}

export default SettingsPageObject;
