import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataQA('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataQA('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataQA('sign-in-btn');
  }
}

export default SignInPageObject;
