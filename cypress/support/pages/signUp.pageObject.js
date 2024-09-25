import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataQa('registration-username-field');
  }

  get emailField() {
    return cy.getByDataQa('registration-email-field');
  }

  get passwordField() {
    return cy.getByDataQa('registration-password-field');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  typeUserName(username) {
    this.userNameField.type(username);
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

  get errorMessage() {
    return cy.get('.swal-text');
  }

  assertUsernameRequiredMessage() {
    this.errorMessage.should('contain', 'Username field required.');
  }

  asserEmailRequiredMessage() {
    this.errorMessage.should('contain', 'Email field required.');
  }

  asserPasswordRequiredMessage() {
    this.errorMessage.should('contain', 'Password field required.');
  }

  assertInvalidPasswordMessage() {
    this.errorMessage.should('contain', 'Password must be 8 characters long');
  }
}

export default SignUpPageObject;
