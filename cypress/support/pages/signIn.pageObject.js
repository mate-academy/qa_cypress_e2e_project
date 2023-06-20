import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    // return cy.getByDataCy('email-sign-in');
    return cy.get(':nth-child(1) > .form-control');
  }

  get passwordField() {
    // return cy.getByDataCy('password-sign-in');
    return cy.get(':nth-child(2) > .form-control');
  }

  get signInBtn() {
    // return cy.getByDataCy('sign-in-btn');
    return cy.get('.btn');
  }
}

export default SignInPageObject;
