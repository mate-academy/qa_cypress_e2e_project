import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getCyData('username_field');
  }

  get emailField() {
    return cy.getCyData('email_field');
  }

  get passwordField() {
    return cy.getCyData('password_field');
  }

  get signUpBtn() {
    return cy.getCyData('sign-in-btn');
  }
  
  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }
}

export default SignUpPageObject;