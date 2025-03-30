import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visitArticlePage(slug) {
    cy.visit(`/#/articles/${slug}`);
  }

  clickEditArticleBtn() {
    cy.contains('.btn', 'Edit Article').click();
  }

  clickDeleteArticleBtn() {
    cy.contains('.btn', 'Delete Article').click();
  }

  assertArticlesTitle(title) {
    cy.getByDataCy('title-article-page').should('contain', title);
  }

  assertArticlesBody(body) {
    cy.getByDataCy('body-article-page').should('contain', body);
  }

  assertArticlesTag(tag) {
    cy.getByDataCy('body-article-page').should('contain', tag);
  }
}

export default ArticlePageObject;
