import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataQa('sign-up-username');
  }

  get emailField() {
    return cy.getByDataQa('sign-up-email');
  }

  get passwordField() {
    return cy.getByDataQa('sign-up-password');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-button');
  }

  get welcomePopUp() {
    return cy.get('.swal-modal');
  }

  get assertSignUp() {
    return cy.getByDataQa('header-username');
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

  welcomeMessageSignUp(welcomeMessage) {
    this.welcomePopUp
      .should('contain', welcomeMessage);
  }

  assertUsername(username) {
    this.assertSignUp
      .should('contain', username);
  }
}

export default SignUpPageObject;
