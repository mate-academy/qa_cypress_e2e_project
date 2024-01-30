import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get usernameField() {
    return cy.getByDataQa('username-sign-in');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  typeusername(username) {
    this.usernameField
      .type(username);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }
}

export default SignUpPageObject;
