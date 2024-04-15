import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataQa('sign-up-username');
  }

  get emailField() {
    return cy.getByDataQa('sign-up-email');
  }

  get passwordField() {
    return cy.getByDataQa('sign-up-password');
  }

  get signUpBtn() {
    return cy.getByDataQa('sign-up-btn');
  }

  get dialogMessage() {
    return cy.get('.swal-title');
  }

  get errorDialogMessage() {
    return cy.get('.swal-text');
  };

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

  assertDialogMessage(message) {
    this.dialogMessage.should('contain', message);
  }

  assertErrorDialogMessage(message) {
    this.errorDialogMessage.should('contain', message);
  }
}

export default SignUpPageObject;
