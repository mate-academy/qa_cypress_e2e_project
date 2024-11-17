import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('Email');
  }

  get passwordField() {
    return cy.getByDataCy('Password');
  }

  get signInBtn() {
    return cy.get('.btn');
  }

  get errorMessage() {
    return cy.get('.error-messages');
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

  assertErrorMessage() {
    this.errorMessage
      .should('contain.text', 'email or password');
  }
}

export default SignInPageObject;
