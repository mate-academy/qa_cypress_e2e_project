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
    cy.getByDataCy('sign-in-btn')
      .click();
  }

  popUpWindow() {
    cy.get('.swal-modal').should('exist');
  }

  assertLogInError() {
    cy.get('.swal-modal')
      .should('contain', 'Login failed!');
  }

  assertLogInErrorMsg() {
    cy.get('.swal-modal')
      .should('contain', 'Invalid user credentials');
  }

  closePopUpWindow() {
    cy.get('.swal-button')
      .click();
  }

  assertEmptyEmailError() {
    cy.get('.swal-modal')
      .should('contain', 'Email field required.');
  }

  assertEmptyPassError() {
    cy.get('.swal-modal')
      .should('contain', 'Password field required.');
  }
}

export default SignInPageObject;
