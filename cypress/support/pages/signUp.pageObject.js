import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  get usernameField () {
    return cy.getByDataCy('registerUsername');
  }

  enterUsername (username) {
    this.usernameField.type(username);
  }

  get emailField () {
    return cy.getByDataCy('registerEmail');
  }

  enterEmail (email) {
    this.emailField.type(email);
  }

  get passwordField () {
    return cy.getByDataCy('registerPassword');
  }

  enterPassword (password) {
    this.passwordField.type(password);
  }

  registerButtonClick() {
    cy.getByDataCy('registerButton').click();
  }

  fullyRegister(username, email, password) {
    this.enterUsername(username);
    this.enterEmail(email);
    this.enterPassword(password);
    this.registerButtonClick();
  }

  assertIfRegistrationFailed () {
    return cy.get('.swal-title')
      .should('contain', 'Registration failed!');
  }
}

export default SignUpPageObject;
