import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataQa('title-field');
  }

  get articleDescriptionField() {
    return cy.getByDataQa('description-field');
  }

  get articleBodyField() {
    return cy.getByDataQa('body-field');
  }

  get articleTagField() {
    return cy.getByDataQa('tags-field');
  }

  get publishBtn() {
    return cy.getByDataQa('publish-btn');
  }

  get articleEditBtn() {
    return cy.getByDataQa('edit-article').eq(0);
  }

  get articleDeleteBtn() {
    return cy.getByDataQa('delete-article').eq(0);
  }

  typeArticleTitle(title) {
    this.articleTitleField.type(title);
  }

  typeDescriptionField(description) {
    this.articleDescriptionField.type(description);
  }

  typeArticleBody(body) {
    this.articleBodyField.type(body);
  }

  updateArticleBody(body) {
    this.articleBodyField.clear().type(body);
  }

  typeArticleTag(tag) {
    this.articleTagField.eq(0).type(tag);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  clickEditBtn() {
    this.articleEditBtn.click();
  }

  clickDeleteBtn() {
    this.articleDeleteBtn.click();
  }

  assertArticleTitle(text) {
    cy.get('[data-qa="article-title"]').should('contain', text);
  }

  assertArticleBody(text) {
    cy.get('[data-qa="article-body"]').should('contain', text);
  }
}

export default ArticlePageObject;
