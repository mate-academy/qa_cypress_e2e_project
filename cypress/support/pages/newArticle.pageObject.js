import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('title-new-article');
  }

  typeTitle(title) {
    this.titleField
      .type(title);
  }

  get descriptionField() {
    return cy.getByDataQa('description-new-article');
  }

  typeDescription(description) {
    this.descriptionField
      .type(description);
  }

  get bodyField() {
    return cy.getByDataQa('body-new-article');
  }

  typeBody(body) {
    this.bodyField
      .type(body);
  }

  get tagsField() {
    return cy.getByDataQa('tags-new-article');
  }

  typeTags(tags) {
    this.tagsField
      .type(tags);
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  clickPublishArticle() {
    this.publishArticleBtn
      .click();
  }
}

export default NewArticlePageObject;
