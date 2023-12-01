import PageObject from '../PageObject';

export class SignInPageObject extends PageObject {
  url = '/login';

  get emailField() {
    return cy.getByDataQa('sign-in-email-field');
  }

  get passwordField() {
    return cy.getByDataQa('sign-in-password-field');
  }

  get signInBtn() {
    return cy.getByDataQa('sign-in-btn');
  }

  get modalMessage() {
    return cy.get('.swal-text');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  assertInvalidCredentials() {
    this.modalMessage.should('contain', 'Invalid user credentials.');
  }
}
