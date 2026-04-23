import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() { return cy.getByDataCy('username-settings'); }
  get bioField() { return cy.getByDataCy('bio-settings'); }
  get emailField() { return cy.getByDataCy('email-settings'); }
  get passwordField() { return cy.getByDataCy('password-settings'); }
  get updateBtn() { return cy.contains('button', 'Update Settings'); }
  get logoutBtn() { return cy.contains('button', 'Or click here to logout'); }
}

export default SettingsPageObject;
