import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername (username) {
    cy.findByPlaceholder('Username').type(username);
  }

  typeEmail (email) {
    cy.findByPlaceholder('Email').type(email);
  }

  typePassword (password) {
    cy.findByPlaceholder('Password').type(password);
  }

  clickSignUpBtn() {
    cy.contains('.btn', 'Sign up')
      .click();
  }

  successfulSignUpMessage() {
    cy.get('.swal-title').should('contain', 'Welcome!');
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
    cy.get('.swal-button').click();
  }

  MessageUsernameRequired() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Username field required.');
    cy.get('.swal-button').click();
  }

  MessageEmailRequired() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email field required.');
    cy.get('.swal-button').click();
  }

  MessagePasswordRequired() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password field required.');
    cy.get('.swal-button').click();
  }

  MessageInvalidEmail() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
    cy.get('.swal-button').click();
  }

  MessageInvalidPassword() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
    cy.get('.swal-button').click();
  }
}

export default SignUpPageObject;
