import PageObject from '../PageObject';

class YourFeedPageObject extends PageObject {
  url = '/#/my-feed';

  get articlePreview() {
    return cy.getByDataQa('article-preview');
  }

  assertArticleWasDeleted(title) {
    this.articlePreview.should('not.contain', title);
  }
}

export default YourFeedPageObject;