import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField() {
    return cy.getByDataCy('username-sign-up');
  }

  get emailField() {
    return cy.getByDataCy('email-sign-up');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-up');
  }

  get SignUpBtn() {
    return cy.getByDataCy('btn-sign-up');
  }

  get FailedRegistration() {
    return cy.get('.swal-title');
  }

  typeUsername(username) {
    this.usernameField
      .type(username);
  }

  typeEmail() {
    const randomNumber = Math.ceil(Math.random() * 100000);
    this.emailField.type(`test${randomNumber}@mail.com`);
  }

  typeEmailForNewUser(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignUpBtn() {
    this.SignUpBtn
      .click();
  }

  assertFailedRegistration() {
    this.FailedRegistration
      .should('contain.text', 'Registration failed!');
  }
}

export default SignUpPageObject;
