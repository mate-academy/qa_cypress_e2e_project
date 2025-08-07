class SignUpPageObject {
  visit() {
    this.signUpLink.click();
  }

  get signUpLink() {
    return cy.get('[data-qa=sign-up-link]');
  }

  get usernameField() {
    return cy.get('[data-qa=sign-up-username-input]');
  }

  get emailField() {
    return cy.get('[data-qa=sign-up-email-input]');
  }

  get passwordField() {
    return cy.get('[data-qa=sign-up-password-input]');
  }

  get signUpButton() {
    return cy.get('[data-qa=sign-up-button]');
  }

  get errorMessage() {
    return cy.get('[data-qa=sign-up-error]');
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

  clickSignUpButton() {
    this.signUpButton.click();
  }

  assertSignUpError() {
    this.errorMessage.should('be.visible');
  }
}

export default SignUpPageObject;
