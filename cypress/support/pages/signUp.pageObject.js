import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataQa('username-sign-up');
  }

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  get failAlert() {
    return cy.get('.swal-modal');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  assertRegistrationFailedEmail() {
    this.failAlert.should('contain', 'Registration failed!')
      .and('contain', 'Email must be a valid email.');
  }

  assertRegistrationFailedPassword() {
    this.failAlert.should('contain', 'Registration failed!')
      .and('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }

  assertRegistrationEmptyUsername() {
    this.failAlert.should('contain', 'Registration failed!')
      .and('contain', 'Username field required.');
  }

  assertRegistrationEmptyEmail() {
    this.failAlert.should('contain', 'Registration failed!')
      .and('contain', 'Email field required.');
  }

  assertRegistrationEmptyPassword() {
    this.failAlert.should('contain', 'Registration failed!')
      .and('contain', 'Password field required.');
  }
}

export default SignUpPageObject;