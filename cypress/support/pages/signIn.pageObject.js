import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertFailedLogIn() {
    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
