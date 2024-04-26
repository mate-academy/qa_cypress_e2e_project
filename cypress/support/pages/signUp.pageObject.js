import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.findByPlaceholder('Username');
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  get signUpBtn() {
    return cy.contains('.btn', 'Sign up');
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  assertSuccessMessage() {
    return cy.contains('.swal-text', 'Your registration was successful!');
  }

  assertErrorMessage() {
    return cy.contains('.swal-title', 'Registration failed!');
  }
};

export default SignUpPageObject;
