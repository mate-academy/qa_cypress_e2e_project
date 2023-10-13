import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.get('[data-qa="email-sign-in"]');
  }

  get passwordField() {
    return cy.get('[data-qa="password-sign-in"]');
  }

  get signInBtn() {
    return cy.get('[data-qa="sign-in-btn"]');
  }

  get modalLoginFailed() {
    return cy.get('[class="swal-modal"]');
  }

  typeEmail(email) {
    this.emailField
      .type(email);
  }

  typePassword(password) {
    this.passwordField
      .type(password);
  }

  clickSignInBtn() {
    this.signInBtn
      .click();
  }

  assertUnsuccessfulLogin() {
    this.modalLoginFailed
     .should('contain', "Login failed!");
  }
}

export default SignInPageObject;
