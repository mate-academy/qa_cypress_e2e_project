import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles/';

  get articleTitleContainer() {
    return cy.getByDataCy('article-title');
  }

  get articleBodyContainer() {
    return cy.getByDataCy('article-body');
  }

  get articleUserData() {
    return cy.getByDataCy('username-link');
  }

  get articleEditButton() {
    return cy.getByDataCy("edit-article-button")
  }

  get articleDeleteButton() {
    return cy.getByDataCy("delete-article-button")
  }

  assertArticleTitle(title) {
    this.articleTitleContainer.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBodyContainer.should('contain', body);
  }

  assertArticleNewTitle(articleNewTitle) {
    cy.getByDataCy('article-title').should('contain', articleNewTitle);
  }

  assertArticleNewBody(articleNewBody) {
    cy.getByDataCy('article-body').should('contain', articleNewBody);
  }
} 

export default ArticlePageObject;

