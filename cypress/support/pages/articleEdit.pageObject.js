import PageObject from '../PageObject';

class ArticleEditPageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('title-input');
  }

  get descriptionField() {
    return cy.getByDataQa('description-input');
  }

  get bodyField() {
    return cy.getByDataQa('body-input');
  }

  get publishBtn() {
    return cy.getByDataQa('publish-btn');
  }

  typeTitle(title) {
    return this.titleField.clear().type(title);
  }

  typeDescription(description) {
    return this.descriptionField.clear().type(description);
  }

  typeBody(body) {
    return this.bodyField.clear().type(body);
  }

  typeTags(tags) {
    cy.get('.ti-new-tag-input')
      .clear();
    tags.forEach((tag) => {
      cy.get('.ti-new-tag-input').type(
        `${tag}{enter}`
      );
    });
    return this;
  }

  fillForm({ title, description, body, tags }) {
    this.typeTitle(title);
    this.typeDescription(description);
    this.typeBody(body);
    if (tags && tags.length) {
      this.typeTags(tags);
    }
  }

  clickPublishBtn() {
    return this.publishBtn.click();
  }
}

export default ArticleEditPageObject;
