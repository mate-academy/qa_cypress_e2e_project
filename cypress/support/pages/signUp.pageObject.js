import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
    url = '/#/register';

    get usernameField() {
      return cy.getByDataQa('username-register');
    }
  
    get emailField() {
      return cy.getByDataQa('email-register');
    }
  
    get passwordField() {
      return cy.getByDataQa('password-register');
    }
  
    get signUpBtn() {
      return cy.getByDataQa('signUp-button');
    }
  }
  
  export default SignUpPageObject;