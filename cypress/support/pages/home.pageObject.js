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

  assertYourFeedLink() {
    cy.getByDataQa('your-feed-home')
      .should('be.visible');
  }

  assertGlobalFeedLink() {
    cy.getByDataQa('global-feed-home')
      .should('be.visible');
  }
}

export default HomePageObject;
