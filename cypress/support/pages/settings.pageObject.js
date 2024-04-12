import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '#/settings';

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

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get ModalWindow() {
    return cy.get('.swal-modal');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  assertModalWindow(message) {
    this.ModalWindow.should('contain', message);
  }

  assertUsernameValue(newUsername) {
    this.usernameField.should('have.value', newUsername);
  }

  assertBioValue(newBio) {
    this.bioField.should('have.value', newBio);
  }

  assertEmailValue(newPassword) {
    this.passwordField.should('have.value', newPassword);
  }

  assertPasswordValue(newEmail) {
    this.emailField.should('have.value', newEmail);
  }

  assertTokenIsRemoved() {
    cy.getCookie('drash_sess').should('have.property', 'value', 'null');
  }
}

export default SettingsPageObject;
