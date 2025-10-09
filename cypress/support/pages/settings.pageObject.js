import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  constructor() {
    super();
    this.url = '/settings';
    this.usernameField = () => cy.get('[data-qa="settings-username"]');
    this.bioField = () => cy.get('[data-qa="settings-bio"]');
    this.emailField = () => cy.get('[data-qa="settings-email"]');
    this.passwordField = () => cy.get('[data-qa="settings-password"]');
    this.updateBtn = () => cy.get('[data-qa="update-btn"]');
  }

  visitPage() {
    super.visit(this.url);
  }

  updateUsername(username) {
    this.usernameField().clear().type(username);
    this.updateBtn().click();
  }

  updateBio(bio) {
    this.bioField().clear().type(bio);
    this.updateBtn().click();
  }

  updateEmail(email) {
    this.emailField().clear().type(email);
    this.updateBtn().click();
  }

  updatePassword(password) {
    this.passwordField().clear().type(password);
    this.updateBtn().click();
  }

  assertUsername(username) {
    cy.get('[data-qa="profile-link"]').should('contain.text', username);
  }

  assertBio(bio) {
    cy.get('[data-qa="bio-field"]').should('have.value', bio);
  }

  assertEmail(email) {
    this.emailField().should('have.value', email);
  }

  logout() {
    cy.get('[data-qa="logout-btn"]').click();
  }
}

export default SettingsPageObject;
