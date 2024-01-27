import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpButton() {
    return cy.getByDataCy('sign-up-button');
  }

  get modalRegistrarionError() {
    return cy.get('.swal-modal');
  }

  get confirmErrorButton() {
    return cy.get('.swal-button--confirm');
  }

  clickConfirmErrorButton() {
    this.confirmErrorButton
      .click();
  }

  typeUserName(username) {
    this.userNameField
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

  clickSignUpButton() {
    this.signUpButton
      .click();
  }

  assertModalRegError() {
    this.modalRegistrarionError
      .should('be.visible');
  }

  assertModalUserNameError() {
    this.modalRegistrarionError
      .should('contain', 'Registration failed!')
      .and('contain', 'Username field required.');
  }

  assertModalEmailError() {
    this.modalRegistrarionError
      .should('contain', 'Registration failed!')
      .and('contain', 'Email field required.');
  }

  assertModalPasswordError() {
    this.modalRegistrarionError
      .should('contain', 'Registration failed!')
      .and('contain', 'Password field required.');
  }
}

export default SignUpPageObject;
