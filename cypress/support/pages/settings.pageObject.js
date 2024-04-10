import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  url = '/#/settings';

  get usernameField() {
    return cy.getByPlaceholder('Your username');
  }

  get bioField() {
    return cy.getByPlaceholder('Short bio about you');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get setingsBtn() {
    return cy.contains('.btn', 'Update Settings');
  }

  get editProfBtn() {
    return cy.contains('.btn', `Edit Profile Settings`);
  }

  get logOutBtn() {
    return cy.contains('.btn', 'Or click here to logout.');
  }

  usernameType(text) {
    this.usernameField.clear();
    this.usernameField.type(text);
  }

  bioType(text) {
    this.bioField.type(text);
  }

  emailType(text) {
    this.emailField.clear();
    this.emailField.type(text);
  }

  passwordType(text) {
    this.passwordField.type(text);
  }

  assertChanges() {
    cy.get('.swal-title').should('contain', 'Update successful!');
  }
}

export default SettingsPageObject;
