import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get updateSettingsBtn() {
    return cy.getByDataCy('update_settingsBtn');
  }

  get logOutBtn() {
    return cy.getByDataCy('logout_settingsBtn');
  }

  get usernameField() {
    return cy.getByDataCy('username_settings');
  }

  get bioField() {
    return cy.getByDataCy('bio_settings');
  }

  get emailField() {
    return cy.getByDataCy('email_settings');
  }

  get passwordField() {
    return cy.getByDataCy('password_settings');
  }
}

export default SettingsPageObject;