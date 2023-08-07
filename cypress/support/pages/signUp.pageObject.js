import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  addUsername (username) {
    cy.findByPlaceholder('Username').type(username);
  }

  addEmail (email) {
    cy.findByPlaceholder('Email').type(email);
  }

  addPassword (password) {
    cy.findByPlaceholder('Password').type(password);
  }

  clickSignUpBtn() {
    cy.contains('.btn', 'Sign up')
      .click();
  }

  popUpWindow() {
    cy.get('.swal-modal').should('exist');
  }

  assertRegisterError() {
    cy.get('.swal-modal')
      .should('contain', 'Registration failed!');
  }

  assertRegisterSuccess() {
    cy.get('.swal-modal')
      .should('contain', 'Your registration was successful!');
  }

  closePopUpWindow() {
    cy.get('.swal-button')
      .click();
  }

  assertEmptyUsernameError() {
    cy.get('.swal-modal')
      .should('contain', 'Username field required.');
  }

  assertInvalidEmailError() {
    cy.get('.swal-modal')
      .should('contain', 'Email must be a valid email.');
  }

  assertTakenEmailError() {
    cy.get('.swal-modal')
      .should('contain', 'Email already taken.');
  }

  assertInvalidPasswordError() {
    cy.get('.swal-modal')
      // eslint-disable-next-line max-len
      .should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }
}

export default SignUpPageObject;
