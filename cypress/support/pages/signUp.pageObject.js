import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField () {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField () {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField () {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn () {
    return cy.getByDataCy('btn-sign-up');
  }

  get confirmationPopup () {
    return cy.get('.swal-modal')
  }

  get haveAccountLink () {
    return cy.getByDataCy('have-account-link');
  }

  get urlPage () {
    return cy.url();
  }

  get validMessage () {
    return cy.get('.swal-text');
  }

  get signUpText() {
    return cy.get('h1.text-xs-center');
  }

  typeUsername (username) {
    this.usernameField.type(username);
  }

  typeEmail (email) {
    this.emailField.type(email);
  }

  typePassword (password) {
    this.passwordField.type(password);
  }

  fillAllSignUpFields (username, email, password) {
    this.typeUsername(username);
    this.typeEmail(email);
    this.typePassword(password);
  }

  clickSignUpBtn () {
    this.signUpBtn.click();
  }

  verifySuccessfulRegistration () {
    this.confirmationPopup.should('contain', 'Welcome!');
  }

  verifyFailedRegistration () {
    this.confirmationPopup.should('contain', 'Registration failed!')
  }

  verifyValidMessage (text) {
    this.validMessage.should('contain', text)
  }

  checkUrl (text) {
    this.urlPage.should('contain', text)
  }

  clickHaveAccountLink () {
    this.haveAccountLink.click();
  }

  checkSignUpText () {
    this.signUpText.should('contain', 'Sign up');
  }

  visitSignUp () {
    cy.visit(this.url);
  }
}

export default SignUpPageObject;