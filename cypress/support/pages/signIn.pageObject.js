import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  get emailErrorMessage() {
    return cy.getByDataCy('error-message-email');
  }

  get passwordErrorMessage() {
    return cy.getByDataCy('error-message-password');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  verifyEmailError() {
    this.emailErrorMessage
      .should('be.visible');
  }

  verifyPasswordError() {
    this.passwordErrorMessage
      .should('be.visible');
  }
}

export default SignInPageObject;
