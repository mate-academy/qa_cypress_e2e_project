import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('article-title');
  }

  get descriptionField() {
    return cy.getByDataQa('article-description');
  }

  get bodyField() {
    return cy.getByDataQa('article-body');
  }

  get tagsField() {
    return cy.getByDataQa('article-tags');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article');
  }

  clickEditArticleBtn() {
    this.editArticleBtn.first().click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.first().click();
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  typeBody(body) {
    this.bodyField.type(body);
  }

  typeTags(tags) {
    this.tagsField.type(tags);
  }

  changeTitleField(editedTitle) {
    this.titleField.clear().type(editedTitle);
  }

  changeDescriptionField(editedDescription) {
    this.titleField.clear().type(editedDescription);
  }

  changeBodyField(editedBody) {
    this.titleField.clear().type(editedBody);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }
}

export default EditArticlePageObject;
