import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  get swalModal() {
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

  assertErrorMessage(message) {
    this.swalModal.should('contain', message);
  }

  login(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignInBtn();
  }
}

export default SignInPageObject;
