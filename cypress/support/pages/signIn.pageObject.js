import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertErrorMessage() {
    return cy.contains('.swal-text', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
