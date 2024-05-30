import PageObject from '../PageObject';
class SettingsPageObject extends PageObject {
  url = '#/settings';

  get usernameField() {
    return cy.getByDataQa('username-settings-field');
  }

  get bioField() {
    return cy.getByDataQa('bio-field');
  }

  get emailField() {
    return cy.getByDataQa('email-settings-field');
  }

  get passwordField() {
    return cy.getByDataQa('new-password-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('submit-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout-button');
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeBioField(bio) {
    this.bioField.clear().type(bio);
  }

  typeEmailField(email) {
    this.emailField.clear().type(email);
  }

  typePasswordField(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateSettings() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertNewEmail(email) {
    this.emailField.should('contain', email);
  }

  assertSuccessNewData() {
    this.modalWindow.should('contain', 'Update successful!')
      .find('.swal-button').click();
  }
}
export default SettingsPageObject;
