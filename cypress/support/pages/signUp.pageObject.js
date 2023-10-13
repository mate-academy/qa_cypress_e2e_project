import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataCy('username_register');
  }

  get emailField() {
    return cy.getByDataCy('email_register');
  }

  get passwordField() {
    return cy.getByDataCy('password_register');
  }

  get signUpBtn() {
    return cy.getByDataCy('registerBtn');
  }

  get registrationAlert() {
    return cy.get('.swal-title');
  }

  get credentialsAlert() {
    return cy.get('.swal-text');
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

}

export default SignUpPageObject;
