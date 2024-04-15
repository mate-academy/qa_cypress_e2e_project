/// <reference types='cypress' />

import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/register';

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

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  alertSuccessfulRegistration() {
    this.allertMessage('Welcome!', 'Your registration was successful!');
  }

  allertRegistrationFailed() {
    this.allertMessage('Registration failed!');
  }

  alertEmailRequired() {
    this.allertMessage('Registration failed!', 'Email field required.');
  }

  alertEmailTaken() {
    this.allertMessage('Registration failed!', 'Email already taken.');
  }

  alertInvalidEmail() {
    this.allertMessage('Registration failed!', 'Email must be a valid email.');
  }

  alertInvalidUsername() {
    this.allertMessage('Registration failed!',
      'Username must be a valid email.');
  }

  alertInvalidPassword() {
    this.allertMessage('Registration failed!',
    `Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.`);
  }
}

export default SignUpPageObject;
