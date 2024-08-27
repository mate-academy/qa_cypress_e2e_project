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

  get modalWindowTitle() {
    return cy.get('.swal-title');
  }

  get modalWindowDescription() {
    return cy.get('.swal-text');
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

  checkLoginFailed() {
    this.modalWindowTitle
      .should('contain', 'Login failed!');
    this.modalWindowDescription
      .should('contain', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
