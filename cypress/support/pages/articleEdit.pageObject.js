import PageObject from '../PageObject';

class articleEditPageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('title-new-article');
  }

  typeNewTitle(title) {
    this.titleField
      .clear()
      .type(title);
  }

  get descriptionField() {
    return cy.getByDataQa('description-new-article');
  }

  typeNewDescription(description) {
    this.descriptionField
      .clear()
      .type(description);
  }

  get bodyField() {
    return cy.getByDataQa('body-new-article');
  }

  typeNewBody(body) {
    this.bodyField
      .clear()
      .type(body);
  }

  get tagsField() {
    return cy.getByDataQa('tags-new-article');
  }

  typeNewTags(tags) {
    this.tagsField
      .eq(0)
      .clear()
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

export default articleEditPageObject;
