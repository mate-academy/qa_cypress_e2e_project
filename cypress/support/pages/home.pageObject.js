import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get yourFeedLink () {
    return cy.getByDataCy('your-feed-link')
  }

  get globalFeedLink () {
    return cy.getByDataCy('global-feed-link');
  }

  get articleBlock () {
    return cy.getByDataCy('article-preview');
  }

  clickYourFeedLink () {
    this.yourFeedLink.click();
  }

  accertAbsentArticle (title) {
    this.clickYourFeedLink();
    this.articleBlock.should('not.contain', title);
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickUsernameLink () {
    this.usernameLink.click();
  }

  checkUrl () {
    cy.url('contain', this.url);
  }
}

export default HomePageObject;
