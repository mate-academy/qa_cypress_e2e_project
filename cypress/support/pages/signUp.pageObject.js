import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

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

  get modalMessage() {
    return cy.get('.swal-text');
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

  assertSuccessfulRegistration() {
    this.modalMessage.should('contain', 'Your registration was successful!');
  }

  assertInvalidEmail() {
    this.modalMessage.should('contain', 'Email must be a valid email.');
  }

  assertInvalidPassword() {
    this.modalMessage.should(
      'contain',
      `Password must be 8 characters long and include 1 number, 
      1 uppercase letter, and 1 lowercase letter.`
    );
  }
}

export default SignUpPageObject;
