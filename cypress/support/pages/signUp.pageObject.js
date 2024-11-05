import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('sign-up-username-field');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  get emailField() {
    return cy.getByDataCy('sign-up-email-field');
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  get passwordField() {
    return cy.getByDataCy('sign-up-password-field');
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  assertSignUpFailed() {
    cy.get('.swal-modal').should('contain', 'Registration failed!');
  }
}

export default SignUpPageObject;
