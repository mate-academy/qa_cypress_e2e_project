import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('sign-up-username');
  }
  
  get emailField() {
    return cy.getByDataCy('sign-up-email');
  }

  get passwordField() {
    return cy.getByDataCy('sign-up-password');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }
}

export default SignUpPageObject;
