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

  get failAlert() {
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

  assertLoginFailed() {
    this.failAlert.should('contain', 'Login failed!')
      .and('contain', 'Invalid user credentials.');
  }

  assertLoginEmptyEmail() {
    this.failAlert.should('contain', 'Login failed!')
      .and('contain', 'Email field required.');
  }

  assertLoginEmptyPassword() {
    this.failAlert.should('contain', 'Login failed!')
      .and('contain', 'Password field required.');
  }
}

export default SignInPageObject;
