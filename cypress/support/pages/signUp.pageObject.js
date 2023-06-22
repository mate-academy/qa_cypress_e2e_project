import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  fillUsernameField(username) {
    this.usernameField.type(username);
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  clickOnSignUpBtn() {
    this.signUpBtn.click();
  }
}

export default SignUpPageObject;

