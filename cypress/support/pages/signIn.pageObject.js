import PageObject from './PageObject';

class SignInPageObject extends PageObject {
  url = '/login';

  get emailField() {
    return cy.get('[data-qa="email-input"]');
  }

  get passwordField() {
    return cy.get('[data-qa="password-input"]');
  }

  get signInBtn() {
    return cy.get('[data-qa="signin-button"]');
  }

  visit() {
    this.visit(this.url);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(password) {
    this.passwordField.clear().type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }
}

export default SignInPageObject;
