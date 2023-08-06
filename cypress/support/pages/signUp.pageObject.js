import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.findByPlaceholder('Username');
  }

  get emailField() {
    return cy.findByPlaceholder('Email');
  }

  get passwordField() {
    return cy.findByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.contains('.btn', 'Sign up').click();
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
    this.signUpBtn
      .click();
  }

  assertSuccesfulRegistration() {
  // eslint-disable-next-line max-len
    cy.get('.swal-text').should('contain.text', 'Your registration was successful!');
  }

  assertFailedRegistration() {
    cy.get('.swal-title').should('contain.text', 'Registration failed!');
  }

  assertUsernameFieldRequired() {
    cy.get('.swal-text').should('contain.text', 'Username field required.');
  }

  assertEmailFieldRequired() {
    cy.get('.swal-text').should('contain.text', 'Email field required.');
  }

  assertEmailAlreadyTaken() {
    cy.get('.swal-text').should('contain.text', 'Email already taken.');
  }

  assertPasswordFieldRequired() {
    cy.get('.swal-text').should('contain.text', 'Password field required.');
  }

  clickOkBtn() {
    cy.get('.swal-button').click();
  }

  logoutUser() {
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get('.text-xs-center').should('contain', 'Your Settings');
    cy.get('.btn-outline-danger').click();
  }
}

export default SignUpPageObject;
