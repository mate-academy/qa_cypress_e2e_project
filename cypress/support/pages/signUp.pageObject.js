import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.get(`button:contains("Sign up")`);
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

  assertSuccessfulRegistration() {
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
  }

  assertFailedRegistartion() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
  }

  assertEmptyPassword() {
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }

  assertEmptyEmail() {
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  }

  assertEmptyUsername() {
    cy.get('.swal-text').should('contain', 'Username field required.');
  }
}

export default SignUpPageObject;
