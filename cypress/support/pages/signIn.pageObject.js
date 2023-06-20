import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('signInEmail');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  get passwordField() {
    return cy.getByDataCy('passwordSignIn');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  get signInBtn() {
    return cy.getByDataCy('signInBtn');
  }

  clickOnSignIn() {
    this.signInBtn
      .click();
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
