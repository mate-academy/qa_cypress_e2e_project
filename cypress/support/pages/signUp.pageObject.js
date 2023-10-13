import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField(){
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
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

  get dialogWindow(){
    return cy.get('div[role="dialog"]');
  }

  assertTakenEmail(){
    this.dialogWindow.should('contain', 'Email already taken.');
  }

  assertInvalidEmail(){
    this.dialogWindow.should('contain', 'Email must be a valid email.');
  }

  assertInvalidPassword(){
    this.dialogWindow.should('contain', 'Password must be 8 characters long');
  }
}

export default SignUpPageObject;