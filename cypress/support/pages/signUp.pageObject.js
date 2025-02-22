import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataCy('username');
  }

  get emailField() {
    return cy.getByDataCy('email');
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  get signUpBtn() {
    return cy.getByDataCy('signUp');
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

  pressSignUpBtn() {
    this.signUpBtn.click();
  }
}

export default SignUpPageObject;
