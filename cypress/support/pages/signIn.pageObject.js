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

  get allertMessage() {
    return cy.get('.swal-modal');
  }

  get okButtonOnAllertMessage() {
    return cy.get('.swal-button');
  }

  assertAllertMessage(message) {
    this.allertMessage.should('contain', message);
    this.okButtonOnAllertMessage.click();
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
}

export default SignInPageObject;
