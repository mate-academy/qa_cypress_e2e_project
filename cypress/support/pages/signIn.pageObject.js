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
    return cy.getByDataQa('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  clearEmail() {
    this.emailField.clear();
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clearPassword() {
    this.passwordField.clear();
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  login(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignInBtn();
  }

  assertPageContainsCredsErrorMessage() {
    this.errorText.should('contain.text', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
