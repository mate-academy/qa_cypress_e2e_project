import PageObject from '../PageObject';
/// <reference types='cypress' />
/// <reference types='../support' />

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataCy('sign-up-email');
  }

  get passwordField() {
    return cy.getByDataCy('sign-up-password');
  }

  get nameField() {
    return cy.getByDataCy('sign-up-name');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get modalWindowText() {
    return cy.getByClass('swal-text');
  }

  get modalWindowTitle() {
    return cy.getByClass('swal-title');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  typeUserName(name) {
    this.nameField.type(name);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  findModalText(text) {
    this.modalWindowText.should('contain.text', text);
  }

  findModalTitle(title) {
    this.modalWindowTitle.should('contain.text', title);
  }
}

export default SignUpPageObject;
