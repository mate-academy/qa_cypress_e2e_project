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
    return cy.get('.btn.btn-lg');
  }

  typeUsername(email) {
    this.usernameField.type(email);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  fillSignUpForm(user) {
    this.typeUsername(user.username);
    this.typeEmail(user.email);
    this.typePassword(user.password);
  }

  signUpAndResult(user, message) {
    this.fillSignUpForm(user);
    this.signUpBtn.click();
    cy.contains(message).should('be.visible');
  }
}

export default SignUpPageObject;
