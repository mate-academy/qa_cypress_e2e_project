import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get tagField() {
    return cy.getByPlaceholder('"Enter tags"');
  }

  get publishButton() {
    return cy.getByDataCy('article-publish');
  }

  get titleText() {
    return cy.getByDataCy('article-title-text');
  }

  get articlePreview() {
    return cy.getByDataCy('article-preview');
  }

  get editButton() {
    return cy.getByDataCy('article-edit-button');
  }

  get deleteButton() {
    return cy.getByDataCy('article-delete-button');
  }

  typeTitle(email) {
    this.clearAndType(this.titleField, email);
  }

  typeDescription(text) {
    this.clearAndType(this.descriptionField, text);
  }

  typeBody(body) {
    this.clearAndType(this.bodyField, body);
  }

  typeTag(tag) {
    this.clearAndType(this.tagField, `${tag}{enter}`);
  }

  clearAndType(field, value) {
    field.clear();
    field.type(value);
  }

  publishArticle() {
    this.publishButton.click();
  }

  hasArticlePreview() {
    this.articlePreview.should('be.visible');
  }

  noArticles() {
    this.articlePreview
      .should('be.visible')
      .should('contain.text', 'No articles are here... yet.');
  }

  findTitleText(text) {
    this.titleText.should('contain.text', text);
  }

  moveToArticle() {
    this.titleText.click();
  }

  clickOnEdit() {
    this.editButton.first().click();
  }

  deleteArticle() {
    this.deleteButton.first().click();
  }
}

export default ArticlePageObject;
