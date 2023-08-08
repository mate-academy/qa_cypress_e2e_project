import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.findByPlaceholder('Username').type(username);
  }

  typeEmailRegsrt(email) {
    cy.findByPlaceholder('Email').type(email);
  }

  typePasswordRegsrt(password) {
    cy.findByPlaceholder('Password').type(password);
  }

  clickSignUpBtn() {
    cy.contains('.btn', 'Sign up').click();
  }

  successMessage() {
    cy.contains('.swal-modal', 'Your registration was successful!')
      .should('exist');
    cy.get('.swal-button').click();
  }

  errorUsernameMessageAlert() {
    cy.contains('.swal-modal', 'Username field required.')
      .should('exist');
    cy.get('.swal-button').click();
  }

  errorEmailMessageAlert() {
    cy.contains('.swal-modal', 'Email field required.')
      .should('exist');
    cy.get('.swal-button').click();
  }

  errorPasswordMessageAlert() {
    cy.contains('.swal-modal', 'Password field required.')
      .should('exist');
    cy.get('.swal-button').click();
  }

  errorInvalidEmailMessage() {
    cy.contains('.swal-modal', 'Email must be a valid email.')
      .should('exist');
    cy.get('.swal-button').click();
  }

  errorInvalidPasswordMessage() {
    // eslint-disable-next-line max-len
    cy.contains('.swal-modal', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
      .should('exist');
    cy.get('.swal-button').click();
  }
};

export default SignUpPageObject;
