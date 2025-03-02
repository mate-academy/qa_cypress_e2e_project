import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('signup-username-field');
  }

  get emailField() {
    return cy.getByDataCy('signup-email-field');
  }

  get passwordField() {
    return cy.getByDataCy('signup-password-field');
  }

  get signUpBtn() {
    return cy.getByDataCy('signup-button');
  }

  get modalMessage() {
    return cy.get('.swal-modal');
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

  assertSuccessfulMessage() {
    this.modalMessage.should('contain', 'Your registration was successful!');
  }

  assertErrorMessage() {
    this.modalMessage.should('contain', 'Email already taken.');
  }

  assertSignUpPage() {
    cy.url().should('include', this.url);
  }
}

export default SignUpPageObject;