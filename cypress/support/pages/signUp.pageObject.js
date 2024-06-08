import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get emailField() {
    return cy.getByDataCy('email-sign');
  }

  get usernameField() {
    return cy.getByDataCy('username-sign');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-sign');
  }

  registerAllRequiredFields(username, email, password) {
    this.usernameField
      .clear()
      .type('{selectAll}' + username);

    this.emailField
      .clear()
      .type('{selectAll}' + email);

    this.passwordField
      .clear()
      .type('{selectAll}' + password);

    this.signUpBtn
      .click();
  }

  AssertTheSucessfulMessage () {
    cy.get('.swal-title').should('contain', 'Welcome!');
    cy.get('.swal-text').should('contain', 'Your registration was successful!');
    cy.get('.swal-button').click();
  }

  assertTheMessageErrorEmptyUsername() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Username field required.');
    cy.get('.swal-button').click();
  }

  assertTheMessageErrorEmptyEmail() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email field required.');
    cy.get('.swal-button').click();
  }

  assertTheMessageErrorEmptyPassword () {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Password field required.');
    cy.get('.swal-button').click();
  }

  assertTheMessageErrorEmailNonvalid() {
    cy.get('.swal-title').should('contain', 'Registration failed!');
    cy.get('.swal-text').should('contain', 'Email must be a valid email.');
    cy.get('.swal-button').click();
  }
}

export default SignUpPageObject;
