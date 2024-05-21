import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/user/register';

  get userNameField() {
    return cy.getByDataCy('username-sign-in');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.get('[data-cy="sign-in-btn"]').contains('Sign up');
  }

  typeUserName(username) {
    this.userNameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    cy.get('[data-cy="sign-in-btn"]').contains('Sign up').click();
  }
}

export default SignUpPageObject;
