import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passField() {
    return cy.getByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.contains('.btn', 'Sign up');
  }

  clickSignUpBtn() {
    this.signUpBtn
      .click();
  }

  typeUsername(text) {
    this.usernameField
      .type(text);
  }

  typeEmail(text) {
    this.emailField
      .type(text);
  }

  typePassword(text) {
    this.passField
      .type(text);
  }

  assertInvalidRegister() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
  }

  assertSuccessRegister() {
    cy.get('.swal-title')
      .should('contain', 'Welcome!');
  }
}

export default SignUpPageObject;
