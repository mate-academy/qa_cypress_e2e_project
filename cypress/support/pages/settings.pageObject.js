import PageObject from '../PageObject';
/// <reference types='cypress' />
/// <reference types='../support' />

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get passwordField() {
    return cy.getByDataCy('settings-password');
  }

  get emailField() {
    return cy.getByDataCy('settings-email');
  }

  get bioField() {
    return cy.getByDataCy('settings-bio');
  }

  get bioText() {
    return cy.getByDataCy('settings-text-bio');
  }

  get nameField() {
    return cy.getByDataCy('settings-name');
  }

  get logoutBtn() {
    return cy.getByDataCy('settings-logout');
  }

  get updateBtn() {
    return cy.getByDataCy('settings-update');
  }

  get modalOkBtn() {
    return cy.getByClass('swal-button');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  checkEmailValue(value) {
    this.emailField.should('contain.value', value);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  typeUserName(name) {
    this.nameField.clear().type(name);
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  findBioText(text) {
    this.bioText.should('contain.text', text);
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  clickUpdateBtn() {
    this.updateBtn.click();
  }

  clickModalOkBtn() {
    this.modalOkBtn.click();
  }
}

export default SettingsPageObject;
