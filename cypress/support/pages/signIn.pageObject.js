import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getCyData('email-sign-in');
  }

  get passwordField() {
    return cy.getCyData('password-sign-in');
  }

  get signInBtn() {
    return cy.getCyData('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }
}

export default SignInPageObject;
