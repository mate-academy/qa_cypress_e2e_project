import PageObject from '../PageObject';

class SignUpPageObject extends PageObject {
  url = '#/register';

  assertSuccessfulRegistration(registrationMessage, username) {
    cy.get('.swal-modal')
      .should('contain', registrationMessage)
      .click();
    cy.getByDataQa('username-link').should('contain', username);
  }

  assertUnsuccessfulRegistration(errorMessage) {
    cy.get('.swal-modal')
      .should('contain', errorMessage);
    cy.url().should('contain', '/register');
  }
}

export default SignUpPageObject;