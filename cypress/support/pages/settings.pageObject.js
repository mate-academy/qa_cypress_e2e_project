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

  get updateSettingsButton() {
    return cy.getByDataCy('update-settings-button');
  }

  get logOutButton() {
    return cy.getByDataCy('log-out-settings-button');
  }

  get modalUpdate() {
    return cy.get('.swal-modal');
  }

  get confirmUpdateButton() {
    return cy.get('.swal-button--confirm');
  }

  typeNewUserName(username) {
    this.userNameField.clear()
      .type(username);
  }

  typeNewBio(bio) {
    this.bioField
      .type(bio);
  }

  typeNewEmail(email) {
    this.emailField.clear()
      .type(email);
  }

  typeNewPassword(password) {
    this.passwordField
      .type(password);
  }

  clickUpdateSettingsButton() {
    this.updateSettingsButton
      .click();
  }

  assertModalUpdate() {
    this.modalUpdate
      .should('be.visible');
  }

  assertModalUpdateSucces() {
    this.modalUpdate
      .should('contain', 'Update successful!');
  }

  clickConfirmUpdateButton() {
    this.confirmUpdateButton
      .click();
  }

  clickLogOutButton() {
    this.logOutButton
      .click();
  }

  assertUserBio(newUserBio) {
    this.bioField
      .should('have.value', newUserBio);
  }

  assertUserNameField(userName) {
    this.userNameField
      .should('have.value', userName);
  }

  assertEmailField(newUserEmail) {
    this.emailField
      .should('have.value', newUserEmail);
  }
}

export default SettingsPageObject;
