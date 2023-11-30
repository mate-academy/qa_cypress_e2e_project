import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.cy.getByDataCy('sign-up-btn');
  }

  get modalTitle() {
    return cy.get('.swal-title');
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

  alertSuccessfulRegistration() {
    this.modalTitle('contain', 'Welcome!', 'Your registration was successful!');
  }
  
  alertRegistrationFailed() {
    this.modalTitle('contain', 'Registration failed!');
  }
  
  alertEmailRequired() {
    this.modalTitle('contain', 'Registration failed!', 'Email field required.');
  }
  
  alertEmailTaken() {
    this.modalTitle('contain', 'Registration failed!', 'Email already taken.');
  }
  
  alertInvalidEmail() {
    this.modalTitle('contain', 'Registration failed!', 'Email must be a valid email.');
  }
  
  alertInvalidUsername() {
    this.modalTitle('contain', 'Registration failed!', 'Username must be a valid username.');
  }
  
  alertInvalidPassword() {
    this.modalTitle('contain', 'Registration failed!',
      `Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.`);
  }  
}

export default SignUpPageObject;