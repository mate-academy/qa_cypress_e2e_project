import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  fillLoginCredentials(email, password) {
    if (email) {
      this.typeEmail(email);
    }
    if (password) {
      this.typePassword(password);
    }
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }
}

export default SignInPageObject;
