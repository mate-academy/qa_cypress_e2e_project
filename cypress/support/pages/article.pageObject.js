import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles/';

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get articleTitleField() {
    return cy.getByDataCy('title-field');
  }

  get articleDescriptionField() {
    return cy.getByDataCy('description-field');
  }

  get articleBodyField() {
    return cy.getByDataCy('body-field');
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody.should('contain', body);
  }

  assertDeletingArticle(message, title) {
    cy.getByDataCy('article-list').should('contain', message);
    cy.getByDataCy('article-list').should('not.have.value', title);
  }

  visitArticlePage(slug) {
    cy.visit(`#/articles/${slug}`);
  }
}

export default ArticlePageObject;
