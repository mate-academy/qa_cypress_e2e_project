import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  get errorTitle() {
    return cy.get('div[class="swal-title"]');
  }

  get errorText() {
    return cy.get('div[class="swal-text"]');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertErrorTitle(title) {
    this.errorTitle.should('contain', title);
  }

  assertErrorText(text) {
    this.errorText.should('contain', text);
  }
}

export default SignInPageObject;
