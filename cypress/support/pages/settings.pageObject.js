import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get bioField() {
    return cy.getByDataCy('bio-update-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get usernameField() {
    return cy.getByDataCy('username-update-field');
  }

  get emailField() {
    return cy.getByDataCy('email-update-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  fillBioField(bio) {
    this.bioField.clear().type(bio);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  fillUsernameField(username) {
    this.usernameField.clear().type(username);
  }

  fillEmailField(email) {
    this.emailField.clear().type(email);
  }

  fillPasswordField(password) {
    this.passwordField.clear().type(password);
  }

  assertUpdatedBio(bio) {
    this.bioField.should('have.value', bio);
  }

  assertUpdatedUsername(username) {
    this.usernameField.should('have.value', username);
  }
  
  assertUpdatedEmail(newEmail) {
    this.emailField.should('have.value', newEmail)
  }

  /*assertSuccessfulUpdate(alert) {
    this.settingsPopUp.should('contain', alert);
  }*/

}

export default SettingsPageObject;
