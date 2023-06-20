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
    return cy.contains('button', 'Sign up');
  }

  assertSuccessfulSignUp() {
    cy.get('.swal-title')
      .should('contain', 'Welcome!');
    cy.get('.swal-text')
      .should('contain', 'Your registration was successful!');
  }

  assertFailedSignUp() {
    cy.get('.swal-title')
      .should('contain', 'Registration failed!');
  }
}

export default SignUpPageObject;
