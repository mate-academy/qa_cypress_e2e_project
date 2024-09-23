import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/';

  get usernameField() {
    return cy.getByDataQa('settings-user-username-field');
  }

  get bioField() {
    return cy.getByDataQa('settings-user-bio-field');
  }

  get emailField() {
    return cy.getByDataQa('settings-user-email-field');
  }

  get passwordField() {
    return cy.getByDataQa('settings-user-password-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('settings-update-settings-btn');
  }

  clickUpdateBtn() {
    this.updateSettingsBtn.click();
  }

  get logoutBtn() {
    return cy.getByDataQa('settings-log-out-btn');
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
