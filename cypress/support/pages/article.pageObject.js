import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/articles/';

  visitArticlePage(slug) {
    cy.visit(`#/articles/${slug}`);
  }

  get articleTitleContainer() {
    return cy.getByDataQa('article-title');
  }

  get articleBodyContainer() {
    return cy.getByDataQa('article-body');
  }

  assertArticleTitle(title) {
    this.articleTitleContainer.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBodyContainer.should('contain', body);
  }

  get editBtn() {
    return cy.getByDataQa('edit-btn-article-page').eq(0);
  }

  get deleteBtn() {
    return cy.getByDataQa('delete-btn-article-page').eq(0);
  }
}

export default ArticlePageObject;
