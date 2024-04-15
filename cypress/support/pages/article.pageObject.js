import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get newArticleLink() {
    return cy.getByDataCy('header-new-article-link');
  }

  get newArticleTitle() {
    return cy.getByDataCy('article-page-title');
  }

  get newArticleDescription() {
    return cy.getByDataCy('article-page-about-article');
  }

  get newArticleBody() {
    return cy.getByDataCy('article-page-article-body');
  }

  get newArticleTag() {
    return cy.getByDataCy('article-page-article-tag');
  }

  get publishButton() {
    return cy.getByDataCy('article-page-submit-button');
  }

  get deleteButton() {
    return cy.getByDataCy('article-page-delete-button');
  }

  typeTitle(title) {
    this.newArticleTitle.type(title);
  }

  typeAbout(description) {
    this.newArticleDescription.type(description);
  }

  typeBody(body) {
    this.newArticleBody.type(body);
  }

  typeBodySevenWords(bodySevenWords) {
    this.newArticleBody.type(bodySevenWords);
  }

  typeTag(tag) {
    this.newArticleTag
      .type(tag)
      .click();
  }

  clickPublishButton() {
    this.publishButton.click();
  }

  clicknewArticleLink() {
    this.newArticleLink.click();
  }

  assertNewArticleUrl() {
    cy.url().should('include', '/#/editor');
  }
}

export default ArticlePageObject;
