import PageObject from './PageObject';
import faker from 'faker';

class ArticlePage extends PageObject {
  url = '/editor';

  // Form fields
  get titleField() { return cy.get('[data-cy="article-title"]'); }
  get descriptionField() { return cy.get('[data-cy="article-description"]'); }
  get bodyField() { return cy.get('[data-cy="article-body"]'); }
  get tagsField() { return cy.get('[data-cy="article-tags"]'); }
  get publishBtn() { return cy.get('[data-cy="publish-article-btn"]'); }
  get editBtn() { return cy.get('[data-cy="edit-article-btn"]'); }
  get deleteBtn() { return cy.get('[data-cy="delete-article-btn"]'); }

  // Actions
  typeTitle(title) { this.titleField.clear().type(title); }
  typeDescription(desc) { this.descriptionField.clear().type(desc); }
  typeBody(body) { this.bodyField.clear().type(body); }
  typeTags(tags) { this.tagsField.clear().type(tags); }
  clickPublish() { this.publishBtn.click(); }

  // High-level methods
  createArticle(articleData) {
    this.typeTitle(articleData.title);
    this.typeDescription(articleData.description);
    this.typeBody(articleData.body);
    this.typeTags(articleData.tags);
    this.clickPublish();
  }

  editArticle(updatedData) {
    this.editBtn.click();
    this.typeTitle(updatedData.title);
    this.typeDescription(updatedData.description);
    this.typeBody(updatedData.body);
    this.typeTags(updatedData.tags);
    this.clickPublish();
  }

  deleteArticle() {
    this.deleteBtn.click();
  }

  // Assertions
  assertArticleCreated(articleData) {
    cy.contains(articleData.title).should('be.visible');
  }

  assertArticleUpdated(body) {
    cy.contains(body).should('be.visible');
  }

  assertArticleDeleted(title) {
    cy.contains(title).should('not.exist');
  }

  // Optional: search for article by title
  searchArticle(title) {
    cy.get('[data-cy="search-article-input"]').clear().type(title);
  }
}

export default ArticlePage;
