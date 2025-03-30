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
    return cy.getByDataCy('sign-up-btn');
  }

  get warnPopup() {
    return cy.get('.swal-modal');
  }

  typeUserName(username) {
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

  validateWarnPopup() {
    this.warnPopup
      .should('contain', 'Registration failed!');
  }

  validateconfirmationPopup() {
    this.warnPopup
      .should('contain', 'Your registration was successful');
  }
}

export default SignUpPageObject;
