import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get('[data-qa="username-sign-up"]');
  }
  
  get emailField() {
    return cy.get('[data-qa="email-sign-up"]');
  }

  get passwordField() {
    return cy.get('[data-qa="password-sign-up"]');
  }

  get signUpBtn() {
    return cy.get('[data-qa="sign-up-btn"]');
  }

  get modalRegistrationFailed() {
    return cy.get('[class="swal-modal"]');
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

  assertSuccessfulRegistration() {
    this.modalRegistrationFailed
      .should('contain', "Your registration was successful!");
  }

  assertUnsuccessfulRegistration(message) {
    this.modalRegistrationFailed
      .should('contain', message);
  }
}

export default SignUpPageObject;