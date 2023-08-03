import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn').click();
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }
}

export default SignUpPageObject;
