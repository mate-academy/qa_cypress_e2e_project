import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get updateBtn() {
    return cy.getByDataCy('update-btn');
  }

  get bioField() {
    return cy.getByDataCy('bio-textarea');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  get okBtn() {
    return cy.get('.swal-button');
  }

  typeUserame(username) {
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
    this.emailField
      .should('have.value', email);
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
}

export default SettingsPageObject;
