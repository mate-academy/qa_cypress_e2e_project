import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataQa('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataQa('password-sign-up');
  }

  get usernameField() {
    return cy.getByDataQa('username-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  get errorMessages() {
    return cy.getByDataQa('error-messages');
  }

  get swalModal() {
    return cy.get('.swal-modal');
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

  assertErrorMessageVisible() {
    this.swalModal.should('be.visible');
  }

  assertErrorMessageContains(message) {
    this.swalModal.should('contain', message);
  }

  register(email, username, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.typeUsername(username);
    this.clickSignUpBtn();
  }
}

export default SignUpPageObject;
