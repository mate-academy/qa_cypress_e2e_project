import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertUrl() {
    cy.url().should('include', '/#/');
  }

  assertLoggedOut() {
    this.signInLink.should('be.visible');
  }
}

export default HomePageObject;
