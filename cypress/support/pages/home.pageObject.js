import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get articlePreview() {
    return cy.get('.article-preview');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertArticleDescription(description) {
    this.articlePreview
      .should('contain', description);
  }

  assertArticleTitle(title) {
    this.articlePreview
      .should('contain', title);
  }

  assertDeletedArticle() {
    this.articlePreview
      .should('not.exist');
  }
}

export default HomePageObject;
