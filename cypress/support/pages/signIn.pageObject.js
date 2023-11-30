import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '#/login';

  get emailField() {
    return cy.getByDataQa('sign-in-email');
  }

  get passwordField() {
    return cy.getByDataQa('sign-in-password');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  get invalidCredentials() {
    return cy.get('.swal-modal');
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

  assertInvalidCredentials(failedMessage) {
    this.invalidCredentials
      .should('contain', failedMessage);
  }
}

export default SignInPageObject;
