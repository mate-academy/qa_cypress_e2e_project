import PageObject from './PageObject';
import faker from 'faker';

class SettingsPage extends PageObject {
  url = '/settings';

  // Form fields
  get usernameField() { return cy.get('[data-cy="username-input"]'); }
  get bioField() { return cy.get('[data-cy="bio-input"]'); }
  get emailField() { return cy.get('[data-cy="email-input"]'); }
  get passwordField() { return cy.get('[data-cy="password-input"]'); }
  get saveBtn() { return cy.get('[data-cy="save-settings-btn"]'); }
  get logoutBtn() { return cy.get('[data-cy="logout-btn"]'); }

  // Low-level actions
  typeUsername(username) { this.usernameField.clear().type(username); }
  typeBio(bio) { this.bioField.clear().type(bio); }
  typeEmail(email) { this.emailField.clear().type(email); }
  typePassword(password) { this.passwordField.clear().type(password); }
  clickSave() { this.saveBtn.click(); }
  clickLogout() { this.logoutBtn.click(); }

  // High-level methods
  updateUsername(username) {
    this.typeUsername(username);
    this.clickSave();
  }

  updateBio(bio) {
    this.typeBio(bio);
    this.clickSave();
  }

  updateEmail(email) {
    this.typeEmail(email);
    this.clickSave();
  }

  updatePassword(password) {
    this.typePassword(password);
    this.clickSave();
  }

  logOut() {
    this.clickLogout();
  }

  // Assertions
  assertUsernameUpdated(username) {
    cy.get('[data-cy="username-display"]').should('contain', username);
  }

  assertBioUpdated(bio) {
    cy.get('[data-cy="bio-display"]').should('contain', bio);
  }

  assertEmailUpdated(email) {
    cy.get('[data-cy="email-display"]').should('contain', email);
  }
}

export default SettingsPage;
