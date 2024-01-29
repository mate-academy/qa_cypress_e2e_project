import PageObject from '../PageObject';

export class SignUpPageObject extends PageObject {
  url = '/#/register';

  get signUpLink() {
    return cy.get('[href="#/register"]');
  }

  clickOnSignUpLink() {
    this.signUpLink.click();
  }

  get emailField() {
    return cy.getByDataQa('email_field');
  }

  get passwordField() {
    return cy.getByDataQa('password_field');
  }

  get userNameField() {
    return cy.getByDataQa('username_field');
  }

  get signUpBtn() {
    return cy.getByDataQa('signup_button');
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

  assertAlreadyTakenEmail() {
    cy.get('.swal-text').should('contain', 'Email already taken.');
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
