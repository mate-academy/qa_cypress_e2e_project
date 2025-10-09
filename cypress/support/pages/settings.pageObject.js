import PageObject from './PageObject';

class SettingsPageObject extends PageObject {
  url = '/settings';

  get usernameField() {
    return cy.get('[data-qa="username-input"]');
  }

  get bioField() {
    return cy.get('[data-qa="bio-input"]');
  }

  get emailField() {
    return cy.get('[data-qa="email-input"]');
  }

  get passwordField() {
    return cy.get('[data-qa="password-input"]');
  }

  get updateBtn() {
    return cy.get('[data-qa="update-settings"]');
  }

  get logoutBtn() {
    return cy.get('[data-qa="logout"]');
  }

  visitPage() {
    this.visit(this.url);
  }

  updateUsername(username) {
    this.usernameField.clear().type(username);
    this.updateBtn.click();
  }

  updateBio(bio) {
    this.bioField.clear().type(bio);
    this.updateBtn.click();
  }

  updateEmail(email) {
    this.emailField.clear().type(email);
    this.updateBtn.click();
  }

  updatePassword(password) {
    this.passwordField.clear().type(password);
    this.updateBtn.click();
  }

  logout() {
    this.logoutBtn.click();
  }

  assertUsername(username) {
    cy.contains('[data-qa="profile-link"]', username).should('be.visible');
  }
}

export default SettingsPageObject;
