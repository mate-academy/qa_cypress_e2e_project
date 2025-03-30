import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get emailField() {
    return cy.get('[placeholder="Email"]');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-settings-btn');
  }

  get okButton() {
    return cy.get('.swal-button');
  }

  typeUserName(username) {
    this.userNameField
      .clear()
      .type(username);
  }

  typeBio(bio) {
    this.bioField
      .clear()
      .type(bio);
  }

  typePassword(password) {
    this.passwordField
      .clear()
      .type(password);
  }

  typeEmail(email) {
    this.emailField
      .clear()
      .type(email);
  }

  clickUpdateBtn() {
    this.updateSettingsBtn
      .click();
  }

  clickOkButton() {
    this.okButton.click();
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }

  assertUpdatedBioField(bio) {
    this.bioField
      .should('have.value', bio);
  }

  assertUpdatedEmailField(email) {
    this.emailField
      .should('have.value', email);
  }
}

export default SettingsPageObject;