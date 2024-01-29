import { PageObject } from '../PageObject';

export class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataCy('username-field');
  }

  typeUsernameField (username) {
    this.userNameField.type(username);
  }

  get emailField() {
    return cy.getByDataCy('email-field');
  }

  typeEmailField (typeEmail) {
    this.emailField.type(typeEmail);
  }

  get passwordField() {
    return cy.getByDataCy('password-field');
  }

  typePasswordField (typePassword) {
    this.passwordField.type(typePassword);
  }

  get signUpButton() {
    return cy.getByDataCy('sign-up-button');
  }

  clickSignUpBtn() {
    this.signUpButton.click();
  }

  get alert() {
    return cy.get('.swal-modal');
  }

  assertAlertContainMessage() {
    this.alert.should('contain', 'Your registration was successful!');
  }

  assertAlertContainErrorMessage() {
    this.alert.should('contain', 'Registration failed!');
  }

  assertAlertErrorMessage() {
    this.alert
    // eslint-disable-next-line max-len
      .should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }

  assertAlertContainEmptyUsername() {
    this.alert.should('contain', 'Username field required.');
  }

  assertAlertContainEmptyEmail() {
    this.alert.should('contain', 'Email field required.');
  }

  assertAlertContainEmptyPassword() {
    this.alert.should('contain', 'Password field required.');
  }
}
