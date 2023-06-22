import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  failedSignUp() {
    cy.get('.swal-modal')
      .should('contain', 'Registration failed!');
  }

  successSignUp() {
    cy.get('.swal-modal')
      .should('contain', 'Your registration was successful!');
  }

  closeModalWindow() {
    cy.get('.swal-button')
      .click();
  }
}

export default SignUpPageObject;
