import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('username-field');
  }

  get bioField() {
    return cy.getByDataQa('user-bio-field');
  }

  get emailField() {
    return cy.getByDataQa('email-field');
  }

  get passwordField() {
    return cy.getByDataQa('password-field');
  }

  get updateSettingsButton() {
    return cy.getByDataQa('update-settings');
  }

  get logoutButton() {
    return cy.getByDataQa('logout');
  }

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get updateWindow() {
    return cy.contains('Update successful!');
  }

  get successfulButton() {
    return cy.get('.swal-button');
  }

  get paragraph() {
    return cy.get('p');
  }

  typeUsername(username) {
    this.usernameField.clear();
    this.usernameField.type(username, { force: true });
  }

  typeBio(bio) {
    this.bioField.clear();
    this.bioField.type(bio, { force: true });
  }

  typeEmail(email) {
    this.emailField.clear();
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.clear();
    this.passwordField.type(password);
  }

  clickOnUpdateSettingsButton() {
    this.updateSettingsButton.click();
  }

  clickOnLogoutButton() {
    this.logoutButton.click();
  }

  clickOnSuccessfulButton() {
    this.successfulButton.click();
  }

  clickOnUsernameLink() {
    this.usernameLink.click();
  }

  assertUpdate() {
    this.updateWindow
      .should('contain', 'Update successful!');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default SettingsPageObject;
