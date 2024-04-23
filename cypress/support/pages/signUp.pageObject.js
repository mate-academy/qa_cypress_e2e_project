import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('submit-sign-up');
  }

  get okBtn() {
    return cy.get('.swal-button--confirm');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  clickOkBtn() {
    this.okBtn
      .click();
  }

  assertErrorMessage() {
    return cy.contains('.swal-title', 'Registration failed!');
  }

  assertSuccessMessage() {
    return cy.contains('.swal-title', 'Welcome!');
  }
}

export default SignUpPageObject;
