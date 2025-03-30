import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.get('input[placeholder="Email"]');
  }

  get passwordField() {
    return cy.get('input[placeholder="Password"]');
  }

  get signInBtn() {
    return cy.contains('button', 'Sign in');
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
}

export default SignInPageObject;
