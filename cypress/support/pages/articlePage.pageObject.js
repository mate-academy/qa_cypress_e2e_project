import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return cy.getByDataQa('article-title');
  }

  get aboutField() {
    return cy.getByDataQa('article-about');
  }

  get textField() {
    return cy.getByDataQa('article-body');
  }

  get tagsField() {
    return cy.getByDataQa('article-tags');
  }

  get publishBtn() {
    return cy.getByDataQa('publish-article');
  }

  get editBtn() {
    return cy.getByDataQa('edit-article');
  }

  get deleteBtn() {
    return cy.getByDataQa('delete-article');
  }

  typeTitle(title) {
    this.titleField.clear().type(title);
  }

  typeAbout(about) {
    this.aboutField.clear().type(about);
  }

  typeText(text) {
    this.textField.clear().type(text);
  }

  typeTag(tag) {
    this.tagsField.type(`${tag}{enter}`);
  }

  clickPublishArticleBtn() {
    this.publishBtn.click();
  }
}

export default ArticlePageObject;
