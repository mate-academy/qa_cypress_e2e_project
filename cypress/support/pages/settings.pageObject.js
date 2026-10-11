import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('settings-username');
  }

  get bioField() {
    return cy.getByDataQa('settings-bio');
  }

  get emailField() {
    return cy.getByDataQa('settings-email');
  }

  get passwordField() {
    return cy.getByDataQa('settings-password');
  }

  get updateButton() {
    return cy.getByDataQa('settings-update');
  }

  get logoutButton() {
    return cy.getByDataQa('settings-logout');
  }

  visit() {
    super.visit(this.url);
  }
}

export default SettingsPageObject;
