
import PageObject from '../PageObject';
import faker from 'faker';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  typeInvalidEmail() {
    return faker.random.alphaNumeric(10) + '!@male.com';
  }

  typeInvalidPassword() {
    return 'wrongpassword123';
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertLoginFailed() {
    cy.get('.swal-title').should('contain.text', 'Login failed!');
  }

  assertInvalidCreds() {
    cy.get('.swal-text').should('contain.text', 'Invalid user credentials.');
  }

  clickOkBtn() {
    cy.get('.swal-button').click();
  }
}

export default SignInPageObject;
