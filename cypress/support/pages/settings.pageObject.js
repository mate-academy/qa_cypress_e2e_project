import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get findSettingsLink() {
    return cy.getByDataCy('settings-link');
  }

  clickSettingsLink() {
    this.findSettingsLink.click();
  }

  get findUsernameField() {
    return cy.getByDataCy('settings-username-field');
  }

  updateUsername(username) {
    this.findUsernameField.type(username);
  }

  get findUpdateBtn() {
    return cy.getByDataCy('settings-update-btn');
  }

  clickUpdateBtn() {
    this.findUpdateBtn.click();
  }

  get findBioField() {
    return cy.getByDataCy('settings-bio-field');
  }

  updateBio(bio) {
    this.findBioField.type(bio);
  }

  get findSuccessfulMessage() {
    return cy.get('div.swal-modal');
  }

  updatesWasSuccessful(message) {
    this.findSuccessfulMessage.should('contain.text', message);
  }

  get findEmailField() {
    return cy.getByDataCy('settings-email-field');
  }

  updateEmail(email) {
    this.findEmailField.type(email);
  }

  get findPasswordField() {
    return cy.getByDataCy('settings-password-field');
  }

  updatePassword(password) {
    this.findPasswordField.type(password);
  }

  get findLogoutBtn() {
    return cy.getByDataCy('settings-logout-btn');
  }

  clickLogoutBtn() {
    this.findLogoutBtn.click();
  }
}

export default SettingsPageObject;
