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

  get loginErrorModal() {
    return cy.get('.swal-modal');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  signIn(email, password) {
    this.emailField.type(email);
    this.passwordField.type(password);
    this.signInBtn.click();
  }

  assertInvalidUserCredentials() {
    this.loginErrorModal.should('contain', 'Invalid user credentials');
  }

  assertEmailMustBeAValidEmail() {
    this.loginErrorModal.should('contain', 'Email must be a valid email.');
  }

  assertEmailFieldRequired() {
    this.loginErrorModal.should('contain', 'Email field required');
  }

  assertPasswordFieldRequired() {
    this.loginErrorModal.should('contain', 'Password field required');
  }
}

export default SignInPageObject;
