import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    // return cy.getByDataCy('email-sign-in');
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    // return cy.getByDataCy('password-sign-in');
    return cy.getByPlaceholder('Password');
  }

  get signInBtn() {
    // return cy.getByDataCy('sign-in-btn');
    return cy.contains('.btn', 'Sign in');
  }
}

export default SignInPageObject;
