import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.findByPlaceholder('Username');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.contains('button', 'Sign up');
  }

  get registrationAlert() {
    return cy.get('.swal-title');
  }

  get credentialsAlert() {
    return cy.get('.swal-text');
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

  isRegistrationFailed() {
    this.registrationAlert
      .contains('Registration failed!');
  }

  isUsernameRequired() {
    this.credentialsAlert
      .contains('Username field required.');
  }

  isEmailRequired() {
    this.credentialsAlert
      .contains('Email field required.');
  }

  isPasswordRequired() {
    this.credentialsAlert
      .contains('Password field required.');
  }

  isRegistrationSuccessfull() {
    this.registrationAlert
      .contains('Welcome!');
  }

  isSignUpCredentialsValid() {
    this.credentialsAlert
      .contains('Your registration was successful!');
  }
}

export default SignUpPageObject;
