import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  elements = {
    usernameField: () => cy.getByDataCy('username-settings'),
    bioField: () => cy.getByDataCy('bio-settings'),
    emailField: () => cy.getByDataCy('email-settings'),
    passwordField: () => cy.getByDataCy('password-settings'),
    updateSettingsBtn: () => cy.getByDataCy('update-settings-btn'),
    logoutBtn: () => cy.getByDataCy('logout-btn')
  };

  typeNewUsername(username) {
    this.elements.usernameField().clear().type(username);
  }

  typeBio(bio) {
    this.elements.bioField().type(bio);
  }

  typeNewEmail(email) {
    this.elements.emailField().clear().type(email);
  }

  typeNewPassword(password) {
    this.elements.passwordField().type(password);
  }

  clickUpdateSettingsBtn() {
    this.elements.updateSettingsBtn().click();
  }

  clickLogoutBtn() {
    this.elements.logoutBtn().click();
  }

  assertValidationPopUp() {
    cy.get('.swal-modal').should('contain', 'Update successful!');
  }

  goToSettingsPage() {
    cy.getByDataCy('settings-link').click();
  }
}

export default SettingsPageObject;
