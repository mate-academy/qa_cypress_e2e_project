import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }

  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }

  get signInBtn() {
    return cy.getByDataCy('sign-in-btn');
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

  errorTitle() {
    cy.contains('.swal-title', 'Login failed!').should('exist');
  }

  closeAlert() {
    cy.contains('.swal-button', 'OK').click();
  }

  errorEmailRequired() {
    cy.contains('.swal-text', 'Email field required.').should('exist');
  }

  errorPasswordRequired() {
    cy.contains('.swal-text', 'Password field required.').should('exist');
  }

  errorInvalidCredentials() {
    cy.get('.swal-modal').should('contain', 'Invalid user credentials.');
  }
}

export default SignInPageObject;
