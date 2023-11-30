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

  assertInvalidCredentialsModal() {
    cy.contains('.swal-modal', 'Invalid user credentials.')
      .should('be.visible');
  }

  assertEmailRequiredModal() {
    cy.contains('.swal-modal', 'Email field required.')
      .should('be.visible');
  }

  assertPasswordRequiredModal() {
    cy.contains('.swal-modal', 'Password field required.')
      .should('be.visible');
  }
}

export default SignInPageObject;
