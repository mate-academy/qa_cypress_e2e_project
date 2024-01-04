import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get globalFeedSection() {
    return cy.getByDataQa('global-feed');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertDeletedArticle(title, description, tag) {
    this.globalFeedSection
      .should('not.contain', title)
      .and('not.contain', description)
      .and('not.contain', tag);
  }
}

export default HomePageObject;
