import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataQa('register-username');
  }

  get emailField() {
    return cy.getByDataQa('register-email');
  }

  get passwordField() {
    return cy.getByDataQa('register-password');
  }

  get submitButton() {
    return cy.getByDataQa('register-submit');
  }

  visit() {
    super.visit(this.url);
  }

  register(username, email, password) {
    this.usernameField.type(username);
    this.emailField.type(email);
    this.passwordField.type(password);
    this.submitButton.click();
  }
}

export default SignUpPageObject;
