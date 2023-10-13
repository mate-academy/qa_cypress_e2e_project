import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.get('[data-qa="new-username-field"]');
  }

  get emailField() {
    return cy.get('[data-qa="new-email-field"]');
  }

  get passwordField() {
    return cy.get('[data-qa="new-password-field"]');
  }

  get signUpBtn() {
    return cy.get('[data-qa="sign-up-button"]')
  }

  get modalRegistrationFailed() {
    return cy.get('[class="swal-modal"]');
  }

  get modalRegistrationPassed() {
    return cy.get('[class="swal-modal"]');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  assertModalContainText() {
    this.modalRegistrationFailed
    .should('contain', 'Registration failed!');
  }

  assertModalContainPositiveText() {
    this.modalRegistrationPassed
    .should('contain', 'Your registration was successful!');
  }

}

export default SignUpPageObject;