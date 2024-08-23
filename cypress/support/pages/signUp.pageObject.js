import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataQa('email-field');
  }

  get usernameField() {
    return cy.getByDataQa('username-field');
  }

  get passwordField() {
    return cy.getByDataQa('password-field');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  get failMessage() {
    return cy.get('.swal-modal');
  }

  assertRegistrationFailedMessage(message) {
    this.failMessage
      .should('contain', message);
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
}

export default SignUpPageObject;
