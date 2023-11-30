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

  get Message() {
    return cy.get('.swal-text');
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

  assertWrongCredentials() {
    this.Message
      .should('contain', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
