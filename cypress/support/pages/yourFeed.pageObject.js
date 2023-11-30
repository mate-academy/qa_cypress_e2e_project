import PageObject from '../PageObject';

class YourFeedPageObject extends PageObject {
  url = '/#/my-feed';

  get myArticlesPage() {
    return cy.getByDataQa('my-articles-page');
  }

  clickMyArticlesPage() {
    this.myArticlesPage.click();
  }

  assertDeletedArticle(text) {
    cy.get('.article-preview').should('contain', text);
  }
}

export default YourFeedPageObject;
