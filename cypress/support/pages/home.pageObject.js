import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get yourFeed() {
    return cy.getByDataQa('your-feed');
  }

  get logoConduit() {
    return cy.getByDataQa('logo-conduit');
  }

  clickYourFeedLink() {
    this.yourFeed.click();
  }

  assertUsernameLinkDoesNotExist() {
    this.usernameLink
      .should('not.exist');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertLogoConduit() {
    this.logoConduit
      .should('contain', 'conduit')
  }
}

export default HomePageObject;
