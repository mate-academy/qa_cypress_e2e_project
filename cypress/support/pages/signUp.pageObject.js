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
    return cy.getByDataCy('btn-sign-up');
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
  get alert() {
    return cy.get('.swal-modal')
  }
  assertAlertContainMessage() {
    this.alert.should('contain', 'Registration failed!')
    }

}

export default SignUpPageObject;
