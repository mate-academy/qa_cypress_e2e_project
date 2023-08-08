import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.findByPlaceholder('Username')
      .type(username);
  }

  typeEmail(email) {
    cy.findByPlaceholder('Email')
      .type(email);
  }

  typePassword(password) {
    cy.findByPlaceholder('Password')
      .type(password);
  }

  clickSignUpBtn() {
    cy.contains('.btn', 'Sign up')
      .click();
  }

  assertSuccessfulSignUp() {
    cy.get('.swal-title')
      .should('contain', 'Welcome!');
    cy.get('.swal-text')
      .should('contain', 'Your registration was successful!');
  }

  assertMessageEmptyUsername() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Username field required.');
  }

  assertMessageEmptyEmail() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Email field required.');
  }

  assertMessageEmptyPassword() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Password field required.');
  }

  assertMessageWrongEmail() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Email must be a valid email.');
  }

  assertMessageWrongPassword() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }

  assertMessageWrongUsername() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
    cy.get('.swal-text')
      .should('contain', 'Username must be a valid email.');
  }
};

export default SignUpPageObject;