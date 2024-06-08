
class SignInPage {
  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  typeWrongPassword(wrongUser) {
    this.passwordField.type(wrongUser.password);
  }

  typeWrongEmail(wrongUser) {
    this.emailField.type(wrongUser.email);
  }

  typeshortEmail(wrongUser) {
    this.emailField.type(wrongUser.wrongemail);
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  typeEmail(user) {
    this.emailField.type(user.email);
  }

  typeModEmail(edit) {
    this.emailField.type(edit.email);
  }

  typePassword(user) {
    this.passwordField.type(user.password);
  }

  typeModPassword(edit) {
    this.passwordField.type(edit.password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  AssertLoginFailed() {
    cy.get('.swal-title').should('contain', 'Login failed!');
  }

  AssertInvalidusercredentials() {
    cy.get('.swal-text').should('contain', 'Invalid user credentials.');
  }

  AssertEmailmustbeavalidemail() {
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
  }

  AssertEmailfieldrequired() {
    cy.get('.swal-text').should('contain', 'Email field required.');
  }

  clickOkBtn() {
    cy.get('.swal-button').click();
  }

  clearEmail() {
    cy.getByDataCy('email-sign-in').clear();
  }

  clearPassword() {
    cy.getByDataCy('password-sign-in').clear();
  }

  visit() {
    cy.visit('/#/login');
  }
}

export const signInPage = new SignInPage();
