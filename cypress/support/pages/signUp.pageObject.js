import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.findByPlaceholder('Username').type(username);
  }

  typeEmail(email) {
    cy.findByPlaceholder('Email').type(email);
  }

  typePassword(password) {
    cy.findByPlaceholder('Password').type(password);
  }

  clickOnSignUpBtn() {
    cy.contains('button', 'Sign up').click();
  }

  successfulRegistrationMessage() {
    // eslint-disable-next-line max-len
    cy.get('.swal-modal').should('contain', 'Your registration was successful!');
    cy.contains('button', 'OK').click();
  }

  emptyUsernameAlert() {
    cy.get('.swal-modal').should('contain', 'Username field required.');
  }

  emptyEmailAlert() {
    cy.get('.swal-modal').should('contain', 'Email field required.');
  }

  emptyPasswordAlert() {
    cy.get('.swal-modal').should('contain', 'Password field required.');
  }

  invalidEmailAlert() {
    cy.get('.swal-modal').should('contain', 'Email must be a valid email.');
  }

  invalidPasswordAlert() {
    cy.get('.swal-modal')
    // eslint-disable-next-line max-len
      .should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }
}

export default SignUpPageObject;
