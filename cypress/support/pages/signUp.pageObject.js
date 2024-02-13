import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typeWrongEmail(wrongEmail) {
    this.emailField.type(wrongEmail);
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeWrongPassword(wrongPassword) {
    this.passwordField.type(wrongPassword);
  }

  get signUpBtn() {
    return cy.getByDataCy('btn-sign-up');
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
