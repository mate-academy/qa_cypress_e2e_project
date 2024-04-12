import PageObject from '../PageObject';

class SignUpPage extends PageObject {
  url = '/#/register';

  get usernamelField() {
    return cy.getByDataCy('user-name-field');
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  clickSignUpButton() {
    cy.getByDataCy('sign-up-btn').click();
  }

  typeUsername(username) {
    this.usernamelField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }
}

export default SignUpPage;
