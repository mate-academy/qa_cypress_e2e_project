import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

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

  get updateSettingsBtn() {
    return cy.getByDataCy('btn-settings');
  }

  get settingsPageLink() {
    return cy.getByDataCy('settings-page-link');
  }

  get settingsLogOutBtn() {
    return cy.getByDataCy('settings-log-out-btn');
  }

  typeUserName(username) {
    this.userNameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  openSettingsPage() {
    this.settingsPageLink.click();
  }

  clickLogOutSettingsBtn() {
    this.settingsLogOutBtn.click();
  }

  getSuccessfulNotification() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
    cy.get('.swal-button').should('contain', 'OK').click();
  }
}

export default SettingsPageObject;
