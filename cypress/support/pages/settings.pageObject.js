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
    return cy.getByDataCy('logout-button');
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
    this.bioField.type('{selectAll}' + bio);
  }

  fillEmailField(email) {
    this.emailField.type('{selectAll}' + email + '{enter}');
  }

  fillPasswordField(password) {
    this.passwordField.type('{selectAll}' + password + '{enter}');
  }

  clickUpdateButton() {
    this.updateButton.click({ force: true });
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

  assertTheEmailField(email) {
    this.emailField.should('have.value', email);
  }
};

export default SettingsPageObject;
