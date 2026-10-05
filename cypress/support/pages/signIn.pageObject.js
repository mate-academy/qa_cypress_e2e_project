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

  signIn(user) {
    this.typeEmail(user.email);
    this.typePassword(user.password);
    this.clickSignInBtn();
  }

  typeEmail(email) {
    this.emailField.clear();
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField.clear();
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }
}

export default SignInPageObject;
