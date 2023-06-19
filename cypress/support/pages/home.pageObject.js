import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get globalFeed() {
    return cy.getByDataQa('Global-Feed');
  }

  get NoArticleMessage() {
    return cy.getByDataQa('no-article');
  }

  assertAfterDeleteArticle() {
    this.globalFeed.should('contain', 'Global Feed');
    this.NoArticleMessage.should('contain', 'No articles are here... yet.');
  }
}

export default HomePageObject;
