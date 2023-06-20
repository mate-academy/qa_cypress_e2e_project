import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  clickSignIn() {
    this.signInBtn
      .click();
  }

  checkLogIn(message) {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', message);
  }
}

export default SignInPageObject;
