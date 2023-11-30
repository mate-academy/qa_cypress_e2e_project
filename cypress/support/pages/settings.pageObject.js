import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByDataQa('username-settings');
  }

  get bioField() {
    return cy.getByDataQa('bio-settings');
  }

  get emailField() {
    return cy.getByDataQa('email-settings');
  }

  get passwordField() {
    return cy.getByDataQa('password-settings');
  }

  get updateSettingBtn() {
    return cy.getByDataQa('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout-btn');
  }

  typeNewUsername(newUsername) {
    this.usernameField
      .clear()
      .type(newUsername);
  }

  typeNewBio(newBio) {
    this.bioField
      .clear()
      .type(newBio);
  }

  typeNewEmail(newEmail) {
    this.emailField
      .clear()
      .type(newEmail);
  }

  typeNewPassword(newPassword) {
    this.passwordField
      .type(newPassword);
  }

  clickOnUpdateSettingBtn() {
    this.updateSettingBtn
      .click();
  }

  allertSuccessfulUpdate() {
    this.allertMessage('Update successful!');
  }

  assertUpdatedUsernameField(newUsername) {
    this.usernameField
      .should('have.value', newUsername);
  }

  assertUpdatedBioField(newBio) {
    this.bioField
      .should('have.value', newBio);
  }

  assertUpdatedEmailField(newEmail) {
    this.emailField
      .should('have.value', newEmail);
  }

  clickOnLogoutBtn () {
    this.logoutBtn
      .click();
  }
}

export default SettingsPageObject;
