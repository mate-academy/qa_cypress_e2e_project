import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get userNameField() {
    return cy.getByDataQa('settings-username');
  }

  get bioField() {
    return cy.getByDataQa('settings-bio');
  }

  get emailField() {
    return cy.getByDataQa('settings-email');
  }

  get passwordField() {
    return cy.getByDataQa('settings-password');
  }

  get logoutBtn() {
    return cy.getByDataQa('settings-logout-btn');
  }

  get updateSettingsBtn() {
    return cy.getByDataQa('settings-update-btn');
  }

  get dialogBtn() {
    return cy.get('.swal-button');
  }

  assertContainNewUsername(username) {
    this.userNameField
      .should('have.value', username);
  }

  typeUserName(userName) {
    this.userNameField.type('{selectAll}' + userName);
  }

  typeBio(bio) {
    this.bioField.type('{selectAll}' + bio);
  }

  typeEmail(email) {
    this.emailField.type('{selectAll}' + email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  clickDialogBtn() {
    this.dialogBtn.click();
  }

  assertEmailField(email) {
    this.emailField
      .should('have.value', email);
  }
}

export default SettingsPageObject;
