import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get titleField() {
    return cy.getByDataQa('article-title');
  }

  get descriptionField() {
    return cy.getByDataQa('article-description');
  }

  get bodyField() {
    return cy.getByDataQa('article-body');
  }

  get publishButton() {
    return cy.getByDataQa('article-publish');
  }

  get editButton() {
    return cy.getByDataQa('article-edit');
  }

  get deleteButton() {
    return cy.getByDataQa('article-delete');
  }

  createArticle(title, description, body) {
    this.titleField.type(title);
    this.descriptionField.type(description);
    this.bodyField.type(body);
    this.publishButton.click();
  }

  editArticle(title, description, body) {
    this.titleField.clear().type(title);
    this.descriptionField.clear().type(description);
    this.bodyField.clear().type(body);
    this.publishButton.click();
  }
}

export default ArticlePageObject;
