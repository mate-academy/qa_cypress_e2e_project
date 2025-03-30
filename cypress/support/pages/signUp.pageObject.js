import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get signInErrorMessage() {
    return cy.get('.swal-modal');
  }

  get signUpErrorMessage() {
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

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  assertPageContainSuccesIcon() {
    this.signInErrorMessage
      .should('contain', 'Your registration was successful!')
  }

  assertPageContainAlertIcon() {
    this.signUpErrorMessage
      .should('contain', 'Registration failed!')
      .should('contain', 'Username field required.')
  }
}

export default SignUpPageObject;