import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.getByDataCy('username-settings');
  }

  get bioField() {
    return cy.getByDataCy('bio-settings');
  }

  get emailField() {
    return cy.getByDataCy('email-settings');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings');
  }

  get updateBtn() {
    return cy.getByDataCy('submit-settings');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-settings');
  }

  get okBtn() {
    return cy.get('.swal-button--confirm');
  }

  typeUserName(username) {
    this.userNameField.clear().type(username);
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
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
    this.logoutBtn.click({ force: true });
  }

  clickOkBtn() {
    this.okBtn.click();
  }
}

export default SettingsPageObject;
