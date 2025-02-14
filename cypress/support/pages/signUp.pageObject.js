import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get submitBtn() {
    return cy.getByDataCy('submit-btn');
  }

  get errorTitle() {
    return cy.get('div[class="swal-title"]');
  }

  get errorText() {
    return cy.get('div[class="swal-text"]');
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

  clickSubmitBtn() {
    this.submitBtn
      .click();
  }

  assertErrorTitle(title) {
    this.errorTitle.should('contain', title);
  }

  assertErrorText(text) {
    this.errorText.should('contain', text);
  }
}

export default SignUpPageObject;
