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
    return cy.getByDataCy('auth-submit-btn');
  }

  register(username, email, password) {
    this.usernameField.type(username);
    this.emailField.type(email);
    this.passwordField.type(password);
    this.signUpBtn.click();
  }
}

export default SignUpPageObject;
