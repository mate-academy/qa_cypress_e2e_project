import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get updateUsernameField() {
    return cy.getByDataQa('update-username-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('update-settings-btn');
  }

  get Message() {
    return cy.get('.swal-title');
  }

  get updateUserBio() {
    return cy.getByDataQa('update-user-bio');
  }

  get successfulAssertBtn() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  get userInfoWindow() {
    return cy.getByDataQa('user-info-window');
  }

  get updateUserEmailField() {
    return cy.getByDataQa('update-user-email');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout-btn');
  }

  get updatePasswordField() {
    return cy.getByDataQa('update-password-field');
  }

  typeNewUsername(username) {
    this.updateUsernameField
      .clear().type(username);
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  assertSuccessfulUpdate() {
    this.Message
      .should('contain', 'Update successful!');
  }

  typeUpdateUserBio(bio) {
    this.updateUserBio
      .clear().type(bio);
  }

  clickOnsuccessfulAssertBtn() {
    this.successfulAssertBtn.click();
  }

  typeNewUseremail(email) {
    this.updateUserEmailField
      .clear().type(email);
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click();
  }

  typeNewPassword(password) {
    this.updatePasswordField
      .clear().type(password);
  }
}

export default SettingsPageObject;
