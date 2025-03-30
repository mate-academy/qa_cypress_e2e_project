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
    return cy.getByDataCy('sign-in-button');
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

  get modalLogInError() {
    return cy.get('.swal-modal');
  }

  get confirmErrorButton() {
    return cy.get('.swal-button--confirm');
  }

  clickConfirmErrorButton() {
    this.confirmErrorButton
      .click();
  }

  assertModalLogError() {
    this.modalLogInError
      .should('be.visible');
  }

  assertModalCredError() {
    this.modalLogInError
      .should('contain', 'Login failed!')
      .and('contain', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
