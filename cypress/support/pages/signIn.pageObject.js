import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '#/login';

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }

  assertModalWindow(message) {
    this.modalWindow.should('contain', message);
  }
}

export default SignInPageObject;
