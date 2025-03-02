import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataCy('title-article-edit');
  }

  get aboutField() {
    return cy.getByDataCy('text-article-edit');
  }

  get textField() {
    return cy.getByDataCy('text-area-article-edit');
  }

  get tagField() {
    return cy.getByDataCy('tags-article-edit');
  }

  get publishBtn() {
    return cy.getByDataCy('submit-btn-article');
  }

  clearTitleField() {
    this.titleField.clear();
  }

  typeTitleField(title) {
    this.clearTitleField();
    this.titleField.type(title);
  }

  clearAboutField() {
    this.aboutField.clear();
  }

  typeAboutField(about) {
    this.clearAboutField();
    this.aboutField.type(about);
  }

  clearTextField() {
    this.clearTextField();
    this.textField.clear();
  }

  typeTextField(text) {
    this.textField.type(text);
  }

  clearTagField() {
    this.tagField.eq(1).clear();
  }

  typeTagField(tag) {
    this.clearTagField();
    this.tagField.eq(1).type(tag);
  }

  clickPublishBtn() {
    this.publishBtn.click();
  }
}

export default NewArticlePageObject;
