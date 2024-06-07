import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByDataCy('username-settings-field');
  };

  get bioField() {
    return cy.getByDataCy('bio-settings-field');
  }

  get emailField() {
    return cy.getByDataCy('email-settings-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-settings-field');
  }

  get updateSettingsBtn() {
    return cy.getByDataCy('update-settings-btn');
  }

  get logoutBtn() {
    return cy.getByDataCy('logout-settings-btn');
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  assertUsername(value) {
    this.usernameField
      .should('contain.value', value);
  }

  typeBio(bio) {
    this.bioField
      .type(bio);
  }

  assertBio(value) {
    this.bioField
      .should('contain.value', value);
  }

  typeEmail(email) {
    this.emailField
      .type(`{selectAll}${email}`);
  }

  assertEmail(value) {
    this.emailField
      .should('contain.value', value);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn
      .click();
  }

  clickLogoutBtn() {
    this.logoutBtn
      .click();
  }
}

export default SettingsPageObject;
