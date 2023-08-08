import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  enterUsername(username) {
    cy.findByPlaceholder('Username').type(username);
  }

  enterEmail(email) {
    cy.findByPlaceholder('Email').type(email);
  }

  enterPassword(password) {
    cy.findByPlaceholder('Password').type(password);
  }

  clickSignUpBtn() {
    cy.contains('.btn', 'Sign up').click();
  }

  assertSuccessfulRegistr() {
    cy.get('.swal-modal')
      .should('contain', 'Your registration was successful!');
  }

  assertEmptyUsernameMessage() {
    cy.get('.swal-modal')
      .should('contain', 'Username field required.');
  }

  assertInvalidPasswordMessage() {
    cy.get('.swal-modal')
      // eslint-disable-next-line max-len
      .should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }
};

export default SignUpPageObject;
