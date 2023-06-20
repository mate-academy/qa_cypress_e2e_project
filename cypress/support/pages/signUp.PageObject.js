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

  get signInBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  assertSuccessfulSignUp() {
    cy.get('.swal-title').should('contain', 'Welcome!');
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
  }

  clickOnOkBtnWindow() {
    cy.get('.swal-button').should('contain', 'OK').click();
  }

  assertUsername(username) {
    cy.getByDataQa('username-link').should('contain', username);
  }

  assertFailedSignUpEmptyUsername() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Username field required.');
  }

  assertFailedSignUpInvalidEmail() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  }

  assertFailedSignUpInvalidPassword() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }
}

export default SignUpPageObject;
