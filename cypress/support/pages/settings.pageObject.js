import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('username');
  }

  get bioField() {
    return cy.getByDataCy('bio');
  }

  get emailField() {
    return cy.getByDataCy('email');
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  get updateButton() {
    return cy.getByDataCy('update-btn');
  }

  get logoutButton() {
    return cy.getByDataCy('log-out-button');
  }

  get okButton() {
    return cy.get('.swal-button');
  }

  clickOkButton() {
    this.okButton.click();
  }

  fillUsernameField(name) {
    this.usernameField.clear().type(name);
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

  clickUpdateButton() {
    this.updateButton.click();
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

  assertTheEmailField(email) {
    this.emailField.should('have.value', email);
  }
};

export default SettingsPageObject;
