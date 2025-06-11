import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get('[placeholder=Username]');
  }

  get emailField() {
    return cy.get('[placeholder=Email]');
  }

  get passwordField() {
    return cy.get('[placeholder=Password]');
  }

  get signUpBtn() {
    return cy.get('.btn-primary');
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
