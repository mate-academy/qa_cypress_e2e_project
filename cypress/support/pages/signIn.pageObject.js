import { PageObject } from '../PageObject';

export class SignInPageObject extends PageObject {
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

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  get alert() {
    return cy.get('.swal-modal');
  }

  assertAlertEmailError() {
    this.alert.should('contain', 'Email must be a valid email.');
  }

  assertAlertErrorMessage() {
    this.alert.should('contain', 'Invalid user credentials');
  }
}
