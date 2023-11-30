import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/profile/@username';

  visit(username) {
    cy.visit(`/@${username}`);
  }

  get profileInfo() {
    return cy.getByDataQa('profile-info');
  }

  get myArticlesTab() {
    return cy.get('.nav-link').contains('My Articles');
  }

  get articleTitleLink() {
    return cy.getByDataQa('article-title-link');
  }

  get articlePreview() {
    return cy.get('.article-preview');
  }

  clickOnMyArticleTab() {
    this.myArticlesTab
      .click();
  }

  assertUpdatedProfileInfo(username) {
    this.profileInfo
      .should('contain', username);
  }

  assertProfileInLink(username) {
    cy.url().should('contain', `/@${username}`);
  }

  visitArticlePage(articleTitle) {
    this.articleTitleLink
      .click();
  }

  assertArticleInMyArticles(articleTitle) {
    this.articlePreview
      .contains(articleTitle);
  }

  assertArticleDeleted() {
    this.articlePreview
      .should('contain.text', 'No articles are here... yet.');
  }
}

export default ProfilePageObject;
