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

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get errorMessage() {
    return cy.getByDataCy('error-message');
  }

  typeUserName(username) {
    this.userNameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  errorEmailIsTaken() {
    cy.get('.swal-modal').should('contain', 'Email already taken.');
  }

  errorIsInvalidEmail() {
    cy.get('.swal-modal').should('contain', 'Email must be a valid email.');
  }

  errorIsInvalidPassword() {
    cy.get('.swal-modal').should('contain', 'Password must be');
  }
}

export default SignUpPageObject;
