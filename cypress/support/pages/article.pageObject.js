/* eslint-disable max-len */
import PageObject from './PageObject';

class ArticlePageObject extends PageObject {
  url = '/new-article';

  get titleField() {
    return cy.get('[data-qa="article-title"]');
  }

  get descriptionField() {
    return cy.get('[data-qa="article-description"]');
  }

  get bodyField() {
    return cy.get('[data-qa="article-body"]');
  }

  get publishBtn() {
    return cy.get('[data-qa="publish-article"]');
  }

  get editBtn() {
    return cy.get('[data-qa="edit-article"]');
  }

  get deleteBtn() {
    return cy.get('[data-qa="delete-article"]');
  }

  createArticle({ title, description, body }) {
    this.visit();
    this.titleField.type(title);
    this.descriptionField.type(description);
    this.bodyField.type(body);
    this.publishBtn.click();
  }

  editArticle({ title, description, body }) {
    this.editBtn.click();
    if (title) {
      this.titleField.clear().type(title);
    }
    if (description) {
      this.descriptionField.clear().type(description);
    }
    if (body) {
      this.bodyField.clear().type(body);
    }
    this.publishBtn.click();
  }

  deleteArticle() {
    this.deleteBtn.click();
  }

  assertArticlePresent(title) {
    cy.contains('[data-qa="article-title-display"]', title).should('be.visible');
  }

  assertArticleNotPresent(title) {
    cy.contains('[data-qa="article-title-display"]', title).should('not.exist');
  }
}

export default ArticlePageObject;
