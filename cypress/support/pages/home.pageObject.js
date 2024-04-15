import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('profile-link');
  }

  get globalFeedButton() {
    return cy.getByDataCy('global-feed-btn');
  }

  get articleTitle() {
    return cy.getByDataCy('title-preview');
  }

  get articleDescription() {
    return cy.getByDataCy('description-preview');
  }

  clickGlobalFeedButton() {
    this.globalFeedButton.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  assertArticleDescription(description) {
    this.articleDescription.should('contain', description);
  }

  assertArticleTitleRemoved(title) {
    cy.get('.article-preview').should('not.contain', title);
  }

  assertArticleDescriptionRemoved(description) {
    cy.get('.article-preview').should('not.contain', description);
  }

  clickUsernameLink() {
    this.usernameLink.click();
  }

  clickArticleTitle() {
    this.articleTitle.click();
  }
}

export default HomePageObject;
