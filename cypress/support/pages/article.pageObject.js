import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  get titleField() {
    return cy.getByDataQa('title-article');
  }

  get descriptionField() {
    return cy.getByDataQa('description-article');
  }

  get bodyField() {
    return cy.getByDataQa('body-article');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn');
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

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }

  clickEditArticleBtn() {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn.click();
  }

  createArticle(title, description, body) {
    this.titleField.clear().type(title);
    this.descriptionField.clear().type(description);
    this.bodyField.clear().type(body);
    this.clickPublishArticleBtn();
  }

  updateArticle(title, description, body) {
    this.titleField.clear().type(title);
    this.descriptionField.clear().type(description);
    this.bodyField.clear().type(body);
    this.clickPublishArticleBtn();
  }
}

export default ArticlePageObject;
