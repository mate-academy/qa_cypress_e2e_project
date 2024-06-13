import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get signUpBtn() {
    return cy.get('.btn');
  }

  get okBtn() {
    return cy.get('.swal-button--confirm');
  }

  typeUserName(username) {
    this.userNameField
      .type(username);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  clickOkBtn() {
    this.okBtn
      .click();
  }

  assertTheSuccessfulMessage() {
    cy.get('.swal-title').should('contain', 'Welcome!');
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
  }

  assertTheErrorMessageEmailNonvalid() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  }

  assertTheErrorMessageUserEmpty() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Username field required.');
  }

  assertTheErrorMessageEmptyEmail() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email field required.');
  }

  assertTheErrorMessageEmptyPassword() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password field required.');
  }
}

export default SignUpPageObject;
