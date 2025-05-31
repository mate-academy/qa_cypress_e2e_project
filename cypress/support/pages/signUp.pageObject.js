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

  get errorMessage() {
    return cy.get('.swal-text');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  assertErrorMessage(message) {
    this.errorMessage.should('contain', message);
  }

  assertUrl() {
    cy.url().should('include', '/register');
  }
}

export default SignUpPageObject;
