import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  pressUpdateBtn() {
    this.updateBtn.click();
  }

  pressLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
