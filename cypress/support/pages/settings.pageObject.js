import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.getByDataQa('username');
  }

  get bioField() {
    return cy.getByDataQa('bio');
  }

  get emailField() {
    return cy.getByDataQa('email');
  }

  get passwordField() {
    return cy.getByDataQa('password');
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('update-settings');
  }

  get modalTitle() {
    return cy.get('.swal-title');
  }

  get logoutBtn() {
    return cy.getByDataQa('logout');
  }

  changeName(name) {
    this.userNameField.clear().type(name);
  }

  changeBio(bio) {
    this.bioField.clear().type(bio);
  }

  changeEmail(email) {
    this.emailField.clear().type(email);
  }

  changePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  verifySettingsWasUpdated(state) {
    this.modalTitle.should('contain.text', state);
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }
}

export default SettingsPageObject;
