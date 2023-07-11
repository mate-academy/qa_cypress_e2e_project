import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get signInBtn() {
    return cy.contains('.btn', 'Sign in');
  }

  get loginFailedMessage() {
    cy.wait(1000);
    return cy.get(`[role="dialog"]`);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }
}

  

export default SignInPageObject;
