import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get articleTitleField() {
    return cy.getByDataCy('title-field');
  }

  get articleDescriptionField() {
    return cy.getByDataCy('description-field');
  }

  get articleBodyField() {
    return cy.getByDataCy('body-field');
  }

  get articleTagsField() {
    return cy.getByDataCy('tags-field');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-btn');
  }

  get articleBanner() {
    return cy.getByDataCy('article-title-banner');
  }

  get editBtn() {
    return cy.getByDataCy('edit-btn');
  }

  get oldTag() {
    return cy.get('.ti-actions');
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-btn');
  }

  get articlePreview() {
    return cy.getByDataCy('profile-article');
  }

  assertArticlePage(article) {
    this.articleBanner.should('contain', article.title);
  }

  updateArticleTitle(newTitle) {
    this.articleTitleField.clear().type(newTitle);
  }

  updateArticleDescription(newDescription) {
    this.articleDescriptionField.clear().type(newDescription);
  }

  updateArticleBody(newBody) {
    this.articleBodyField.clear().type(newBody);
  }

  deleteTag() {
    this.oldTag.click();
  }

  updateArticleTags(article) {
    this.articleTagsField.first().type(article.newTag);
  }

  assertupdateArticlePage(article) {
    this.articleBanner.should('contain', article.newTitle);
  }

  assertArticleIsDeleat(article) {
    this.articlePreview.should('not.contain', article.title);
  }
}

export default ArticlePageObject;
