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

  get modalMessage() {
    return cy.get('.swal-modal');
  }

  assertErrorMessage() {
    this.modalMessage.should('contain', 'Login failed!');
  }

  assertLoginPage() {
    cy.url().should('include', this.url);
  }
}

export default SignInPageObject;
