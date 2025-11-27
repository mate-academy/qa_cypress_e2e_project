class ArticlePage {
  visitNewArticle() {
    cy.visit('/editor');
  }

  titleInput = () => cy.get('[data-cy=article-title]');
  descriptionInput = () => cy.get('[data-cy=article-description]');
  bodyInput = () => cy.get('[data-cy=article-body]');
  tagInput = () => cy.get('[data-cy=article-tag]');
  publishBtn = () => cy.get('[data-cy=article-publish]');
  editBtn = () => cy.get('[data-cy=article-edit]').first();
  deleteBtn = () => cy.get('[data-cy=article-delete]').first();

  createArticle({ title, description, body }) {
    this.titleInput().type(title);
    this.descriptionInput().type(description);
    this.bodyInput().type(body);
    this.publishBtn().click();
  }

  editArticle({ title, description, body }) {
    this.editBtn().click();

    cy.get('[data-cy=article-title]').should('be.visible');

    if (title) {
      this.titleInput().clear();
      this.titleInput().type(title);
    }
    if (description) this.descriptionInput().clear().type(description);
    if (body) {
      this.bodyInput().should('be.visible').clear();
      this.bodyInput().type(body);
    }
    this.publishBtn().click();
  }

  deleteArticle() {
    this.deleteBtn().click();
  }
}

export default ArticlePage;
