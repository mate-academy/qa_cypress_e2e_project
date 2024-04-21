import PageObject from '../PageObject';
class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameFieldSettings() {
    return cy.getByDataCy('username-field-settings')
  }

  get bioFieldSettings() {
    return cy.getByDataCy('bio-field-settings')
  }

  get emailFieldSettings() {
    return cy.getByDataCy('email-field-settings')
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn')
  }

  get userNameLink() {
    return cy.getByDataCy('username-link')
  }

  get profileInfoBanner() {
    return cy.getByDataCy('profile-info')
  }

  get settingsLink() {
    return cy.getByDataCy('settingsLink')
  }

  get passwordSettingsField() {
    return cy.getByDataCy('password-field-settings')
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn')
  }

  updateUsername(newUsername) {
    this.usernameFieldSettings.clear();
    this.usernameFieldSettings.type(newUsername);
  }

  updateBio(newBio) {
    this.bioFieldSettings.clear();
    this.bioFieldSettings.type(newBio)
  }

  updateEmail(newEmail) {
    this.emailFieldSettings.clear();
    this.emailFieldSettings.type(newEmail)
  }

  updatePassword(newPassword){
    this.passwordSettingsField.clear();
    this.passwordSettingsField.type(newPassword)
  }

  clickOnUpdateBtn() {
    this.updateSettingsBtn.click();
  }

  assertUpdatedUsername(newUsername) {
    this.userNameLink.should('contain', newUsername)
  }

  assertUpdatedBio(newBio) {
    this.profileInfoBanner.should('contain', newBio)
  }

  clickOnUsernameLink() {
    this.userNameLink.click()
  }

  clickOnSettingsLink() {
    this.settingsLink.click()
  }

  assertUpdatedEmail(newEmail) {
    this.emailFieldSettings.should('contain', newEmail)
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click()
  }

  closeTheSwalModal() {
    cy.get('.swal-button').click()
  }

  assertLogOut() {
    cy.url.should('include', '/#/')
  }

}

export default SettingsPageObject;