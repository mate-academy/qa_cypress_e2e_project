import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get signInText () {
    return cy.getByDataCy('sign-in-text');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  get confirmationPopup () {
    return cy.get('.swal-modal')
  }

  get needAccountLink () {
    return cy.getByDataCy('need-account-link');
  }

  get urlPage () {
    return cy.url();
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  checkSignInParagraph () {
    this.signInText.should('contain', 'Sign in');
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  verifyFailedLogin (text) {
    this.confirmationPopup.should('contain', text);
  }

  clickNeedAccountLink () {
    this.needAccountLink.click();
  }

  checkUrl (text) {
    this.urlPage.should('contain', text)
  }

  loginWithUpdatedData (email, password) {
    this.visit();
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSignInBtn();
  }

  visit () {
    cy.visit(this.url);
  }
}

export default SignInPageObject;