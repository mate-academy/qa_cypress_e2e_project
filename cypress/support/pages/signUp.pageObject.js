import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataQa('username-sign-up');
  }

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  get errorMessages() {
    return cy.getByDataQa('error-messages');
  }

  typeUsername(username) {
    return this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    return this.emailField.clear().type(email);
  }

  typePassword(password) {
    return this.passwordField.clear().type(password);
  }

  fillForm({ username, email, password }) {
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
  }

  clickSignUpBtn() {
    return this.signUpBtn.click();
  }
}

export default SignUpPageObject;
