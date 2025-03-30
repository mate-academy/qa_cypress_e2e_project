import PageObject from '../PageObject';

class SettingsPage extends PageObject {
  url = '/#/settings';

  get bioField() {
    return cy.getByDataCy('bio-update-field');
  }

  get usernameField() {
    return cy.getByDataCy('username-update-field');
  }

  get emailField() {
    return cy.getByDataCy('email-update-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get successField() {
    return cy.get('.swal-title');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  get modalOkBtn() {
    return cy.get('.swal-button');
  }

  clickOnTheModalOkBtn() {
    this.modalOkBtn.click();
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertBioContainValue(expectedBio) {
    this.bioField.should('be.visible').and('have.value', expectedBio);
  }

  assertEmailContainValue(expectedEmail) {
    this.emailField.should('be.visible').and('have.value', expectedEmail);
  }

  checkSuccess(text) {
    this.successField.should('contain', text);
  }
}

export default SettingsPage;
