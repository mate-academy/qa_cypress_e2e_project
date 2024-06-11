import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
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

  clickSignInBtn() {
    this.signUpBtn
      .click();
  }

  assertRequiredUsername() {
    cy.get('.swal-text').should('contain', 'Username field required.');
  }

  assertRequiredEmail() {
    cy.get('.swal-text').should('contain', 'Email field required.');
  }

  assertRequiredPassword() {
    cy.get('.swal-text').should('contain', 'Password field required.');
  }

  assertAlreadyExistEmail() {
    cy.get('.swal-text').should('contain', 'Email already taken.');
  }

  assertAlreadyExistUsername() {
    cy.get('.swal-text').should('contain', 'Username already taken.');
  }

  assertInvalidEmail() {
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  }

  assertInvalidUsername() {
    cy.get('.swal-text')
      .should('contain', 'Username must be a valid username.');
  }

  assertInvalidPassword() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
  }
}

export default SignUpPageObject;
