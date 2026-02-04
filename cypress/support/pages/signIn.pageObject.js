import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('login-email');
  }

  get passwordField() {
    return cy.getByDataQa('login-password');
  }

  get signInButton() {
    return cy.getByDataQa('login-submit');
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

  clickSignInBtn() {
    this.signInButton.click();
  }
}

export default SignInPageObject;
