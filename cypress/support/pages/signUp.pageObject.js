import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
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

  get modalText() {
    return cy.get('.swal-text');
  }

  visit() {
    cy.visit(this.url);
  }
}

export default SignUpPageObject;