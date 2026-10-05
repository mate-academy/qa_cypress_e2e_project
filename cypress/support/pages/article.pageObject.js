import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get articleTitleInputElement() {
    return cy.getByDataQa('article-title-input');
  }

  get articleDescriptionInputElement() {
    return cy.getByDataQa('article-description-input');
  }

  get articleBodyInputElement() {
    return cy.getByDataQa('article-body-input');
  }

  get publishArticleElement() {
    return cy.getByDataQa('publish-article');
  }

  get articleTitleElement() {
    return cy.getByDataQa('article-title');
  }

  get articleBodyElement() {
    return cy.getByDataQa('article-body');
  }

  get editArticleElement() {
    return cy.getByDataQa('edit-article');
  }

  get deleteArticleElement() {
    return cy.getByDataQa('delete-article');
  }

  fill(article) {
    this.articleTitleInputElement.clear();
    this.articleTitleInputElement.type(article.title);
    this.articleDescriptionInputElement.clear();
    this.articleDescriptionInputElement.type(article.description);
    this.articleBodyInputElement.clear();
    this.articleBodyInputElement.type(article.body);
  }

  publish(method) {
    cy.intercept(method, '/articles').as('publishArticle');
    this.publishArticleElement.click();
    cy.wait('@publishArticle').its('response.statusCode')
      .should('be.oneOf', [200, 201]);
  }

  assertArticle(article) {
    this.articleTitleElement.should('have.text', article.title);
    this.articleBodyElement.should('contain', article.body);
  }

  assertDescription(description) {
    this.articleDescriptionInputElement
      .should('have.value', description);
  }

  edit() {
    this.editArticleElement.first().click();
  }

  delete() {
    this.deleteArticleElement.first().click();
    cy.location('hash').should('eq', '#/');
  }
}

export default ArticlePageObject;
