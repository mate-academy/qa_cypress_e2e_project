import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.getByDataCy('username-update-field');
  }

  get bioField() {
    return cy.getByDataCy('bio-update-field');
  }

  get emailField() {
    return cy.getByDataCy('email-update-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-update-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-btn');
  }

  get modalTitle() {
    return cy.get('.swal-title');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
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

  verifySettingsWasUpdated() {
    this.modalTitle.should('contain', 'Update successful!');
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

}

export default SettingsPageObject;