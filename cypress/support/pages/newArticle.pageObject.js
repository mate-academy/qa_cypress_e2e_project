import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
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

  get tagField() {
    return cy.getByDataQa('article-tags');
  }

  get publishBtn() {
    return cy.getByDataQa('article-publish-btn');
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

  typeTag(tag) {
    this.tagField.eq(1)
      .type(tag);
  }

  typeUpdateTitle(title) {
    this.titleField
      .type(title);
  }

  clickPublishBtn() {
    this.publishBtn
      .click();
  }
}

export default NewArticlePageObject;
