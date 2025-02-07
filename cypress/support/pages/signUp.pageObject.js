import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  elements = {
    usernameField: () => cy.getByDataCy('username-sign-up'),
    emailField: () => cy.getByDataCy('email-sign-up'),
    passwordField: () => cy.getByDataCy('password-sign-up'),
    signUpButton: () => cy.getByDataCy('sign-up-button')
  };

  typeUsername(username) {
    this.elements.usernameField().type(username);
  }

  typeEmail(email) {
    this.elements.emailField().type(email);
  }

  typePassword(password) {
    this.elements.passwordField().type(password);
  }

  clickSignUpButton() {
    this.elements.signUpButton().click();
  }

  assertValidationPopUp() {
    cy.get('.swal-modal').should('contain', 'Registration failed!');
  }
}

export default SignUpPageObject;
