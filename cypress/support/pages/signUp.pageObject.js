import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    // return cy.getByDataCy('username-sign-up');
    return cy.getByPlaceholder('Username');
  }

  get emailField() {
    // return cy.getByDataCy('email-sign-up');
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    // return cy.getByDataCy('password-sign-up');
    return cy.getByPlaceholder('Password');
  }

  get signUpBtn() {
    // return cy.getByDataCy('sign-up-btn');
    return cy.contains('.btn', 'Sign up');
  }

  getValidationErrors() {
    return cy.get('.validation-error');
  }
}

export default SignUpPageObject;
