import PageObject from '../PageObject';
const newPassword = 'qWerrt12';
export class SettingsPageObject extends PageObject {
  url = 'http://localhost:1667/#/settings';

  get usernameField() {
    return cy.getByDataQa('username');
  }

  typeUsernameField(newUsername) {
    this.usernameField.clear().type(newUsername);
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('update');
  }

  get emailField() {
    return cy.getByDataQa('email');
  }

  fillEmailField(newEmail) {
    this.emailField.clear().type(newEmail);
  }

  assertUpdateEmail(newEmail) {
    this.emailField.should('have.value', newEmail);
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  typeNewPassword(newPassword) {
    this.passwordField.type(newPassword);
  }

  get bioField() {
    return cy.getByDataQa('bio');
  }

  fillBioField(bio) {
    this.bioField.clear().type(bio);
  }

  assertUpdatedBio(bio) {
    this.bioField.should('have.value', bio);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  fillUsernameField(username) {
    this.usernameField.clear().type(username.newUsername);
  }

  fillPasswordField(password) {
    this.passwordField.clear().type(newPassword);
  }

  assertUpdatedUsername(username) {
    this.usernameField.should('have.value', username);
  }

  assertUpdatedEmail(newEmail) {
    this.emailField.should('include.text', newEmail);
  }

  get modal() {
    return cy.get('.swal-title');
  }

  assertModal() {
    this.modal.should('be.visible');
    this.modal.should('have.text', 'Update successful!');
  }

  clickOnModal() {
    this.modal.click();
  }

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertNewUsername(newUsername) {
    cy.getByDataCy('username-link').should('include.text', newUsername);
  }

  get confirmUpdateButton() {
    return cy.get('.swal-button--confirm');
  }

  clickOnConfirmUpdateButton() {
    this.confirmUpdateButton.click();
  }

  assertUrlChanged() {
    cy.url().should('eq', 'http://localhost:1667/#/');
  }

  get logOutButton() {
    return cy.getByDataQa('logout');
  }

  clickOnLogoutButton() {
    this.logOutButton.click();
  }

  assertLogout() {
    cy.getCookie('Cookies').should('be.null');
  }
}

export default SettingsPageObject;
