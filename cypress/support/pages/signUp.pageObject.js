import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return this.getByQa('sign-up-username');
  }

  get emailField() {
    return this.getByQa('sign-up-email');
  }

  get passwordField() {
    return this.getByQa('sign-up-password');
  }

  get signUpBtn() {
    return this.getByQa('sign-up-submit');
  }

  signUp({ username, email, password }) {
    this.usernameField.type(username);
    this.emailField.type(email);
    this.passwordField.type(password);
    this.signUpBtn.click();
  }

  assertRegistrationFailed(message) {
    this.assertAlertContains('Registration failed!');
    cy.get('.swal-text').should('contain.text', message);
  }
}

export default SignUpPageObject;
