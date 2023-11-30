import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/login';

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

  allertInvalidCredentials() {
    this.allertMessage('Login failed!', 'Invalid user credentials.');
  }

  allertEmailRequired() {
    this.allertMessage('Login failed!', 'Email field required.');
  }

  assertSignInLink() {
    cy.url().should('contain', `/login`);
  }
}

export default SignInPageObject;
