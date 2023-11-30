import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('article-title-edit');
  }

  get descriptionField() {
    return cy.getByDataQa('article-description-edit');
  }

  get bodyField() {
    return cy.getByDataQa('article-body-edit');
  }

  get tagsField() {
    return cy.getByDataQa('article-tags-edit')
      .eq(0);
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  typeTitle(title) {
    this.titleField.clear()
      .type(title);
  }

  typeDescription(description) {
    this.descriptionField.clear()
      .type(description);
  }

  typeBody(body) {
    this.bodyField.clear()
      .type(body);
  }

  typeTags(tags) {
    this.tagsField
      .type(tags);
  }

  clickPublishBtn() {
    this.publishArticleBtn
      .click();
  }
}

export default EditArticlePageObject;
