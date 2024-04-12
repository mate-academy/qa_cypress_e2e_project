import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/#/settings/';

  get settingsLink() {
    return cy.getByDataCy('settings-btn');
  }

  get editUsernameField() {
    return cy.getByDataCy('edit-username-field');
  }

  get editEmailField() {
    return cy.getByDataCy('edit-email-field');
  }

  get editBioField() {
    return cy.getByDataCy('edit-bio-field');
  }

  get editPasswordField() {
    return cy.getByDataCy('edit-password-field');
  }

  get updateSettingsButton() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutButton() {
    return cy.getByDataCy('log-out-btn');
  }

  typeUsername(username) {
    this.editUsernameField.clear().type(username);
  }

  typeEmail(email) {
    this.editEmailField.clear().type(email);
  }

  typeBio(bio) {
    this.editBioField.clear().type(bio);
  }

  typePassword(password) {
    this.editPasswordField.clear().type(password);
  }
}

export default SettingsPage;
