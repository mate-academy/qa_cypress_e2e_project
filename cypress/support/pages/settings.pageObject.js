import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/user/settings';

  get userNameRegisterField() {
    return cy.getByDataQa('username-sign-in');
  }

  get emailRegisterField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordRegisterField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signUpBtn() {
    return cy.getByDataQa('btn-sign-in');
  }

  get userNameField() {
    return cy.getByDataQa('settings-username');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get updateBtn() {
    return cy.getByDataCy('btn-settings');
  }

  typeRegisterUserName(username) {
    this.userNameRegisterField.type(username);
  }

  typeRegisterEmail(email) {
    this.emailRegisterField.type(email);
  }

  typeRegisterPassword(password) {
    this.passwordRegisterField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  typeUserName(username) {
    this.userNameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    cy.get('[data-cy="btn-logout"]').click();
  }
}

export default SettingsPageObject;
