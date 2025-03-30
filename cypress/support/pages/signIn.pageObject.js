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

  assertEmailBlankError() {
    cy.contains('.swal-text', 'Email field required.')
      .should('be.visible');
  }

  assertPasswordBlankError() {
    cy.contains('.swal-text', 'Password field required.')
      .should('be.visible');
  }

  assertInvalidCredentials() {
    cy.contains('.swal-text', 'Invalid user credentials.')
      .should('be.visible');
  }

  assertInvalidEmail() {
    cy.contains('.swal-text', 'Email must be a valid email.')
      .should('be.visible');
  }

  checkPasswordAsterisks() {
    this.passwordField.matchImageSnapshot();
  }
}

export default SignInPageObject;
