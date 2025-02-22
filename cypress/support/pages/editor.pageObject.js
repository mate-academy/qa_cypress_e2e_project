import PageObject from '../PageObject';

class EditorPageObject extends PageObject {
  url = '#/editor';

  get titleField() {
    return cy.getByDataCy('article-title');
  }

  get descriptionField() {
    return cy.getByDataCy('article-description');
  }

  get bodyField() {
    return cy.getByDataCy('article-body');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-article');
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

  pressPublishBtn() {
    this.publishBtn.click();
  }
}

export default EditorPageObject;
