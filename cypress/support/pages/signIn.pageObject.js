import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQA('email-sign-in-field');
  }

  get passwordField() {
    return cy.getByDataQA('password-sign-in-field');
  }

  get signInBtn() {
    return cy.getByDataQA('sign-in-btn');
  }

  checkFailedSignIn() {
    cy.get('.swal-modal')
      .should('contain', 'Login failed!');
  }

  closeModalWindow() {
    cy.get('.swal-button')
      .click();
  }
}

export default SignInPageObject;
