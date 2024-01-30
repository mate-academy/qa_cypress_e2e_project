import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  get usernameField() {
    return cy.getByPlaceholder('Username');
  }

  get emailField() {
    return cy.getByPlaceholder('Email');
  }

  get passwordField() {
    return cy.getByPlaceholder('Password');
  }

  get signUpButton() {
    return cy.getByDataQa('SignUpButton');
  }

  get allertMessage() {
    return cy.get('.swal-modal');
  }

  typeUsername(username) {
    this.usernameField.clear().type(username);
  }

  typeEmail(email) {
    this.emailField.clear().type(email);
  }

  typePassword(pass) {
    this.passwordField.clear().type(pass);
  }

  clickSignUpButton() {
    this.signUpButton.click();
  }

  assertAllerMessage(message) {
    this.allertMessage.should('contain', message);
  }
}

export default SignUpPageObject;
