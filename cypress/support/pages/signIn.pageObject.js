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
    this.emailField.type(email);
  }

  typePassword(password) {
    this.passwordField.type(password);
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }

  errorMessage() {
    cy.get('.swal-modal').should('contain', 'Login failed!');
    cy.get('.swal-modal').should('contain', 'Invalid user credentials.');
    cy.get('.swal-button').click();
  }

  errorEmailMessage() {
    cy.get('.swal-modal').should('contain', 'Login failed!');
    cy.get('.swal-modal').should('contain', 'Email field required.');
    cy.get('.swal-button').click();
  }
}

export default SignInPageObject;
