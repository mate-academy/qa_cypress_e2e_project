import PageObject from '../PageObject';

class YourFeedPageObject extends PageObject {
  url = '/#/my-feed';

  get articlePreview() {
    return cy.getByDataCy('article-card');
  }
  
  assertArticleWasDeleted(title) {
    this.articlePreview.should('not.contain', title);
  }
}

export default YourFeedPageObject;