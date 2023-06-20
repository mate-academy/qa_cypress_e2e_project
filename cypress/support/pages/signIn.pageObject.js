import PageObject from '../PageObject';
class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('signInEmail');
  }

  get passwordField() {
    return cy.getByDataCy('passwordSignIn');
  }

  get signInBtn() {
    return cy.getByDataCy('signInBtn');
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
