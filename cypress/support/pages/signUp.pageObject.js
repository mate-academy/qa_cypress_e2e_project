import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('sign-up-username-field');
  }

  get emailField() {
    return cy.getByDataCy('sign-up-email-field');
  }

  get passwordField() {
    return cy.getByDataCy('sign-up-password-field');
  }

  get submitButton() {
    return cy.getByDataCy('sign-up-submit-button');
  }

  typeUsername(username) {
    return this.usernameField.type(username);
  }

  typeEmail(email) {
    return this.emailField.type(email);
  }

  typePassword(password) {
    return this.passwordField.type(password);
  }

  fillForm({ username, email, password }) {
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
  }

  clickOnSubmitButton() {
    return this.submitButton.click();
  }
}

export default SignUpPageObject;
