import PageObject from '../PageObject';

class articlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.get('[data-qa="article-title-field"]');
  }

  get articleDescriptionField() {
    return cy.get('[data-qa="article-description-field"]');
  }

  get articleBodyField() {
    return cy.get('[data-qa="article-body-field"]');
  }

  get articleTagsField() {
    return cy.get('[data-qa="tags-field"]');
  }

  get publishArticleBtn() {
    return cy.get('[data-qa="publish-article-btn"]');
  }

  get editArticleBtn() {
    return cy.get('[data-qa="edit-article-btn"]').eq(0);
  }

  get deleteArticleBtn() {
    return cy.get('[data-qa="delete-article-btn"]').eq(0);
  }

  get articlePage() {
    return cy.get('[data-qa="article-page"]');
  }

  get myArticles() {
    return cy.get('[data-qa="article-preview"]');
  }

  clearArticleTitle() {
    this.articleTitleField
      .clear();
  }

  clearArticleDescription() {
    this.articleDescriptionField
      .clear();
  }

  clearArticleBody() {
    this.articleBodyField
      .clear();
  }

  typeArticleTitle(title) {
    this.articleTitleField
      .type(title);
  }

  typeArticleDescription(description) {
    this.articleDescriptionField
      .type(description);
  }

  typeArticleBody(body) {
    this.articleBodyField
      .type(body);
  }

  typeTag(tag) {
    this.articleTagsField
      .type(tag);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn
      .click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn
      .click();
  }

  assertArticlePublished(text) {
    this.articlePage
      .should('contain', text);
  }

  assertDeletedArticle(text) {
    this.myArticles
      .should('contain', text);
  }
}

export default articlePageObject;