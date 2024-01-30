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

  get haveAnAccountLink() {
    return cy.getByDataCy('sign-up-page-link');
  }

  get popUp() {
    return cy.get('.swal-modal');
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

  clickHaveAnAccountLink() {
    this.haveAnAccountLink
      .click();
  }

  assertPopUp() {
    this.popUp.should('contain', 'Invalid user credentials.');
  }

  assertPopUpInvalidEmail() {
    this.popUp.should('contain', 'Email must be a valid email.');
  }

  assertPopUpTakenUsername() {
    this.popUp.should('contain', 'This username is taken.');
  }

  assertSignInUrl() {
    cy.url().should('include', '/#/login');
  }
}

export default SignInPageObject;
