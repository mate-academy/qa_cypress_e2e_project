import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title-edit');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description-edit');
  }

  get bodyField() {
    return cy.getByDataCy('article-body-edit');
  }

  get tagsField() {
    return cy.getByDataCy('article-tags-edit')
      .eq(0);
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
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
