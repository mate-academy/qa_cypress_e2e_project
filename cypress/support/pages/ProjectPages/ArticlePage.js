class ArticlePage {
  typeArticleTitle(article) {
    cy.getByDataCy('article-title').type(article.title);
  }

  typeArticleDescription(article) {
    cy.getByDataCy('article-description').type(article.description);
  }

  typeArticleBody(article) {
    cy.getByDataCy('article-body').type(article.body);
  }

  typeArticleTags(article) {
    cy.getByDataCy('article-tags').type(article.tags);
  }

  createArticleBtn() {
    cy.getByDataCy('editor-publish-btn').click();
  }

  assertArticleTitle(article) {
    cy.get('.banner h1').should('contain', article.title);
  }

  assertArticleBody(article) {
    cy.get('.article-content').should('contain', article.body);
  }

  editArticleBtn() {
    cy.getByDataCy('article-edit-btn').eq(0).click();
  }

  typeArticleTitle(editArticle) {
    cy.getByDataCy('article-title').type(editArticle.title);
  }

  typeArticleDescription(editArticle) {
    cy.getByDataCy('article-description').type(editArticle.description);
  }

  typeArticleBody(editArticle) {
    cy.getByDataCy('article-body').type(editArticle.body);
  }

  typeArticleTags(editArticle) {
    cy.getByDataCy('article-tags').type(editArticle.tags);
  }

  deleteArticleBtn() {
    cy.getByDataCy('article-delete-btn').eq(0).click();
  }
}

export const articlePage = new ArticlePage();
