
class ArticlePage {
  visit() {
    cy.visit('#/editor');
  }

  typeTitle(title) {
    cy.get('input[placeholder="Article Title"]').type(title);
  }

  typeDescription(description) {
    cy.get(':nth-child(2) > .form-control').type(description);
  }

  typeBody(body) {
    cy.get(':nth-child(3) > .form-control').type(body);
  }

  typeTag(tag) {
    cy.get('.vue-tags-input').type(tag);
  }

  clickPublish() {
    cy.get('.btn').click();
  }

  clickEditArticleBtn() {
    // eslint-disable-next-line max-len
    cy.get('.article-actions > [data-testid="article-meta"] > [data-testid="author-actions"] > [data-testid="edit-article-btn"]').click();
  }

  clickDeleteArticleBtn() {
    cy.contains('Delete Article').click();
  }

  assertArticleTitleExists(title) {
    cy.contains(title).should('exist');
  }

  assertArticleTitleDoesNotExist() {
    cy.contains('Delete Article').should('not.exist');
  }
}

export default ArticlePage;
