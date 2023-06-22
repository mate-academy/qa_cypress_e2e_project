import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '/#/register';

  typeUsername(username) {
    cy.getByDataQa('username-sign-up')
      .type(username);
  }

  typeEmail(email) {
    cy.getByDataQa('email-sign-up')
      .type(email);
  }

  typePassword(password) {
    cy.getByDataQa('password-sign-up')
      .type(password);
  }

  clickSignUpBtn() {
    cy.getByDataQa('sign-up-btn')
      .click();
  }

  checkSuccessMessage() {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', 'Your registration was successful!');
    cy.get('.swal-button')
      .click();
  }

  checkErrorNameRequired() {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', 'Username field required.');
    cy.get('.swal-button')
      .click();
  }

  checkErrorEmailRequired() {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', 'Email field required.');
    cy.get('.swal-button')
      .click();
  }

  checkErrorPasswordRequired() {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', 'Password field required.');
    cy.get('.swal-button')
      .click();
  }
}

export default SignUpPageObject;
