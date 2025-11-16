
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  clearUsername() {
    this.usernameField.clear();
  }

  clickInUpdateSettings() {
    return cy.contains('.btn', 'Update Settings')
      .click();
  }

  get bioField() {
    return cy.getByPlaceholder('Short bio about you');
  }

  clearBio() {
    this.bioField.clear();
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  assertUpdatedSettings() {
    return cy.url().should('include', '/profile');
  }

  assertContainBio(bio) {
    return cy.get('p').should('contain.text', bio);
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  clearEmail() {
    this.emailField.clear();
  }

  assertContainEmail(email) {
    this.emailField.should('have.value', email);
  }

  clickInLogout() {
    cy.contains('.btn', 'Or click here to logout.')
      .click();
  }

  get passwordField() {
    return cy.getByPlaceholder('New Password');
  }

  typeNewPassword(password) {
    this.passwordField.type(password);
  }

  clearPassword() {
    this.passwordField.clear();
  }

  assertLoggedOutUser() {
    cy.url().should('eq', 'https://conduit.mate.academy/');
  }
}

export default SettingsPageObject;
