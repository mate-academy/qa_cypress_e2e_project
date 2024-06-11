import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';
  get usernameField() {
    return cy.getByDataCy('edit-username-field');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  get bioField() {
    return cy.getByDataCy('edit-user-bio-field');
  }

  typeBio(bio) {
    this.bioField.clear().type(bio);
  }

  get emailField() {
    return cy.getByDataCy('edit-email-field');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  get passwordField() {
    return cy.getByDataCy('new-password-field');
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-btn');
  }

  clickLogoutBtn() {
    this.logoutBtn.click();
  }

  assertSuccessfullUpdate() {
    cy.get('.swal-title').should('contain', 'Update successful!');
    cy.get('.swal-button').click();
  }
}

export default SettingsPageObject;
