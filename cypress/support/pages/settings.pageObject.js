import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameSettings() {
    return cy.getByDataCy('settings-username');
  }

  get bioSettings() {
    return cy.getByDataCy('settings-bio');
  }

  get emailSettings() {
    return cy.getByDataCy('settings-email');
  }

  get passwordSettings() {
    return cy.getByDataCy('settings-password');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('settings-update-btn');
  }

  get modalSuccessMessage() {
    return cy.get('.swal-title');
  }

  fillUsernameSettingsField(username) {
    this.usernameSettings
      .clear()
      .type(username);
  }

  fillBioSettingsField(bio) {
    this.bioSettings
      .clear()
      .type(bio);
  }

  fillEmailSettingsField(email) {
    this.passwordSettings
      .clear()
      .type(email);
  }

  fillPasswordSettingsField(password) {
    this.passwordSettings
      .clear()
      .type(password);
  }

  assertBioSettingsValue(bio) {
    this.bioSettings
    .should('have.value', bio)
  }

  clickOnUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  assertSettingsUpdated() {
    this.modalSuccessMessage
      .should('contain', 'Update successful!');
  }

  clickOnModalOkBtn() {
    cy.get('.swal-button--confirm').click();
  }

  clickOnLogOutBtn() {
    cy.getByDataCy('log-out-btn').click();
  }
}

export default SettingsPageObject;

