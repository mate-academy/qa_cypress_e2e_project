import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
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

  assertUsernameRequiredModal() {
    cy.contains('.swal-modal', 'Username field required.')
      .should('be.visible');
  }

  assertPasswordRequiredModal() {
    cy.contains('.swal-modal', 'Password field required.')
      .should('be.visible');
  }

  assertEmailRequiredModal() {
    cy.contains('.swal-modal', 'Email field required.')
      .should('be.visible');
  }

  assertSuccessfulRegistrationModal() {
    cy.contains('.swal-modal', 'Your registration was successful!')
      .should('be.visible');
  }

  assertEmailTakenModal() {
    cy.contains('.swal-modal', 'Email already taken.')
      .should('be.visible');
  }

  assertUsernameTakenModal() {
    cy.contains('.swal-modal', 'Username already taken.')
      .should('be.visible');
  }

  assertInvalidPasswordModal() {
    cy.contains('.swal-modal',
      'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.')
      .should('be.visible');
  }

  assertInvalidEmailModal() {
    cy.contains('.swal-modal', 'Email must be a valid email.')
      .should('be.visible');
  }
}

export default SignUpPageObject;