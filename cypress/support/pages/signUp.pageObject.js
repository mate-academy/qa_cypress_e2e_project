import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get('[data-qa="username-register"]');
  }

  get emailField() {
    return cy.get('[data-qa="email-register"]');
  }

  get passwordField() {
    return cy.get('[data-qa="password-register"]');
  }

  get signUpBtn() {
    return cy.get('[data-qa="sign-up-btn"]');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  fillSignUpForm(username, email, password) {
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
  }
}

export default SignUpPageObject;
