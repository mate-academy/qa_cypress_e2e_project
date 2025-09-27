import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('updateSettingsBtn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  logout() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
