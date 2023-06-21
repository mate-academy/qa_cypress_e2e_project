import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataQa('username-sign-up');
  }

  fillUsernameField(username) {
    this.usernameField.type(username);
  }

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  clickOnSignUpBtn() {
    this.signUpBtn.click();
  }

  get registrationFailedModal() {
    return cy.get('.swal-modal');
  }

  assertRegistrationFailedModal(message) {
    this.loginFailedModal.should('contain', message);
  }
}

export default SignUpPageObject;
