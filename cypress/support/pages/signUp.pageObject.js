import PageObject from '../PageObject';
class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByDataCy('usernameField');
  }

  get emailField() {
    return cy.getByDataCy('emailField');
  }

  get passwordField() {
    return cy.getByDataCy('passwordField');
  }

  get signUpBtn() {
    return cy.getByDataCy('submitBtn');
  }

  get modalMessage() {
    return cy.get('.swal-text');
  }

  get modalTitleMessage() {
    return cy.get('.swal-title');
  }

  get modalOkBtn() {
    return cy.get('.swal-button.swal-button--confirm');
  }

  writeUsername(name) {
    this.usernameField.type(name);
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

  assertModalHaveText(result) {
    this.modalMessage.should('contain.text', result);
  }

  clickSwallOk() {
    this.modalOkBtn.click();
  }

  assertModalTitle(result) {
    this.modalTitleMessage.should('contain.text', result);
  }
}

export default SignUpPageObject;
