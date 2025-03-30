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

  get okBtn() {
    return cy.get('.swal-button--confirm');
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

  clickOkBtn() {
    this.okBtn
      .click();
  }

  assertTheSucessfulMessage () {
    cy.get('.swal-title').should('contain', 'Welcome!');
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
    cy.get('.swal-button').click();
  }

  assertErrorMessageBadPassword() {
    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Invalid user credentials.');
  }

  asserErrorMessageBadEmail() {
    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  }

  assertMessageBlankEmail() {
    cy.get('.swal-title').should('contain', 'Login failed!');
    cy.get('.swal-text').should('contain', 'Email field required');
  }
}

export default SignInPageObject;
