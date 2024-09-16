import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertLogOut() {
    cy.contains('.nav-link', 'Sign in').should('be.visible');
    cy.contains('.nav-link', 'Sign up').should('be.visible');
  }
}

export default HomePageObject;
