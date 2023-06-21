import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get pictureField() {
    return cy.getByDataCy('picture-settings');
  }

  get userNameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get updSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logOutBtn() {
    return cy.getByDataCy('logout-user-settings');
  }
}

export default SettingsPageObject;
