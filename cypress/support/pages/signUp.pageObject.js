import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataQa('register-username-field');
  }

  get emailField() {
    return cy.getByDataQa('register-email-field');
  }

  get passwordField() {
    return cy.getByDataQa('register-password-field');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  get modalWindowTitle() {
    return cy.get('.swal-title');
  }

  get modalWindowText() {
    return cy.get('.swal-text');
  }

  get swalBtn() {
    return cy.get('.swal-button');
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

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  checkRegistrationSuccesful() {
    this.modalWindowTitle
      .should('contain', 'Welcome!');
    this.modalWindowText
      .should('contain', 'Your registration was successful!');
  }

  checkInvalidPassword() {
    this.modalWindowTitle
      .should('contain', 'Registration failed!');
    this.modalWindowText
      .should('contain', `Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.`);
  }

  checkEmptyUsername() {
    this.modalWindowTitle
      .should('contain', 'Registration failed!');
    this.modalWindowText
      .should('contain', 'Username field required.');
  }

  checkTakenEmail() {
    this.modalWindowTitle
      .should('contain', 'Registration failed!');
    this.modalWindowText
      .should('contain', 'Email already taken.');
  }

  clickSwalBtn() {
    this.swalBtn.click();
  }
}

export default SignUpPageObject;
