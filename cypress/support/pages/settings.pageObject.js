import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.findByPlaceholder('Your username');
  }

  get bioField() {
    return cy.findByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get updateSettingsBtn() {
    return cy.contains('button', 'Update Settings');
  }

  get logoutBtn() {
    return cy.contains('button', 'Or click here to logout.');
  }

  get updateSettingsAlert() {
    return cy.get('.swal-title');
  }

  clearUsername() {
    this.usernameField.clear();
  }

  clearEmail() {
    this.emailField.clear();
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typeBio(bio) {
    this.bioField
      .type(bio);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn
      .click();
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }

  isSettingsUpdated() {
    this.updateSettingsAlert
      .contains('Update successful!');
  }
}

export default SettingsPageObject;
