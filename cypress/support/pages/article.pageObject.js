class ArticlePageObject {
  visit() {
    cy.visit('/editor');
  }

  createArticle(title, description, body) {
    cy.get('[data-qa="article-title"]').type(title);
    cy.get('[data-qa="article-description"]').type(description);
    cy.get('[data-qa="article-body"]').type(body);
    cy.get('[data-qa="submit-article"]').click();
  }

  editArticle(title, description, body) {
    cy.get('[data-qa="article-title"]').clear().type(title);
    cy.get('[data-qa="article-description"]').clear().type(description);
    cy.get('[data-qa="article-body"]').clear().type(body);
    cy.get('[data-qa="submit-article"]').click();
  }

  deleteArticle(title) {
    cy.get('[data-qa="article-title"]').contains(title).parent().find('[data-qa="delete-article"]').click();
  }

  assertArticleCreated(title) {
    cy.get('[data-qa="article-title"]').should('contain', title);
  }

  assertArticleEdited(title) {
    cy.get('[data-qa="article-title"]').should('contain', title);
  }

  assertArticleDeleted(title) {
    cy.get('[data-qa="article-title"]').should('not.contain', title);
  }
}

export default ArticlePageObject;
