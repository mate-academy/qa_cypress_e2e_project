import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  signInLink() {
    cy.contains('.nav-link', 'Sign in').should('be.visible');
  }

  signUpLink() {
    cy.contains('.nav-link', 'Sign up').should('be.visible');
  }

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
