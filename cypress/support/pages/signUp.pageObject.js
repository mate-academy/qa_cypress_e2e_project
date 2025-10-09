import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/register';

  get usernameField() {
    return cy.get('[data-qa="username-input"]');
  }

  get emailField() {
    return cy.get('[data-qa="email-input"]');
  }

  get passwordField() {
    return cy.get('[data-qa="password-input"]');
  }

  get signUpBtn() {
    return cy.get('[data-qa="signup-button"]');
  }

  visitPage() {
    this.visit(this.url);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }
}

export default SignUpPageObject;
