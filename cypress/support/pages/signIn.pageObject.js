import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return this.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return this.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return this.getByDataCy('sign-in-btn');
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
