import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get profilePictureField() {
    return cy.get('[data-qa="profile-picture-input"]');
  }

  get usernameField() {
    return cy.get('[data-qa="username-input"]');
  }

  get bioField() {
    return cy.get('[data-qa="bio-input"]');
  }

  get emailField() {
    return cy.get('[data-qa="email-input"]');
  }

  get passwordField() {
    return cy.get('[data-qa="password-input"]');
  }

  get updateSettingsBtn() {
    return cy.get('[data-qa="update-settings-btn"]');
  }

  get logoutBtn() {
    return cy.get('[data-qa="logout-btn"]');
  }

  updateUsername(newUsername) {
    this.usernameField.clear().type(newUsername);
  }

  updateBio(newBio) {
    this.bioField.clear().type(newBio);
  }

  updateEmail(newEmail) {
    this.emailField.clear().type(newEmail);
  }

  updatePassword(newPassword) {
    this.passwordField.clear().type(newPassword);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickEditProfileSettingsBtn() {
    cy.getByDataQa('edit-profile-settings-btn').click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  waitForSuccessMessage() {
    cy.getByDataQa('success-alert').should('be.visible');
  }
}

export default SettingsPageObject;
