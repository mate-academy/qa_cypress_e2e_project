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

  get modalTitle() {
    return cy.get('.swal-title');
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

  verifySuccessfulRegistration(state) {
    this.modalTitle.should('contain.text', state);
  }

  verifyWrongRegistration(state) {
    this.modalTitle.should('contain.text', state);
  }
}

export default SignUpPageObject;
