import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get updateSettingsBtn() {
    return cy.getByDataCy('update/settingsBtn');
  }

  get logOutBtn() {
    return cy.getByDataCy('logout/settingsBtn');
  }

  get usernameField() {
    return cy.getByDataCy('username/settings');
  }

  get bioField() {
    return cy.getByDataCy('bio/settings');
  }

  get emailField() {
    return cy.getByDataCy('email/settings');
  }

  get passwordField() {
    return cy.getByDataCy('password/settings');
  }
}

export default SettingsPageObject;