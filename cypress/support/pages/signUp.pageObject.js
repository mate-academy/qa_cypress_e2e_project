import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get('input[placeholder="Username"]');
  }

  get emailField() {
    return cy.get('input[placeholder="Email"]');
  }

  get passwordField() {
    return cy.get('input[placeholder="Password"]');
  }

  get signUpBtn() {
    return cy.contains('button', 'Sign up');
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
