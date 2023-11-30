import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataQa('username-update-field');
  }

  get bioField() {
    return cy.getByDataQa('bio-update-field');
  }

  get emailField() {
    return cy.getByDataQa('email-update-field');
  }

  get passwordField() {
    return cy.getByDataQa('password-update-field');
  }

  get updateBtn() {
    return cy.getByDataQa('update-btn');
  }

  get logOutBtn() {
    return cy.getByDataQa('logout-btn');
  }

  fillUsernameField(username) {
    this.usernameField.clear().type(username);
  }

  fillBioField(bio) {
    this.bioField.clear().type(bio);
  }

  fillEmailField(email) {
    this.emailField.clear().type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickOnLogOutBtn() {
    this.logOutBtn.click();
  }

  assertModalText(text) {
    cy.get('.swal-modal').should('contain', text);
    cy.get('.swal-button').click();
  }

  assertBioField(bio) {
    this.bioField.should('have.value', bio);
  }

  assertEmailField(email) {
    this.emailField.should('have.value', email);
  }
}

export default SettingsPageObject;
