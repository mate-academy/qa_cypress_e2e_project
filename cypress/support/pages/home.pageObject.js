import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertUsernameLink(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHomePageUrl() {
    cy.url()
      .should('eq', 'http://localhost:1667/#/');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;
