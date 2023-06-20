import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  assertFailedLogIn() {
    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
