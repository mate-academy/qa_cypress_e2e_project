import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.getByDataQa('username-field');
  }

  get bioField() {
    return cy.getByDataQa('bio-field');
  }

  get emailField() {
    return cy.getByDataQa('email-field');
  }

  get passwordField() {
    return cy.getByDataQa('password-field');
  }

  get updateButton() {
    return cy.getByDataQa('update-settings-button');
  }

  get logOutButton() {
    return cy.getByDataQa('logout-button');
  }

  get modalWindow() {
    return cy.get('.swal-button--confirm');
  }

  typeUserName(username) {
    this.userNameField.type(`{selectAll}${username}`);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.type(`{selectAll}${email}`);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateButton() {
    this.updateButton.click();
  }

  clickLogOutButton() {
    this.logOutButton.click();
  }

  visitSettings() {
    cy.visit('/settings');
  }

  assertBioField(newBio) {
    this.bioField.should('contain.value', newBio);
  }

  assertEmailField(newEmail) {
    this.emailField.should('contain.value', newEmail);
  }

  acceptModalWindow() {
    this.modalWindow.click();
  }
}

export default SettingsPageObject;
