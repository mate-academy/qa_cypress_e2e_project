import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNamelField() {
    return cy.getByDataCy('username-field-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-field-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-field-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  typeUsername(username) {
    this.userNamelField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }
}

export default SignUpPageObject;
