import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get globalFeed() {
    return cy.getByDataCy('Global-Feed');
  }

  get noArticleMessage() {
    return cy.getByDataCy('no-articles');
  }

  assertAfterDeleteArticle() {
    this.globalFeed.should('contain', 'Global Feed');
    this.noArticleMessage.should('contain', 'No articles are here... yet.');
  }
}

export default HomePageObject;
