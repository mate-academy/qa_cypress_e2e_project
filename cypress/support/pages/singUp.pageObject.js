import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get signUpBtn() {
    return cy.contains('button', 'Sign up');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  launchRegistrationPage() {
    cy.visit('/');
    cy.contains('a', 'Sign up').click();
    cy.url().should('include', this.url);
  }
}

export default SignUpPageObject;
