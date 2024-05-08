import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username');
  }

  get emailField() {
    return cy.getByDataCy('email');
  }

  get passwordField() {
    return cy.getByDataCy('password');
  }

  get signUpBtn() {
    return cy.getByDataCy('signup-btn');
  }

  get registrationModal() {
    return cy.get('.swal-modal');
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

  clicksignUpBtn() {
    this.signUpBtn
      .click();
  }

  assertRegistrationModal() {
    this.registrationModal.should('contain',
      'Your registration was successful!');
  }

  assertFailWithNotValidPassword() {
    this.registrationModal.should('contain', `Password must be 8 characters` +
      ` long and include 1 number, 1 uppercase letter, and 1 lowercase letter.`);
  }

  assertFailWithNotValidEmail() {
    this.registrationModal.should('contain', 'Email must be a valid email.');
  }

  assertFailWithEmptyUsername() {
    this.registrationModal.should('contain', 'Username field required.');
  }
}

export default SignUpPageObject;
