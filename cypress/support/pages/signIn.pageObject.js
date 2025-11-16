import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/user/login';

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get signInBtn() {
    return cy.contains('.btn', 'Sign in');
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
    return cy.contains('li', 'email or password:')
      .contains('li', 'is invalid')
      .should('exist');
  }
}

export default SignInPageObject;
