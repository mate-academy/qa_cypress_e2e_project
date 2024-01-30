import PageObject from '../PageObject';

class EditorPageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get tagsField() {
    return cy.getByDataCy('article-tags');
  }

  get publishBtn() {
    return cy.getByDataCy('editor-publish-btn');
  }

  get editBtn() {
    return cy.getByDataCy('article-edit-btn').eq(0);
  }

  get deleteBtn() {
    return cy.getByDataCy('article-delete-btn').eq(0);
  }

  typeTitle(title) {
    this.titleField
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  typeBody(body) {
    this.bodyField.clear().type(body);
  }

  typeTags(tags) {
    this.tagsField.type(tags);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }

  clickEditBtn() {
    this.editBtn
      .click();
  }

  clickDeleteBtn() {
    this.deleteBtn
      .click();
  }

  assertArticleTitle(content) {
    cy.get('.banner h1').should('contain', content);
  }

  assertArticleBody(content) {
    cy.get('.article-content').should('contain', content);
  }
}

export default EditorPageObject;
