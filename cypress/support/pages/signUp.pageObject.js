import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get('[data-cy="username-sign-up"]');
  }

  get emailField() {
    return cy.get('[data-cy="email-sign-up"]');
  }

  get passwordField() {
    return cy.get('[data-cy="password-sign-up"]');
  }

  get signUpButton() {
    return cy.get('[data-cy="sign-up-btn"]');
  }

  get errorMessages() {
    return cy.get('[data-cy="sign-up-errors"]');
  }

  visit() {
    cy.visit(this.url);
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickOnSignUpButton() {
    this.signUpButton.click();
  }

  checkUrlAfterSignUp(username) {
    cy.url().should('include', `/profile/${username}`);
  }

  checkErrorMessagesVisible() {
    this.errorMessages.should('be.visible');
  }
}

export default SignUpPageObject;
