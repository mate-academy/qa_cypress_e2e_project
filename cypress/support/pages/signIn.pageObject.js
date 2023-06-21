import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = 'localhost:1667/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  checkMessage() {
    cy.get('.swal-modal').should('contain', 'Login failed!');
  }

  closeModalWindow() {
    cy.get('.swal-button').click();
  }
}

export default SignInPageObject;
