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

  assertModalWindow() {
    cy.get('.swal-modal').should('exist');
  }

  closeModalWindow() {
    cy.get('.swal-button').click();
  }

  assertEmptyPasswordMessage() {
    cy.get('.swal-modal')
      .should('contain', 'Password field required.');
  }

  assertEmptyEmailMessage() {
    cy.get('.swal-modal')
      .should('contain', 'Email field required.');
  }

  assertInvalidEmailMessage() {
    cy.contains('.swal-modal', 'Email must be a valid email.')
      .should('exist');
  }
}
export default SignInPageObject;
