// cypress/support/pages/signUp.pageObject.js

class SignUpPageObject {
  get nameInput() {
    return cy.get('input[placeholder="Username"]');
  }

  get emailInput() {
    return cy.get('input[placeholder="Email"]');
  }

  get passwordInput() {
    return cy.get('input[placeholder="Password"]');
  }

  get signUpButton() {
    return cy.get('button.btn.btn-lg.btn-primary.pull-xs-right');
  }

  fillName(name) {
    return this.nameInput.type(name);
  }

  fillEmail(email) {
    return this.emailInput.type(email);
  }

  fillPassword(password) {
    return this.passwordInput.type(password);
  }

  fillForm(name, email, password) {
    if (name) {
      this.nameInput.type(name);
    }
    if (email) {
      this.emailInput.type(email);
    }
    if (password) {
      this.passwordInput.type(password);
    }
  }

  submitSignUpForm() {
    return this.signUpButton.click();
  }
}

export default SignUpPageObject;
