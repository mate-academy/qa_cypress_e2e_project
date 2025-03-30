import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.contains('.btn', 'Sign up');
  }

  get signUpFailedMessage() {
    cy.wait(1000);
    return cy.get(`[role="dialog"]`);
  }
}

  

export default SignUpPageObject;