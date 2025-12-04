/* eslint-disable cypress/unsafe-to-chain-command */
import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visitNewArticle() {
    cy.getByDataCy('new-article').click();
  }

  typeTitle(title) {
    cy.getByDataCy('article-title').clear().type(title);
  }

  typeDescription(description) {
    cy.getByDataCy('article-description').clear().type(description);
  }

  typeBody(body) {
    cy.getByDataCy('article-body').clear().type(body);
  }

  publishArticle() {
    cy.getByDataCy('publish-article').click();
  }

  editArticle() {
    cy.getByDataCy('edit-article').click();
  }

  deleteArticle() {
    cy.getByDataCy('delete-article').click();
  }

  assertArticleExists(title) {
    // используем data-qa для заголовка статьи
    cy.get('[data-qa=article-title-display]').should('contain.text', title);
  }

  assertArticleNotExists(title) {
    cy.get('[data-qa=article-title-display]').should('not.contain.text', title);
  }
}

export default ArticlePageObject;
