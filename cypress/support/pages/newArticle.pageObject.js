import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('article-title-input');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description-input');
  }

  get bodyField() {
    return cy.getByDataCy('article-body-input');
  }

  get tagField() {
    return cy.getByDataCy('article-tag-input');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-article-btn');
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

  typeTag(tag) {
    this.tagField.first().type(tag);
  }

  clearTitle() {
    this.titleField.clear();
  }

  clearBody() {
    this.bodyField.clear();
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }
}

export default NewArticlePageObject;
