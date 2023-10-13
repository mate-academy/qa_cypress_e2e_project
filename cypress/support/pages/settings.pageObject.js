import PageObject from '../PageObject';
class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get usernameSettingsField() {
    return cy.getByDataCy('username-settings');
  }

  get bioSettingsField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailSettingsField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordSettingsField() {
    return cy.getByDataCy('password-settings');
  }

  get uppdateSettingsButton() {
    return cy.get('.btn').contains('Update Settings');
  }

  get uppdateWondow() {
    return cy.get('.swal-title').contains('Update successful!');
  }

  get logoutButton() {
    return cy.get('.btn').contains('Or click here to logout.');
  }

  typeUsernameSettings(usernameSettings) {
    this.usernameSettingsField.type(usernameSettings);
  }

  typeBioSettings(bioSettings) {
    this.bioSettingsField.type(bioSettings);
  }

  typeEmailSettings(emailSettings) {
    this.emailSettingsField.type(emailSettings);
  }

  typePasswordSettings(passwordSettings) {
    this.passwordSettingsField.type(passwordSettings);
  }

  ClickUppdateSettings() {
    this.uppdateSettingsButton.click();
  }

  ClickLogout() {
    this.logoutButton.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertHeaderNoContainUsername(username) {
    this.usernameLink.should('not.contain', username);
  }
}

export default SettingsPageObject;
