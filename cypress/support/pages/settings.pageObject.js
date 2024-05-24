import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameLink() {
    return cy.getByDataQa('username-link');
  }

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
    return cy.getByDataQa('settings-email');
  }

  get passwordField() {
    return cy.getByDataQa('settings-password');
  }

  get bioField() {
    return cy.getByDataQa('settings-bio');
  }

  get updateWindow() {
    return cy.contains('Update successful!');
  }

  get swalBtn() {
    return cy.get('.swal-button');
  }

  assertUserName(username) {
    this.userNameLink.should('contain', username);
  }

  assertNotExistUserName() {
    this.userNameLink.should('not.exist');
  }

  assertAlert() {
    this.updateWindow.should('contain', 'Update successful!');
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

  typeUserName(username) {
    this.userNameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  clickLogoutBtn() {
    cy.getByDataQa('btn-logout').click();
  }

  clickSwalBtn() {
    this.swalBtn.click();
  }
}

export default SettingsPageObject;
