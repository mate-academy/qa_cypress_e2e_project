import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  fillEmailField(email) {
    this.emailField.type(email);
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  fillPasswordField(password) {
    this.passwordField.type(password);
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  clickOnSignInBtn() {
    this.signInBtn.click();
  }

  submitSignInForm(email, password) {
    cy.clearCookies();
    this.emailField.type(email);
    this.passwordField.type(password);
    this.signInBtn.click();
  }

  get loginFailedModal() {
    return cy.get('.swal-modal');
  }

  assertLoginFailedModal(message) {
    this.loginFailedModal.should('contain', message);
  }
}

export default SignInPageObject;
