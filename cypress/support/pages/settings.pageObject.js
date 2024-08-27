import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('settings-username');
  }

  get bioField() {
    return cy.getByDataQa('settings-bio');
  }

  get emailField() {
    return cy.getByDataQa('settings-email');
  }

  get passwordField() {
    return cy.getByDataQa('settings-password');
  }

  get updateBtn() {
    return cy.getByDataQa('settings-update-btn');
  }

  get logoutBtn() {
    return cy.getByDataQa('settings-logout-btn');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  updateUsername(username) {
    this.usernameField.clear();
    this.usernameField.type(username);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  updateBio(bio) {
    this.bioField.clear();
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  updateEmail(email) {
    this.emailField.clear();
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateBtn() {
    this.updateBtn
      .click();
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }

  profileLinkCheck(username) {
    cy.getByDataQa('username-link').should('contain', username);
  }

  checkLogOut() {
    cy.contains('.nav-link', 'Sign in').should('be.visible');
  }

  settingsLinkClick() {
    cy.getByDataQa('settings-link').click();
  }

  userNameFieldCheck(expectedUsername) {
    this.usernameField.should('have.value', expectedUsername);
  }

  bioFieldCheck(newBio) {
    this.bioField.should('have.value', newBio);
  }

  emailFieldCheck(newEmail) {
    this.emailField.should('have.value', newEmail);
  }

  modalOkClick() {
    cy.get('.swal-button').click();
  }
}
export default SettingsPageObject;
