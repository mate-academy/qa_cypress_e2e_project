import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get bioField() {
    return cy.getByDataCy('bio-input');
  }

  get usernameField() {
    return cy.getByDataCy('username-input');
  }

  get emailField() {
    return cy.getByDataCy('email-input');
  }

  get passwordField() {
    return cy.getByDataCy('password-input');
  }

  get updateBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  get successMessage() {
    return cy.get('.swal-title');
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clearUsername() {
    this.usernameField.clear();
  }

  clearEmail() {
    this.emailField.clear();
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertBioValue(bio) {
    this.bioField.should('have.value', bio);
  }

  assertEmailValue(email) {
    this.emailField.should('have.value', email);
  }

  assertUsernameValue(message) {
    this.successMessage.should('contain', message);
  }
}

export default SettingsPageObject;
