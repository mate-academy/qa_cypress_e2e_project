import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('settings-username');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('settings-update-btn');
  }

  get logOutBtn() {
    return cy.getByDataCy('settings-log-out-btn');
  }

  get updateSuccessfulPopUp() {
    return cy.get('.swal-title');
  }

  get closePopUp() {
    return cy.get('.swal-button');
  }

  updateUsername() {
    this.usernameField
      .type('new');
  }

  updateBio() {
    this.bioField
      .type('new');
  }

  updateEmail(email) {
    this.emailField
      .clear()
      .type('new' + email);
  }

  updatePassword(password) {
    this.passwordField
      .type(password + 'new');
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn
      .click();
  }

  clickOnLogOutBtn() {
    this.logOutBtn
      .click();
  }

  assertSuccessfulUpdate() {
    this.updateSuccessfulPopUp
      .should('contain.text', 'Update successful!');
  }

  closeThePopUp() {
    this.closePopUp
      .click();
  }
}

export default SettingsPageObject;
