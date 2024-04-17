import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get emailField() {
    return cy.getByDataCy('emailFieldSettings');
  }

  get bioField() {
    return cy.getByDataCy('bioFieldSettings');
  }

  get passwordField() {
    return cy.getByDataCy('passwordFieldSettings');
  }

  get usernameField() {
    return cy.getByDataCy('usernameFieldSettings');
  }

  get submitButton() {
    return cy.getByDataCy('submitButtonSettings');
  }

  get logoutButton() {
    return cy.getByDataCy('logoutButton');
  }

  typeNewUsername(username) {
    this.usernameField
      .type(`{selectAll}${username}`);
  }

  typeNewBio(bio) {
    this.bioField
      .type(`{selectAll}${bio}`);
  }

  typeNewEmail(email) {
    this.emailField
      .type(`{selectAll}${email}`);
  }

  typeNewPassword(password) {
    this.passwordField
      .type(`{selectAll}${password}`);
  }

  clickSubmitButton() {
    this.submitButton
      .click();
  }

  clickLogoutButton() {
    this.logoutButton
      .click();
  }

  assertEmailHasChanged(email) {
    this.emailField
      .should('have.value', email);
  }

  assertBioHasChanged(bio) {
    this.bioField
      .should('have.value', bio);
  }

  assertPasswordHasChanged(password) {
    this.passwordField
      .should('have.value', password);
  }

  assertUsernameHasChanged(username) {
    this.usernameField
      .should('have.value', username);
  }
}

export default SettingsPageObject;
