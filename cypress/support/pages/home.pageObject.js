import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get yourFeedLink() {
    return cy.getByDataCy('your-feed-link')
  }

  get globalFeedLink() {
    return cy.getByDataCy('global-feed-link')
  }

  get authorLink() {
    return cy.getByDataCy('author-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertUserIsNotLoggedIn() {
    this.usernameLink.should('not.exist');
  }

  clickUsernameLink() {
    this.usernameLink.click();
  }

  clickYourFeed() {
    this.yourFeedLink.click();
  }

  clickGlobalFeed() {
    this.globalFeedLink.click();
  }

  visitAuthorPage() {
    this.authorLink.click();
  }
}

export default HomePageObject;
