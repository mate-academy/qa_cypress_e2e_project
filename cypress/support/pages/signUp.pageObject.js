import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataCy('emailField');
  }

  get passwordField() {
    return cy.getByDataCy('passwordField');
  }

  get usernameField() {
    return cy.getByDataCy('usernameField');
  }

  get submitButton() {
    return cy.getByDataCy('submitButton');
  }

  get popUpTitle() {
    return cy.get('.swal-title');
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSubmitButton() {
    this.submitButton
      .click();
  }

  assertPopUpRegistrationFailed() {
    this.popUpTitle
      .should('contain', 'Registration failed!');
  }
}

export default SignUpPageObject;
