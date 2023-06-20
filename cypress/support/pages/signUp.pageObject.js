import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataQa('username-sign-up');
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  clickSignUp() {
    this.signUpBtn
      .click();
  }

  checkRegistration(message) {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', message);
  }
}

export default SignUpPageObject;
