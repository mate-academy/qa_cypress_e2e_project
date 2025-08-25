import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() { return this.getByQa('email-sign-in'); }
  get passwordField() { return this.getByQa('password-sign-in'); }
  get signInBtn() { return this.getByQa('sign-in-btn'); }
  get errorMessages() { return this.getByQa('error-messages'); }

  typeEmail(email) { this.emailField.type(email); }
  typePassword(password) { this.passwordField.type(password); }
  clickSignInBtn() { this.signInBtn.click(); }
  assertErrorContains(text) { this.errorMessages.should('contain.text', text); }
}

export default SignInPageObject;
