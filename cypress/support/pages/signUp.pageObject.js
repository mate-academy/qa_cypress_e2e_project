import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = 'user/register';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  typeUsername(username) {
    this.usernameField.type(username);
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  get SignUpButton() {
    return cy.contains('.btn', 'Sign up');
  }

  clickSignUpButton() {
    this.SignUpButton.click();
  }

  assertErrorMessage() {
    return cy.contains('li', 'This email is taken.')
      .should('exist');
  }
}

export default SignUpPageObject;
