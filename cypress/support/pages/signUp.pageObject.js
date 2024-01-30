import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('sign-up-username');
  }

  get emailField() {
    return cy.getByDataCy('sign-up-email');
  }

  get passwordField() {
    return cy.getByDataCy('sign-up-password');
  }

  get signUpButton() {
    return cy.getByDataCy('sign-up-btn-primary');
  }

  get popUp() {
    return cy.get('.swal-modal');
  }

  get popUpOkButton() {
    return cy.get('.swal-button');
  }

  get haveAnAccountLink() {
    return cy.getByDataCy('sign-in-page-link');
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

  clickSignUpBtn() {
    this.signUpButton
      .click();
  }

  clickPopUpOkButton() {
    this.popUpOkButton
      .click();
  }

  clickHaveAnAccountLink() {
    this.haveAnAccountLink
      .click();
  }

  assertSignUpUrl() {
    cy.url().should('include', '/#/register');
  }

  assertPopUp() {
    this.popUp.should('contain', 'Invalid user credentials.');
  }

  assertPopUpWithoutUsername() {
    this.popUp.should('contain', 'Username field required.');
  }

  assertPopUpUsenameIsTaken() {
    this.popUp.should('contain', 'This username is taken.');
  }

  assertPopUpWithoutEmail() {
    this.popUp.should('contain', 'Email field required.');
  }

  assertPopUpInvalidEmail() {
    this.popUp.should('contain', 'Email must be a valid email.');
  }

  assertPopUpWthoutPassword() {
    this.popUp.should('contain', 'Password field required');
  }

  assertPopUpInvalidPassword() {
    this.popUp.should('contain', `Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.`);
  }

  assertSignInUrl() {
    cy.url().should('include', '/#/login');
  }
};

export default SignUpPageObject;
