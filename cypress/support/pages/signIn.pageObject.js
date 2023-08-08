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
      .type('riot@qa.team');
  }

  typePassword(password) {
    this.passwordField
      .type('12345Qwert!');
  }

  typeInvalidPassword(password) {
    this.passwordField
      .type('wrongpassword123');
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertLoginFailed() {
    cy.get('.swal-title').should('contain.text', 'Login failed!');
  }

  assertInvalidCreds() {
    cy.get('.swal-text').should('contain.text', 'Invalid user credentials.');
  }

  clickOkBtn() {
    cy.get('.swal-button').click();
  }
}

export default SignInPageObject;
