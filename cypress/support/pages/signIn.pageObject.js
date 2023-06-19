import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('emailField');
  }

  get passwordField() {
    return cy.getByDataCy('passwordField');
  }

  get signInBtn() {
    return cy.get('.btn');
  }
}

export default SignInPageObject;
