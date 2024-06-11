/* eslint-disable cypress/no-unnecessary-waiting */
import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username-field', { timeout: 20000 });
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn', { timeout: 20000 });
  }

  get bioField() {
    return cy.getByDataCy('bio-textarea', { timeout: 20000 });
  }

  get emailField() {
    return cy.getByDataCy('email-field', { timeout: 20000 });
  }

  get passwordField() {
    return cy.getByDataCy('password-field', { timeout: 20000 });
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn', { timeout: 20000 });
  }

  get okBtn() {
    return cy.get('.swal-button', { timeout: 20000 });
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  clickOnUpdateBtn() {
    this.updateBtn.click();
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  assertSettingsContainEmail(email) {
    this.emailField.should('have.value', email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickOnLogoutBtn() {
    this.logoutBtn.click();
  }

  clickOnOkBtn() {
    this.okBtn.click();
  }

  visit() {
    cy.visit(this.url);
    cy.wait(1000); // Невелика затримка для забезпечення повного завантаження сторінки
  }
}

export default SettingsPageObject;
