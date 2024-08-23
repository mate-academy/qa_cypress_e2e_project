import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = `/#/register`;

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpButton() {
    return cy.getByDataCy('sign-up-button');
  }
}
export default SignUpPageObject;
