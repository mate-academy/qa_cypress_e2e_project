class ArticlePage {
  visit() {
    cy.visit('#/editor');
  }

  typeTitle(title) {
    cy.findByPlaceholder('Article Title').type(title);
  }

  typeDescription(description) {
    cy.findByPlaceholder('What\'s this article about?').type(description);
  }

  typeBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)').type(body);
  }

  typeTag(tag) {
    cy.get('.vue-tags-input').type(tag);
  }

  clickPublish() {
    cy.get('.btn').click();
  }

  clickEditArticleBtn() {
    cy.contains('Edit Article').click();
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
