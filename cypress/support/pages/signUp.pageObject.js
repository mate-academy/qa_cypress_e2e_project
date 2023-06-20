import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    // return cy.getByDataCy('username-sign-up');
    return cy.get(':nth-child(1) > .form-control');
  }

  get emailField() {
    // return cy.getByDataCy('email-sign-up');
    return cy.get(':nth-child(2) > .form-control');
  }

  get passwordField() {
    // return cy.getByDataCy('password-sign-up');
    return cy.get(':nth-child(3) > .form-control');
  }

  get signUpBtn() {
    // return cy.getByDataCy('sign-up-btn');
    return cy.get('.btn');
  }

  getValidationErrors() {
    return cy.get('.validation-error');
  }
}

export default SignUpPageObject;
