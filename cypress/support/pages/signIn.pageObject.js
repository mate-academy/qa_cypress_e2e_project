import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-field-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  get modalWindow() {
    return cy.get('.swal-modal');
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

  assertUnSuccessModal(field) {
    this.modalWindow.should('contain', 'Login failed!');
    this.modalWindow.should('contain', field + ' field required.');
  }

  assertUnSuccessLogin() {
    this.modalWindow.should('contain', 'Login failed!');
    this.modalWindow.should('contain', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
