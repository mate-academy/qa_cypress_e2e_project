import PageObject from '../PageObject';

/* eslint-disable max-len */
class ArticlePageObject extends PageObject {
  constructor() {
    super();
    this.titleField = () => cy.get('[data-qa="article-title"]');
    this.descriptionField = () => cy.get('[data-qa="article-description"]');
    this.bodyField = () => cy.get('[data-qa="article-body"]');
    this.submitBtn = () => cy.get('[data-qa="submit-article-btn"]');
    this.deleteBtn = () => cy.get('[data-qa="delete-article-btn"]');
  }

  visitPage() {
    super.visit('/editor');
  }

  createArticle({ title, description, body }) {
    this.visitPage();
    this.titleField().clear().type(title);
    this.descriptionField().clear().type(description);
    this.bodyField().clear().type(body);
    this.submitBtn().click();
  }

  editArticle({ title, description, body }) {
    this.titleField().clear().type(title);
    this.descriptionField().clear().type(description);
    this.bodyField().clear().type(body);
    this.submitBtn().click();
  }

  deleteArticle() {
    this.deleteBtn().should('be.visible').click();
  }

  assertArticlePresent(title) {
    cy.get('[data-qa="article-title-display"]').contains(title).should('be.visible');
  }

  assertArticleNotPresent(title) {
    cy.get('[data-qa="article-title-display"]').contains(title).should('not.exist');
  }
}

export default ArticlePageObject;
