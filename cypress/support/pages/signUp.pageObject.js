/* eslint-disable */
import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get(':nth-child(1) > .form-control');
  }
  
  get emailField() {
    return cy.get(':nth-child(2) > .form-control');
  }

  get passwordField() {
    return cy.get(':nth-child(3) > .form-control');
  }

  get signUpBtn() {
    return cy.get('.btn');
  }

  typeUsername(username) {
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