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
      .clear()
      .type('{selectAll}' + email);
  }

  typePassword(password) {
    this.passwordField
      .type('{selectAll}' + password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertTheMessageErrorBadPassword () {
    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Invalid user credentials.');
    cy.get('.swal-button').click();
  }

  assertTheMessageErrorBadEmail () {
    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
    cy.get('.swal-button').click();
  }

  assertTheMessageBlankEmail () {
    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Email field required');
  }
}

export default SignInPageObject;
