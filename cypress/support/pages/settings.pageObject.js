import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get updateButton() {
    return cy.getByDataCy('update-btn');
  }

  get logOutButton() {
    return cy.getByDataCy('logout-btn');
  }

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get successMessage() {
    return cy.get('.swal-modal');
  }

  get okButton() {
    return cy.get('.swal-button')
  }

  get header() {
    return cy.getByDataCy('header')
  }

  typeUsername(username) {
    this.usernameField
    .clear()
    .type(username);
  }

  typeBio(bio) {
    this.bioField
      .type(bio);
  }

  typeEmail(email) {
    this.emailField
    .clear()
    .type(email);
  }

  typePassword(password) {
    this.passwordField
    .clear()
    .type(password);
  }

  clickOnUpdateButton() {
    this.updateButton
      .click();
  }

  clickOnLogOutButton() {
    this.logOutButton
      .click();
  }

  clickOnOkButton() {
    this.okButton
      .click();
  }

  checkHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username)
  }

  checkSuccessMessage() {
    this.successMessage
      .should('contain', 'Update successful!')
  }

  checkHeader() {
    this.header
      .should('contain', 'Sign up')
      .should('contain', 'Sign in')
  }
}

export default SettingsPageObject;