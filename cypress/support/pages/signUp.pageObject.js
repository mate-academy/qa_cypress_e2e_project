import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = 'user/register';

  get emailField() {
    return cy.getByDataCy('Email');
  }

  get passwordField() {
    return cy.getByDataCy('Password');
  }

  get usernameField() {
    return cy.getByDataCy('Username');
  }

  get signUpBtn() {
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

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  assertErrorMessageForEmail() {
    this.errorMessage
      .should('contain.text', 'This email does not seem valid.');
  }

  assertErrorMessageForUsername() {
    this.errorMessage
      .should('contain.text', 'Username must start with a ' +
      'letter, have no spaces, and be 2 - 40 characters.');
  }

  assertErrorMessageForPassword() {
    this.errorMessage
      .should('contain.text', `password:can't be blank`);
  }
}

export default SignUpPageObject;
