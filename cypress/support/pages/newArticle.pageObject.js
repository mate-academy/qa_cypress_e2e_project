/// <reference types='cypress' />

import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/editor';

  get titleField() {
    return cy.getByDataQa('title-field');
  }

  get descriptionField() {
    return cy.getByDataQa('description-field');
  }

  get bodyField() {
    return cy.getByDataQa('body-field');
  }

  get tagsField() {
    return cy.getByDataQa('tags-field');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  typeTitle(title) {
    this.titleField
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField
      .type(description);
  }

  typeBody(body) {
    this.bodyField
      .type(body);
  }

  typeTags(tag) {
    this.tagsField.eq(0)
      .type(tag);
  }

  editTitle(newTitle) {
    this.titleField
      .clear()
      .type(newTitle);
  }

  editDescription(newDescription) {
    this.descriptionField
      .clear()
      .type(newDescription);
  }

  editBody(newBody) {
    this.bodyField
      .clear()
      .type(newBody);
  }

  editTags(newTag) {
    this.tagsField.eq(0)
      .clear()
      .type(newTag);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }
}

export default NewArticlePageObject;
