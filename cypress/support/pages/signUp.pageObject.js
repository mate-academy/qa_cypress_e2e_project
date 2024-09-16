import PageObject from '../PageObject';

class signUpPageObject extends PageObject {
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

  signUpButton() {
    cy.contains('.btn', 'Sign up').click();
  }

  registationMessage() {
    cy.contains('.swal-title', 'Welcome').should('exist');
    cy.contains('.swal-text', 'Your registration was successful!')
      .should('exist');
  }

  errorEmailTaken() {
    cy.contains('.swal-text', 'Email already taken.').should('exist');
  }

  errorUsernameRequired() {
    cy.contains('.swal-text', 'Username field required.').should('exist');
  }

  errorEmailRequired() {
    cy.contains('.swal-text', 'Email field required.').should('exist');
  }

  errorPasswordRequired() {
    cy.contains('.swal-text', 'Password field required.').should('exist');
  }

  errorWrongEmail() {
    cy.contains('.swal-text', 'Email must be a valid email.').should('exist');
  }

  errorWrongPassword() {
    // eslint-disable-next-line max-len
    cy.contains('.swal-text', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
      .should('exist');
  }

  errorUsernameTaken() {
    cy.contains('.swal-text', 'Username already taken.').should('exist');
  }

  errorTitle() {
    cy.contains('.swal-title', 'Registration failed!').should('exist');
  }

  closeAlert() {
    cy.contains('.swal-button', 'OK').click();
  }
};

export default signUpPageObject;
