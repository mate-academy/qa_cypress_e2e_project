import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return this.getByQa('sign-in-email');
  }

  get passwordField() {
    return this.getByQa('sign-in-password');
  }

  get signInBtn() {
    return this.getByQa('sign-in-submit');
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

  signIn(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignInBtn();
  }

  assertLoginFailed(message) {
    this.assertAlertContains('Login failed!');
    cy.get('.swal-text').should('contain.text', message);
  }
}

export default SignInPageObject;
