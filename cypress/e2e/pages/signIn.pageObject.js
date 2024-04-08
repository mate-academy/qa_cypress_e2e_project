import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  login(email, username, password) {
    cy.login(email, username, password);
  }

  register(email, username, password) {
    cy.register(email, username, password);
  }

  assertSwalFail() {
    cy.contains('Invalid user credentials.').should('be.visible');
  }
}

export default SignInPageObject;
