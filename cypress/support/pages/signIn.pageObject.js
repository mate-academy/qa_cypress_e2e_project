import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '/#/login';

  typeEmail(email) {
    cy.getByDataQa('email-sign-in')
      .type(email);
  }

  typePassword(password) {
    cy.getByDataQa('password-sign-in')
      .type(password);
  }

  clickSignInBtn() {
    cy.getByDataQa('sign-in-btn')
      .click();
  }

  checkErrorMessage() {
    cy.get('.swal-modal')
      .should('exist')
      .and('contain', 'Invalid user credentials.');
    cy.get('.swal-button')
      .click();
    }
}

export default SignInPageObject;
