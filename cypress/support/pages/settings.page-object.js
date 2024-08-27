import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = `#/settings`;

  get usernameField() {
    return cy.getByDataCy('username-field-settings');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get bioField() {
    return cy.getByDataCy('bio');
  }

  get emailField() {
    return cy.getByDataCy('email-field-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-field-settings');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }
}
export default SettingsPageObject;