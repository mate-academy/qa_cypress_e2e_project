import PageObject from '../PageObject';

class SettingsPageObject extends PageObject {
  visit() {
    cy.contains('Settings').click();
  }

  get imageField() {
    return cy.get('input[type="text"]').eq(0);
  }

  get usernameField() {
    return cy.get('input[type="text"]').eq(1);
  }

  get bioField() {
    return cy.get('textarea');
  }

  get emailField() {
    return cy.get('input[type="text"]').eq(2);
  }

  get passwordField() {
    return cy.get('input[type="password"]');
  }

  typeUsername(username) {
    this.usernameField.clear();
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.clear();
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField
      .clear({ force: true });
    this.passwordField
      .type(password, { force: true });
  }

  typeBio(bio) {
    this.bioField.clear();
    this.bioField.type(bio);
  }

  clickUpdateBtn() {
    cy.contains('button', 'Update Settings').click();
  }
}

export default SettingsPageObject;
