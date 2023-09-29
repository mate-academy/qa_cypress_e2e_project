import PageObject from '../PageObject';

class EditorPageObject extends PageObject {
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

  get tagsField() {
    return cy.getByDataQa('article-tags');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article');
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

  typeTags(tags) {
    this.tagsField.type(tags);
  }

  changeTitleField(title) {
    this.titleField.clear().type(title);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }
}

export default EditorPageObject;
