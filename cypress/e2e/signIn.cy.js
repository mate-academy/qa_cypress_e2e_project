import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.get('[data-cy="email-sign-in"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password-sign-in"]');
  }

  get signInButton() {
    return cy.get('[data-cy="sign-in-btn"]');
  }

  get errorTitle() {
    return cy.get('[data-cy="login-error-title"]');
  }

  visit() {
    cy.visit(this.url);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickOnSignInButton() {
    this.signInButton.click();
  }

  checkUrlAfterLogin(username) {
    cy.url().should('include', `/profile/${username}`);
  }

  checkErrorMessageVisible() {
    this.errorTitle.should('be.visible');
  }
}

export default SignInPageObject;
