import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get titleField() {
    return cy.getByDataQa('title');
  }

  get descriptionField() {
    return cy.getByDataQa('description');
  }

  get bodyField() {
    return cy.getByDataQa('body');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article');
  }

  typeTitle(title) {
    this.titleField.type(title, { force: true });
  }

  typeDescription(description) {
    this.descriptionField.type(description, { force: true });
  }

  typeBody(body) {
    this.bodyField.type(body, { force: true });
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  clickEditArticleBtn(first = false) {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }
}

export default ArticlePageObject;
