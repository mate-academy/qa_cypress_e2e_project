import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('article-title-field');
  }

  get descriptionField() {
    return cy.getByDataQa('article-description-field');
  }

  get textField() {
    return cy.getByDataQa('article-text-field');
  }

  // get tagField() {
  //   return cy.getByDataQa('article-tag-field');
  // }

  get publishBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  get editBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  get deleteBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  typeText(body) {
    this.textField.type(body);
  }

  // typeTag(tag) {
  //   this.tagField.type(tag);
  // }

  clickPublishBtn() {
    this.publishBtn.first().click();
  }

  clickEditBtn() {
    this.editBtn.first().click();
  }

  clickDeleteBtn() {
    this.deleteBtn.first().click();
  }

  newArticleLinkClick() {
    cy.getByDataQa('new-article-link').click();
  }

  bannerArticleCheck(title) {
    cy.getByDataQa('title-article-banner').contains(title);
  }

  bodyArticleCheck(body) {
    cy.getByDataQa('article-content').contains(body);
  }

  editArticleBtn() {
    cy.getByDataQa('edit-article-btn').eq(0).click();
  }

  deleteArticleBtn() {
    cy.getByDataQa('delete-article-btn').eq(0).click();
  }

  usernameLinkClick() {
    cy.getByDataQa('username-link').click();
  }

  articlePreviewCheck(article) {
    cy.getByDataQa('article-preview').should('not.contain', article);
  }
}
export default ArticlePageObject;
