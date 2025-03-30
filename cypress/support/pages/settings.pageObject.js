import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

  get settingsUsernameField() {
    return cy.getByDataQa('settings-username');
  }

  get settingsBioField() {
    return cy.getByDataQa('settings-bio');
  }

  get settingsEmailField() {
    return cy.getByDataQa('settings-email');
  }

  get settingsPasswordField() {
    return cy.getByDataQa('settings-password');
  }

  get settingsUpdateButton() {
    return cy.getByDataQa('settings-update-button');
  }

  get settingsSuccessMessage() {
    return cy.get('.swal-modal');
  }

  get settingsSwalButton() {
    return cy.get('.swal-button');
  }

  get settingsLogoutButton() {
    return cy.getByDataQa('settings-logout-button');
  }

  get logOutAssert() {
    return cy.getByDataQa('header-sign-up');
  }

  typeSettingsUsernameField(username) {
    this.settingsUsernameField
      .clear()
      .type(username);
  }

  typeSettingsBioField(bio) {
    this.settingsBioField
      .clear()
      .type(bio);
  }

  typeSettingsEmailField(email) {
    this.settingsEmailField
      .clear()
      .type(email);
  }

  typeSettingsPasswordField(password) {
    this.settingsPasswordField
      .clear()
      .type(password);
  }

  clickSettingsUpdateButton() {
    this.settingsUpdateButton
      .click();
  }

  assertSettingsSuccessMessage(message) {
    this.settingsSuccessMessage
      .should('contain', message);
  }

  clickSettingsSwalButton() {
    this.settingsSwalButton
      .click();
  }

  clickSettingsLogoutButton() {
    this.settingsLogoutButton
      .click();
  }

  asertLogout(text) {
    this.logOutAssert
      .should('contain', text);
  }
}

export default SettingsPageObject;
