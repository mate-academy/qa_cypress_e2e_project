import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get modalTitle() {
    return cy.get('.swal-text');
  }

  get modalAccept() {
    return cy.get('.swal-button');
  }

  clickOnTheModalOk() {
    this.modalAccept.click();
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  checkSuccess(text) {
    this.modalTitle.should('contain.text', text);
  }

  checkFail(text) {
    this.modalTitle.should('contain.text', text);
  }
}

export default SignUpPageObject;
