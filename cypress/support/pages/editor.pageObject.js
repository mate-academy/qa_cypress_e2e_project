import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '#/editor'

  get articleTitleField() {
    return cy.getByDataCy ('article-title');
  }

  get articleDescriptionField() {
    return cy.getByDataCy ('article-description');
  }

  get articleBodyField() {
    return cy.getByDataCy ('article-body');
  }

  get publishBtn() {
    return cy.getByDataCy ('publish-btn');
  }

  typeTitle(title) {
    this.articleTitleField.type(title);
  }

  typeDescription(description) {
    this.articleDescriptionField.type(description);
  }

  typeBody(body) {
    this.articleBodyField.type(body);
  }

  clickPublishArticleBtn() {
    this.publishBtn.click();
  }

  changeTitle(title) {
    this.articleTitleField.clear().type(title);
  }

  changeDescription(description) {
    this.articleDescriptionField.clear().type(description);
  }

  changeBody(body) {
    this.articleBodyField.clear().type(body);
  }

}

export default EditArticlePageObject;