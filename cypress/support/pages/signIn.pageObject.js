/* eslint-disable max-len */
import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  typeEmail(email) {
    cy.getByPlaceholder('Email').type(email);
  }

  typePassword(password) {
    cy.getByPlaceholder('Password').type(password);
  }

  clickSignInBtn() {
    cy.contains('.btn', 'Sign in').click();
  }

  assertInvalidLogin() {
    cy.get('.swal-modal').should('contain', 'Invalid user credentials.');
  }

  assertLoginWithEmptyEmailField() {
    cy.get('.swal-modal').should('contain', 'Email field required.');
  }

  assertLoginWithEmptyPasswordField() {
    cy.get('.swal-modal').should('contain', 'Password field required.');
  }
}

export default SignInPageObject;
