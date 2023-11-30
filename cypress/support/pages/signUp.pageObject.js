import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataQaPlaceholder('Username');
  }

  get userEmailField() {
    return cy.getByDataQaPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByDataQaPlaceholder('Password');
  }

  get signUpBtn () {
    return cy.getByDataQaBtn('btn btn-lg btn-primary pull-xs-right');
  }

  get successfulSignUp() {
    return cy.getByDataQaPlaceholder('password-sign-up');
  }

  get Message() {
    return cy.get('.swal-text');
  }

  get modalOkBtn() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  typeuserName(username) {
    this.userNameField
      .type(username);
  }

  typeuserEmail(email) {
    this.userEmailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickOnSignUpBtn() {
    this.signUpBtn.click();
  }

  assertSuccessfulSignUp() {
    this.Message
      .should('contain', 'Your registration was successful!');
  }

  clickOnModalOkBtn() {
    this.modalOkBtn.click();
  }

  assertEmptyUsername() {
    this.Message
      .should('contain', 'Username field required.');
  }

  assertEmptyEmail() {
    this.Message
      .should('contain', 'Email field required.');
  }

  assertEmptyPassword() {
    this.Message
      .should('contain', 'Password field required.');
  }

  assertTakenEmail() {
    this.Message
      .should('contain', 'Email already taken.');
  }

  assertWrongEmail() {
    this.Message
      .should('contain', 'Email must be a valid email.');
  }

  assertWrongPassword() {
    this.Message.should('include.text', 'Password must be 8 characters ' +
     'long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }
}

export default SignUpPageObject;
