import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQa('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-button');
  }

  get modalError() {
    return cy.get('[class=swal-title]');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typeWrongEmail(email) {
    this.emailField.type(`wrong${email}`);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeWrongPassword(password) {
    this.passwordField.type(`wrong${password}`);
  }

  clickSignInButton() {
    this.signInBtn.click();
  }

  assertModalContainsError() {
    this.modalError.should('contain.text', 'Login failed!');
  }
}

export default SignInPageObject;
