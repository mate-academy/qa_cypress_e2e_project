import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-signUp');
  }

  get emailField() {
    return cy.getByDataCy('email-signUp');
  }

  get passwordField() {
    return cy.getByDataCy('password-signUp');
  }

  get signUpBtn() {
    return cy.getByDataCy('signUpBtn');
  }

  get modalWindow() {
    return cy.get('.swal-text');
  }
}

export default SignUpPageObject;
