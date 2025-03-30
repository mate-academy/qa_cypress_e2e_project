import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  get userNameField() {
    return cy.getByDataQa('username-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typeUsername(username) {
    this.userNameField
      .type(username);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  assertSuccessfulRegistration() {
    cy.get('.swal-text')
      .should('contain', 'Your registration was successful!');
  }

  assertUserNameBlank() {
    cy.get('.swal-text')
      .should('contain', 'Username field required.');
  }

  assertEmailBlankError() {
    cy.get('.swal-text')
      .should('contain', 'Email field required.');
  }

  assertPasswordBlankError() {
    cy.get('.swal-text')
      .should('contain', 'Password field required.');
  }

  assertInvalidEmail() {
    cy.get('.swal-text')
      .should('contain', 'Email must be a valid email.');
  }

  assertShortPassword() {
    cy.get('.swal-text')
      .should('contain', 'Password must be 8 characters long');
  }

  checkPasswordAsterisks() {
    this.passwordField.matchImageSnapshot();
  }
}
export default SignUpPageObject;
