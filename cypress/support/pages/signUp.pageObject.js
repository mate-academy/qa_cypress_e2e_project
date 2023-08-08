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

  clickSignUpBtn() {
    cy.contains('.btn', 'Sign up').click();
  }

  successMessage() {
    cy.contains('.swal-modal', 'Your registration was successful!')
      .should('exist');
    cy.get('.swal-button').click();
  }

  errorEmptyUsername() {
    cy.contains('.swal-modal', 'Username field required.')
      .should('exist');
    cy.get('.swal-button').click();
  }

  errorEmptyEmail() {
    cy.contains('.swal-modal', 'Email field required.')
      .should('exist');
    cy.get('.swal-button').click();
  }

  errorEmptyPassword() {
    cy.contains('.swal-modal', 'Password field required.')
      .should('exist');
    cy.get('.swal-button').click();
  }
};

export default SignUpPageObject;
