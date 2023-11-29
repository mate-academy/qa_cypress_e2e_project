import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
  }

  get errorMessage() {
    return cy.get('.swal-title');
  }

  // commands to fill fields
  typeEmail(email) {
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  // commands to click on buttons
  clickSignInBtn() {
    this.signInBtn.click();
  }

  // commands to asserts
  assertContainErrorMessage() {
    this.errorMessage.should('contain', 'Login failed!');
  }
}

export default SignInPageObject;
