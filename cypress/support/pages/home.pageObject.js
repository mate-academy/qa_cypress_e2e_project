import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get yourFeed() {
    return cy.getByDataQa('your-feed');
  }

  clickYourFeedLink() {
    this.yourFeed.click();
  }

  assertUsernameLinkDoesNotExist() {
    this.usernameLink
      .should('not.exist');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }
}

export default HomePageObject;
