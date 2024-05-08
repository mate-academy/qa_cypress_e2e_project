import PageObject from '../PageObject';

class EditorArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('title-field');
  }

  get descriptionField() {
    return cy.getByDataCy('description-field');
  }

  get bodyField() {
    return cy.getByDataCy('body-textarea');
  }

  get tagsField() {
    return cy.getByDataCy('tags-field');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-btn');
  }

  typeTitle(title) {
    this.titleField.type(title);
  }

  editTitle(title) {
    this.titleField.clear().type(title);
  }

  typeDescription(description) {
    this.descriptionField.type(description);
  }

  editDescriotion(description) {
    this.descriptionField.clear().type(description);
  }

  typeBody(body) {
    this.bodyField.type(body);
  }

  editBody(body) {
    this.bodyField.clear().type(body);
  }

  typeTags(tags) {
    this.tagsField.type(tags);
  }

  editTags(tags) {
    this.tagsField.clear().type(tags);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }
}

export default EditorArticlePageObject;
