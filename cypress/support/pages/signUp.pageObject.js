import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataQa('username-sign-up');
  }

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  get modalWindow() {
    return cy.get('.swal-modal');
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

  verifyRegistrationSuccess() {
    this.modalWindow.should('contain', 'Your registration was successful!')
      .find('.swal-button').click();
  }

  verifyWrongRegistration() {
    this.modalWindow.should('contain', 'Registration failed!')
      .find('.swal-button').click();
  }
}
export default SignUpPageObject;
