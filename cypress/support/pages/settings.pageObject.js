import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.findByPlaceholder('Your username');
  }

  typeUserName(username) {
    this.userNameField.clear()
      .type(username);
  }

  get bioField() {
    return cy.findByPlaceholder('Short bio about you');
  }

  typeBio(bio) {
    this.bioField.clear()
      .type(bio);
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  typeEmail(email) {
    this.emailField.clear()
      .type(email);
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  typePassword(password) {
    this.passwordField.clear()
      .type(password);
  }

  get updateBtn() {
    return cy.contains('.btn', 'Update Settings');
  }

  clickUpdateBtn() {
    this.updateBtn
      .click();
  }

  get logoutBtn() {
    return cy.contains('.btn', 'Or click here to logout.');
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }
}

export default SettingsPageObject;
