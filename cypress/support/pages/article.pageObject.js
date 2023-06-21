import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visitArticlePage(title) {
    cy.visit(`http://localhost:1667/#/articles/${title}`);
  }

  get editArticleBtn() {
    return cy.getByDataCy('article-edit-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataCy('article-delete-btn');
  }

  get articleTitleContainer() {
    return cy.getByDataCy('banner-article-title');
  }

  assertArticleTitle(title) {
    this.articleTitleContainer.should('contain', title);
  }

  assertDeletingArticle(modalText) {
    cy.getByDataCy('article-list-global-feed').should('contain', modalText);
  }
}

export default ArticlePageObject;
