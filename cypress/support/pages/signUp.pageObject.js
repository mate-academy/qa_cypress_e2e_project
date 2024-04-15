import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataCy('username-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get ModalWindow() {
    return cy.get('.swal-modal');
  }

  assertModalWindow(message) {
    this.ModalWindow.should('contain', message);
  }
}

export default SignUpPageObject;
