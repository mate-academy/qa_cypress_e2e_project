import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  typeEmail(email) {
    cy.findByPlaceholder('Email')
      .type(email);
  }

  typePassword(password) {
    cy.findByPlaceholder('Password')
      .type(password);
  }

  clickSignInBtn() {
    cy.contains('.btn', 'Sign in')
      .click();
  }

  assertMessageWrongEmailData() {
    cy.get('.swal-title')
      .should('contain', 'Login failed!');
    cy.get('.swal-text')
      .should('contain', 'Email must be a valid email.');
  }

  assertMessageWrongPasswordData() {
    cy.get('.swal-title')
      .should('contain', 'Login failed!');
    cy.get('.swal-text')
      .should('contain', 'Invalid user credentials.');
  }

  assertMessageEmptyEmail() {
    cy.get('.swal-title')
      .should('contain', 'Login failed!');
    cy.get('.swal-text')
      .should('contain', 'Email field required.');
  }

  assertMessageEmptyPassword() {
    cy.get('.swal-title')
      .should('contain', 'Login failed!');
    cy.get('.swal-text')
      .should('contain', 'Password field required.');
  }
};

export default SignInPageObject;
