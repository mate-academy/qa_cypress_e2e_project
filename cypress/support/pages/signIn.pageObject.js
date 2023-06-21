import PageObject from '../PageObject';

class SignInPageObject extends PageObject {
  url = '#/login';

  assertSuccessfulLogin(username) {
    cy.getByDataQa('username-link').should('contain', username);
  }

  assertUnsuccessfulLogIn(errorText, errorTitle) {
    cy.get('.swal-text').should('contain', errorText);
    cy.get('.swal-title').should('contain', errorTitle);
  }
}

export default SignInPageObject;
