import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get bioField() {
    return cy.get('textarea.form-control');
  }

  get usernameField() {
    return cy.get(':nth-child(2) > .form-control');
  }

  get emailField() {
    return cy.get('input[placeholder="Email"]');
  }

  get passwordField() {
    return cy.get('input[placeholder="Password"]');
  }

  get updateSettingsBtn() {
    return cy.contains('button', 'Update Settings');
  }

  visit() {
    cy.visit(this.url);
  }

  clearBioField() {
    this.bioField.clear();
  }

  typeBio(bio) {
    this.bioField.type(bio);
  }

  clearUsernameField() {
    this.usernameField.clear();
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  clearEmailField() {
    this.emailField.clear();
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  clearPasswordField() {
    this.passwordField.clear();
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickUpdateSettingsBtn() {
    this.updateSettingsBtn.click();
  }
}

export default SettingsPageObject;
