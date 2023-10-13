/// <reference types='cypress' />

import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/articles/title';

  visit(title) {
    cy.visit('/articles/' + title);
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn').eq(0);
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn').eq(0);
  }

  get articleTitle() {
    return cy.getByDataQa('article-title');
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  get authorName() {
    return cy.getByDataQa('author-name');
  }

  clickEditArticleBtn() {
    this.editArticleBtn
      .should('be.visible')
      .click();
  }

  clickDeleteArticleBtn() {
    this.deleteArticleBtn
      .should('be.visible')
      .click();
  }

  assertAuthorName(username) {
    this.authorName
      .should('contain', username);
  }

  assertTitle(title) {
    this.articleTitle
      .should('contain.text', title);
  }

  assertBody(body) {
    this.articleBody
      .should('contain.text', body);
  }

  assertArticleTitleUrl(title) {
    cy.url()
      .should('include', title);
  }
}

export default ArticlePageObject;
