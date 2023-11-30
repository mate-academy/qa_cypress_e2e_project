import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  /*get emailField() {
    return cy.getByDataCy('email-sign-in');
  }*/
  
  get usernameField() {
    return cy.getByDataCy('username-register-field');
  }

  get emailField() {
    return cy.getByDataCy('email-register-field');
  }

  get passwordField() {
    return cy.getByDataCy('password-register-field');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get message() {
    return cy.get('.swal-modal');
  }

  get okBtn() {
    return cy.get(`[class="swal-button swal-button--confirm"]`);
  }

  /*typeEmail(email) {
    this.emailField
      .type(email);
  }*/

  typeUsername(username) {
    this.usernameField.type(username);
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

  clickOkBtn() {
    this.okBtn
    .click();
  }

  assertMessage(message) {
    this.message.should('contain', message);
  }
  
}

export default SignUpPageObject;
