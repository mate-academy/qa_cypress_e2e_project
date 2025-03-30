import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataCy('username-field-register');
  }

  get emailField() {
    return cy.getByDataCy('email-field-register');
  }

  get passwordField() {
    return cy.getByDataCy('password-field-register');
  }

  get signUpBtn() {
    return cy.getByDataCy('signUp-button-register');
  }

  get errorMessage() {
    return cy.get('.swal-title');
  }

  // commands to fill fields
  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  // commands to click on buttons
  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  // commands to asserts
  assertContainErrorMessage() {
    this.errorMessage.should('contain', 'Registration failed!');
  }
}

export default SignUpPageObject;
