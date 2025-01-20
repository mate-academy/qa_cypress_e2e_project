import PageObject from '../PageObject';
/// <reference types='cypress' />
/// <reference types='../support' />

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get loginFailed() {
    return cy.getByClass('swal-title');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  findLoginFailedTitle(text) {
    this.loginFailed.should('contain.text', text);
  }
}

export default SignInPageObject;
