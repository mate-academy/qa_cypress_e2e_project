import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = `#/register?cache-bust=${new Date().getTime()}`;

  get usernameField() {
    return cy.getByDataCy('username-registration');
  }

  get emailField() {
    return cy.getByDataCy('emailForRegistration');
  }

  get passwordField() {
    return cy.getByDataCy('passwordForRegistration');
  }

  get signUpBtn() {
    return cy.getByDataCy('signUpBtn');
  }

  get okBtn() {
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

  clickOkBtn() {
    this.okBtn.type('{enter}');
  }
}

export default SignUpPageObject;
