/// <reference types='cypress' />

class SignUpPageObject {
  visit() {
    cy.visit('/#/register');
  }

  findByPlaceholder(placeholder) {
    return cy.get(`[placeholder="${placeholder}"]`, { timeout: 10000, retryInterval: 1000 }).should('be.visible');
  }

  get usernameField() {
    return this.findByPlaceholder('Username');
  }

  get emailField() {
    return this.findByPlaceholder('Email');
  }

  get passwordField() {
    return this.findByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.contains('button', 'Sign up');
  }

  typeUsername(username) {
    if (username) {
      this.usernameField.type(username);
    }
  }

  typeEmail(email) {
    if (email) {
      this.emailField.type(email);
    }
  }

  typePassword(password) {
    if (password) {
      this.passwordField.type(password);
    }
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }
}

export default SignUpPageObject;
