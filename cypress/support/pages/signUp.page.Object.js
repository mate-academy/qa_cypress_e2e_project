import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/user/register';

  get usernameField() {
    return cy.getByDataCy('signup-username');
  }

  get emailField() {
    return cy.getByDataCy('signup-email');
  }

  get passwordField() {
    return cy.getByDataCy('signup-password');
  }

  get signUpBtn() {
    return cy.getByDataCy('signup-btn');
  }

  typeUsername(username) {
    this.usernameField.type(username);
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
