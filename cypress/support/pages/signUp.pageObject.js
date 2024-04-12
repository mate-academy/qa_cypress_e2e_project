import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataQa('username-sign-up');
  }

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  get signUpButton() {
    return cy.getByDataQa('sign-up-button');
  }

  get modalError() {
    return cy.get('[class=swal-title]');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typeWrongEmail(email) {
    this.emailField.type(`wrong${email}`);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpButton() {
    this.signUpButton.click();
  }

  assertModalContainsSuccess() {
    this.modalError.should('contain.text', 'Welcome!');
  }

  assertModalContainsError() {
    this.modalError.should('contain.text', 'Registration failed!');
  }
}

export default SignUpPageObject;
