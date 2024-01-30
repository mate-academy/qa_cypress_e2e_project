import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/register';

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
    return cy.getByDataCy('btn-sign-up');
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

  typeWrongEmail(wrongEmail) {
    this.emailField.type(wrongEmail);
  }

  typeWrongPassword(wrongPassword) {
    this.passwordField.type(wrongPassword);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  assertSwalSucces() {
    cy.contains('Your registration was successful!').should('be.visible');
    cy.get('.swal-button--confirm').click();
  }

  assertSwalEmailFail() {
    cy.contains('Email must be a valid email.').should('be.visible');
  }

  assertSwalPassFail() {
    cy.contains('Password must be 8 characters long').should('be.visible');
  }

  login(email, username, password) {
    cy.login(email, username, password);
  }

  register(email, username, password) {
    cy.login(email, username, password);
  }
}

export default SignUpPageObject;
