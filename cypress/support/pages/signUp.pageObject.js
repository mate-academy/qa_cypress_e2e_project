import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataCy('username/register');
  }

  get emailField() {
    return cy.getByDataCy('email/register');
  }

  get passwordField() {
    return cy.getByDataCy('password/register');
  }

  get signUpBtn() {
    return cy.getByDataCy('registerBtn');
  }
}

export default SignUpPageObject;
