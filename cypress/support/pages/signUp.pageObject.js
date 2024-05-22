import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get userNameField() {
    return cy.getByDataCy('username-sign-in').type('HectorAntonia123');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-in').type('Kelly112@mail.com');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in').type('SuperSafePassword123');
  }

  get signInBtn() {
    return cy.get('[data-cy="sign-in-btn"]').contains('Sign up');
  }

  typeUserName(username) {
    this.userNameField.type(username);
  }

  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignUpBtn() {
    cy.get('[data-cy="sign-in-btn"]').contains('Sign up').click();
  }
}

export default SignUpPageObject;
