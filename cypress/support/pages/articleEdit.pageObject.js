import PageObject from "../PageObject";

export default class ArticleEditPageObject extends PageObject {
  url = "/#/editor";

  get titleField() {
    return cy.getByDataCy("title-article");
  }

  get descriptionField() {
    return cy.getByDataCy("description-article");
  }

  get bodyField() {
    return cy.getByDataCy("body-article");
  }

  get publishBtn() {
    return cy.getByDataCy("publish-article-btn");
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

  clickPublishBtn() {
    this.publishBtn.click();
  }
}
