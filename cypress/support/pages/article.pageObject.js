import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visitArticlePage(slug) {
    cy.visit(`#/articles/${slug}`);
  }

  get articleTitleContainer() {
    return cy.getByDataCy('article-title');
  }

  get articleBodyContainer() {
    return cy.getByDataCy('article-body');
  }

  assertArticleTitle(title) {
    this.articleTitleContainer.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBodyContainer.should('contain', body);
  }

  get editBtn() {
    return cy.getByDataCy('edit-btn-article-page').eq(0);
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-btn-article-page').eq(0);
  }
}

export default ArticlePageObject;
