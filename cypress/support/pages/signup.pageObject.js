import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  clickOk() {
    cy.get('[class="swal-button swal-button--confirm"]')
      .click();
  }

  assertRegistr() {
    cy.get('[class="swal-text"]')
      .should('contain', 'Your registration was successful!');
  }

  assertRegistrFail() {
    cy.get('[class="swal-title"]')
      .should('contain', 'Registration failed!');
  }
}

export default SignUpPageObject;